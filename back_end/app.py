from flask import Flask, request, jsonify, session
from flask_cors import CORS
from flask_mysqldb import MySQL
import pandas as pd
import numpy as np
import pickle
import csv
from scipy.stats import mode
import warnings
from sklearn.ensemble import RandomForestClassifier
from collections import Counter
from flask_bcrypt import Bcrypt 
from flask_mail import Mail, Message
from collections import Counter



app = Flask(__name__)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'zerowood70@gmail.com'
app.config['MAIL_PASSWORD'] = '..'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True



bcrypt = Bcrypt(app) 
CORS(app) 
mail = Mail(app)

app.secret_key = "helloAI"


app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'helloAI'
 
mysql = MySQL(app)

#removing warnings

warnings.filterwarnings("ignore", category=UserWarning)
warnings.filterwarnings("ignore", category=DeprecationWarning)


with open('./models/svm_model.pkl', 'rb') as a:
    svm_model = pickle.load(a)

with open('./models/nb_model.pkl', 'rb') as b:
    nb_model = pickle.load(b)

with open('./models/rf_model.pkl', 'rb') as c:
    rf_model = pickle.load(c)

with open('./models/data_dict.pkl', 'rb') as d:
    data_dict = pickle.load(d)

with open('./models/Doctor_Specialist_Model.pkl', 'rb') as f:
   specialization = pickle.load(f)


#This is a Login Page
@app.route('/login', methods=['POST'])
def login():

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    print(email,password)

    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM signup WHERE email = %s', (email,))
    user = cursor.fetchone()
    cursor.close()

    print(user)

    if user and bcrypt.check_password_hash(user[4], password):  # Assuming that password is the third column in the users table
        print("Login")
        session['email'] = email
        return jsonify({"success": True, "message": "Login successful"})

    else:
        print("error")
        return jsonify(logged_in=False, message='Login failed. Please check your email and password.')


#This is SignUp Form
@app.route('/signup', methods=['POST'])
def signup():

    data = request.get_json()
    
    print(data)

    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    phone_number = data.get('phone_number')
    password = data.get('password')

    hashed_password = bcrypt.generate_password_hash(password)
    bcrypt_pwd = bcrypt.check_password_hash(hashed_password,password)
#    is_valid = bcrypt.check_password_hash 
#    (hashed_password, password) 

    print(hashed_password)
    print(bcrypt_pwd)



    print(data)
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO signup VALUES (%s,%s,%s,%s,%s)",(first_name,last_name,email,phone_number,hashed_password))
    cursor.connection.commit()
    cursor.close()

    return jsonify({"success": True, "message": "Registration successful"})


#This is for Contact Us form
@app.route('/contact', methods = ['GET','POST'])
def contact():

    msg = Message(subject='Hello from the other side!', sender='zerowood70@gmail.com', recipients=['aksbgs25@gmail.com'])
    msg.body = "Hey Tima, sending you this email from my Flask app, lmk if it works, I love you alok"
    mail.send(msg)
    return "Message sent!"


#Route for disease prediction...
@app.route('/diseasepredict', methods = ['GET','POST'])
def predictDisease():

    symptoms = request.json
    symptom_list = [str(symptoms['symptom1']), str(symptoms['symptom2']), str(symptoms['symptom3'])]

    # print(symptoms)
    # print(data_dict['predictions_classes'])
    input_data = [0] * len(data_dict["symptom_index"])
    for symptom in symptom_list:
        # print(symptom)
        index = data_dict["symptom_index"].get(symptom, -1)
        if index != -1:
            input_data[index] = 1

    input_data = np.array(input_data).reshape(1, -1)

   
    rf_prediction = data_dict["predictions_classes"][rf_model.predict(input_data)[0]]
    nb_prediction = data_dict["predictions_classes"][nb_model.predict(input_data)[0]]
    svm_prediction = data_dict["predictions_classes"][svm_model.predict(input_data)[0]]
 

    # final_prediction = mode([ nb_prediction, svm_prediction], axis=0, keepdims=True, nan_policy='omit')[0][0]
    def mode(arr):
        counter = Counter(arr)
        max_count = max(counter.values())
        mode_values = [k for k, v in counter.items() if v == max_count]
        return mode_values[0]

    final_prediction = mode([nb_prediction, svm_prediction])

    
    # print(f'Final Prediction: {final_prediction}')
    predictions = {
        "rf_model_prediction": rf_prediction,
        "nb_model_prediction": nb_prediction,
        "svm_model_prediction": svm_prediction,
        "final_prediction": final_prediction
    }

    session['predicted_disease'] = predictions['final_prediction']
    print(predictions['final_prediction'])

    
    # # return jsonify({"prediction": predictions['final_prediction']})
    disease_descriptions = {}
    with open('../back_end/models/symptom_Description.csv', 'r', newline='') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)  # Skip the header row
        for row in reader:
            disease_name, description = row
            disease_descriptions[disease_name] = description

    description = disease_descriptions.get(predictions['final_prediction'], "Description not found.")
    print(description)

    # Retrieve the precautions for the predicted disease
    disease_precautions = {}
    with open('../back_end/models/symptom_precaution.csv', 'r', newline='') as csvfile:
        reader = csv.reader(csvfile)
        next(reader)  # Skip the header row
        for row in reader:
            disease, precaution_1, precaution_2, precaution_3, precaution_4 = row
            disease_precautions[disease] = [precaution_1, precaution_2, precaution_3, precaution_4]

    precautions = disease_precautions.get(predictions['final_prediction'], ["Precautions not found."])
    print(precautions)
    prediction = predictions['final_prediction']

    #Recommend a doctor related to their disease
    if prediction in specialization:
        specialize = specialization[prediction]
        print (f"For {prediction}, recommend consulting a {specialization[prediction]}.")
    else:
        print (f"No specific recommendation found for {prediction}.")

    #precaution is changed
    response = {
        "prediction": prediction,
        "description": description,
        "precautions": precautions,
        "specialize":specialize,
    }

    return jsonify(response)    


#Route for profile prediction...
@app.route('/profile', methods = ['GET','POST'])
def profile():

    user = request.get_json()
    email = user.get('email')
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM store WHERE email = %s', (email,))
    cursor.connection.commit()
    cursor.close()

    if user:
        user_details = {
            'name': user[0],
            'email': user[1],
            'gender': user[3],
            'age': user[4],
            'phone': user[5],
            'address': user[6]
        }
        return jsonify(user_details)
    else:
        return jsonify({'error': 'User not found'}), 404
    

#Route for profile prediction...
@app.route('/appoint', methods = ['GET','POST'])
def appoint():    
    data = request.json()
    print(data)

    
    




if __name__ == '__main__':
    app.run()