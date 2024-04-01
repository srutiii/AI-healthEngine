from flask import Flask, request, jsonify, session
# from flask_cors import CORS
# from flask_mysqldb import MySQL
import pandas as pd
import numpy as np
import pickle
import csv
from scipy.stats import mode
import warnings
from sklearn.ensemble import RandomForestClassifier
from collections import Counter
# from flask_bcrypt import Bcrypt 
# from flask_mail import Mail, Message



app = Flask(__name__)

# app.config['MAIL_SERVER'] = 'sandbox.smtp.mailtrap.io'
# app.config['MAIL_PORT'] = 2525
# app.config['MAIL_USERNAME'] = 'zerowood70@gmail.com'
# app.config['MAIL_PASSWORD'] = '1julyabhi'
# app.config['MAIL_USE_TLS'] = True
# app.config['MAIL_USE_SSL'] = False


# bcrypt = Bcrypt(app) 
# # CORS(app) 
# mail = Mail(app)

app.secret_key = "helloAI"


# app.config['MYSQL_HOST'] = 'localhost'
# app.config['MYSQL_USER'] = 'root'
# app.config['MYSQL_PASSWORD'] = ''
# app.config['MYSQL_DB'] = 'helloAI'
 
# mysql = MySQL(app)

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
        session['email'] = email
        return jsonify({"login":"login Successful"})
        return jsonify(logged_in=True, email=email)
    else:
        return jsonify(logged_in=False, message='Login failed. Please check your email and password.')


#This is SignUp Form
@app.route('/signup', methods=['POST'])
def signup():

    data = request.get_json()

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

    data = request.get_json()



    msg = Message(subject='Hello from the other side!', sender='peter@mailtrap.io', recipients=['paul@mailtrap.io'])
    msg.body = "Hey Paul, sending you this email from my Flask app, lmk if it works"
    mail.send(msg)
    return "Message sent!"

#Route for disease prediction...
@app.route('/diseasepredict/<symptoms>',methods = ['GET','POST'])
def predictDisease(symptoms):
    try:
        symptoms = symptoms.replace('<', '').replace('>', '')    
        symptoms = symptoms.split(',')

        # print(symptoms)
        # print(data_dict['predictions_classes'])
        input_data = [0] * len(data_dict["symptom_index"])
        for symptom in symptoms:
            # print(symptom)
            index = data_dict["symptom_index"].get(symptom.capitalize(), -1)
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
        print(predictions['final_prediction'])
        
        # return predictions['final_prediction']
        return jsonify({"prediction": final_prediction})
    except Exception as e:
        return jsonify({"error": str(e)})

@app.route('/get_symptoms', methods=['GET'])
def get_symptoms():
    print(data_dict)
    try:
        symptoms_list = list(data_dict["symptom_index"].keys())
        print(symptoms_list)
        return jsonify({"symptoms": symptoms_list})
    except Exception as e:
        return jsonify({"error": str(e)})



if __name__ == '__main__':
    app.run()
