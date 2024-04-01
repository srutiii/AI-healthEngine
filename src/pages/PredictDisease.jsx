import React, { useState, useEffect } from "react";
import { IoMdSend } from "react-icons/io";

function PredictDisease() {
  const [symptoms, setSymptoms] = useState({
    symptom1: "",
    symptom2: "",
    symptom3: "",
  });
  const [prediction, setPrediction] = useState("");
  const [symptomList, setSymptomList] = useState([]);

  useEffect(() => {
    fetch("/get_symptoms")
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error fetching symptoms:", data.error);
          // Handle error, e.g., display error message to user
        } else {
          setSymptomList(data.symptoms);
          console.log(symptomList);
        }
      })
      .catch((error) => console.error("Error fetching symptoms:", error));
  }, []);

  const handlePredict = async () => {
    try {
      const response = await fetch(
        `/diseasepredict/${symptoms.symptom1},${symptoms.symptom2},${symptoms.symptom3}`
      );
      const data = await response.json();
      if (data.error) {
        console.error("Error predicting disease:", data.error);
        // Handle error, e.g., display error message to user
      } else {
        setPrediction(data.prediction);
      }
    } catch (error) {
      console.error("Error predicting disease:", error);
      // Handle error, e.g., display error message to user
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSymptoms((prevSymptoms) => ({
      ...prevSymptoms,
      [name]: value,
    }));
  };

  // const handlePredict = async () => {
  //   try {
  //     const response = await fetch(
  //       `/diseasepredict/${symptoms.symptom1},${symptoms.symptom2},${symptoms.symptom3}`
  //     );
  //     const data = await response.json();
  //     setPrediction(data.prediction);
  //   } catch (error) {
  //     console.error("Error predicting disease:", error);
  //   }
  // };

  return (
    <div className="">
      <div className=" w-full h-screen mb-20 font-text">
        <div className=" w-full flex justify-between px-10 mt-32">
          <div className="w-1/2 flex justify-center items-center ">
            <h2 className="text-lightText  capitalize text-6xl">
              how does it work?
            </h2>
          </div>
          <div className="w-2/3 flex justify-center items-center text-gray-700">
            <ul className="px-2 ">
              <li className="py-2 px-2 border-l-2 border-lightText mb-2 text-justify">
                Our model is trained on extensive and diverse datasets,
                facilitating comprehensive learning. It is rigorously tested,
                achieving a remarkable 100% accuracy rate in disease prediction,
                ensuring reliable and effective healthcare outcomes.
              </li>
              <li className="py-2 px-2  border-l-2 border-lightText  mb-2 text-justify">
                Utilizing supervised learning and advanced Machine Learning
                algorithms, our model maps symptoms to diseases during training.
                This approach ensures precise predictions and empowers proactive
                healthcare interventions.
              </li>
              <li className="py-2 px-2 border-l-2 border-lightText  mb-2 text-justify">
                The outcome is a robust disease prediction system capable of
                accurately identifying health conditions based on symptoms,
                enabling timely interventions and informed healthcare decisions
                for improved patient outcomes.
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center mt-20">
          <img src="src/assets/healthcare.png" alt="" />
          <h2 className="flex justify-center mt-10 font-bold text-xl text-gray-500">
            "Experience the future of healthcare with our Disease Prediction
            System – data-driven insights pave the way for a healthier
            tomorrow."
          </h2>
        </div>
        <div className="flex justify-center mt-10">
          <form className="">
            <div className="flex">
              <div className="mx-3">
                <label>
                  Symptom 1:
                  <select
                    name="symptom1"
                    value={symptoms.symptom1}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Symptom</option>
                    {symptomList.map((symptom) => (
                      <option key={symptom} value={symptom}>
                        {symptom}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="mx-3">
                <label>
                  Symptom 2:
                  <select
                    name="symptom2"
                    value={symptoms.symptom2}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Symptom</option>
                    {symptomList.map((symptom) => (
                      <option key={symptom} value={symptom}>
                        {symptom}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="mx-3">
                <label>
                  Symptom 3:
                  <select
                    name="symptom3"
                    value={symptoms.symptom3}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Symptom</option>
                    {symptomList.map((symptom) => (
                      <option key={symptom} value={symptom}>
                        {symptom}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handlePredict}
                className="bg-btn2 px-4 py-2 rounded mt-5"
              >
                Predict
              </button>
            </div>
          </form>
        </div>
        {prediction && (
          <div className="flex justify-center mt-4">
            <p>Predicted Disease: {prediction}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PredictDisease;
