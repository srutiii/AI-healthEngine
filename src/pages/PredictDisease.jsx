import React, { useState } from "react";

function PredictDisease() {
  const symptoms = [
    "itching",
    "skin_rash",
    "nodal_skin_eruptions",
    "continuous_sneezing",
    "shivering",
    "chills",
    "joint_pain",
    "stomach_pain",
    "acidity",
    "ulcers_on_tongue",
    "muscle_wasting",
    "vomiting",
    "burning_micturition",
    "spotting_urination",
    "fatigue",
    "weight_gain",
    "anxiety",
    "cold_hands_and_feets",
    "mood_swings",
    "weight_loss",
    "restlessness",
    "lethargy",
    "patches_in_throat",
    "irregular_sugar_level",
    "cough",
    "high_fever",
    "sunken_eyes",
    "breathlessness",
    "sweating",
    "dehydration",
    "indigestion",
    "headache",
    "yellowish_skin",
    "dark_urine",
    "nausea",
    "loss_of_appetite",
    "pain_behind_the_eyes",
    "back_pain",
    "constipation",
    "abdominal_pain",
    "diarrhoea",
    "mild_fever",
    "yellow_urine",
    "yellowing_of_eyes",
    "acute_liver_failure",
    "fluid_overload",
    "swelling_of_stomach",
    "swelled_lymph_nodes",
    "malaise",
    "blurred_and_distorted_vision",
    "phlegm",
    "throat_irritation",
    "redness_of_eyes",
    "sinus_pressure",
    "runny_nose",
    "congestion",
    "chest_pain",
    "weakness_in_limbs",
    "fast_heart_rate",
    "pain_during_bowel_movements",
    "pain_in_anal_region",
    "bloody_stool",
    "irritation_in_anus",
    "neck_pain",
    "dizziness",
    "cramps",
    "bruising",
    "obesity",
    "swollen_legs",
    "swollen_blood_vessels",
    "puffy_face_and_eyes",
    "enlarged_thyroid",
    "brittle_nails",
    "swollen_extremeties",
    "excessive_hunger",
    "extra_marital_contacts",
    "drying_and_tingling_lips",
    "slurred_speech",
    "knee_pain",
    "hip_joint_pain",
    "muscle_weakness",
    "stiff_neck",
    "swelling_joints",
    "movement_stiffness",
    "spinning_movements",
    "loss_of_balance",
    "unsteadiness",
    "weakness_of_one_body_side",
    "loss_of_smell",
    "bladder_discomfort",
    "foul_smell_of_urine",
    "continuous_feel_of_urine",
    "passage_of_gases",
    "internal_itching",
    "toxic_look_(typhos)",
    "depression",
    "irritability",
    "muscle_pain",
    "altered_sensorium",
    "red_spots_over_body",
    "belly_pain",
    "abnormal_menstruation",
    "dischromic_patches",
    "watering_from_eyes",
    "increased_appetite",
    "polyuria",
    "family_history",
    "mucoid_sputum",
    "rusty_sputum",
    "lack_of_concentration",
    "visual_disturbances",
    "receiving_blood_transfusion",
    "receiving_unsterile_injections",
    "coma",
    "stomach_bleeding",
    "distention_of_abdomen",
    "history_of_alcohol_consumption",
    "fluid_overload",
    "blood_in_sputum",
    "prominent_veins_on_calf",
    "palpitations",
    "painful_walking",
    "pus_filled_pimples",
    "blackheads",
    "scurring",
    "skin_peeling",
    "silver_like_dusting",
    "small_dents_in_nails",
    "inflammatory_nails",
    "blister",
    "red_sore_around_nose",
    "yellow_crust_ooze",
    "prognosis",
  ];

  const [predictionData, setPredictionData] = useState({
    prediction: '',
    description: '',
    // precautions: [],
  });

  const [selectedSymptoms, setSelectedSymptoms] = useState({
    symptom1: "",
    symptom2: "",
    symptom3: "",
  });

  const handlePredict = async () => {
    try {
      const response = await fetch('http://localhost:5000/diseasepredict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedSymptoms),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        console.error("Error predicting disease:", data.error);
      } else {
        setPredictionData({
          prediction: data.prediction,
          description: data.description,
          // precautions: data.precautions,
        });
      }
    } catch (error) {
      console.error("Error predicting disease:", error.message);
    }
  };
  
  // hello

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedSymptoms((prevSymptoms) => ({
      ...prevSymptoms,
      [name]: value,
    }));
  };

  return (
    <div className="">
      <div className="w-full h-screen mb-20 font-text">
        <div className="flex justify-center mt-10">
          <form className="">
            <div className="flex">
              <div className="mx-3">
                <label>
                  Symptom 1:
                  <select
                    name="symptom1"
                    value={selectedSymptoms.symptom1}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Symptom</option>
                    {symptoms.map((symptom) => (
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
                    value={selectedSymptoms.symptom2}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Symptom</option>
                    {symptoms.map((symptom) => (
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
                    value={selectedSymptoms.symptom3}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Symptom</option>
                    {symptoms.map((symptom) => (
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
          {predictionData.prediction && (
            <div className="flex flex-col justify-center mt-4">
              <p>Predicted Disease: {predictionData.prediction}</p>
              <p>Description: {predictionData.description}</p>
              <div>
                {/* <p>Precautions:</p> */}
                <ul>
                  {/* {predictionData.precautions.map((precaution, index) => (
                    <li key={index}>{precaution}</li>
                  ))} */}
                </ul>
              </div>
            </div>
          )}
        </div>
        <div className="w-full flex justify-between p-10 mt-32 bg-gray-100">
          <div className="w-1/2 flex justify-center items-center">
            <h2 className="text-lightText capitalize text-6xl">
              How does it work?
            </h2>
          </div>
          <div className="w-2/3 flex justify-center items-center text-gray-700">
            <ul className="px-2">
              <li className="py-2 px-2 border-l-2 border-lightText mb-2 text-justify">
                Our model is trained on extensive and diverse datasets,
                facilitating comprehensive learning. It is rigorously tested,
                achieving a remarkable 100% accuracy rate in disease prediction,
                ensuring reliable and effective healthcare outcomes.
              </li>
              <li className="py-2 px-2 border-l-2 border-lightText mb-2 text-justify">
                Utilizing supervised learning and advanced Machine Learning
                algorithms, our model maps symptoms to diseases during training.
                This approach ensures precise predictions and empowers proactive
                healthcare interventions.
              </li>
              <li className="py-2 px-2 border-l-2 border-lightText mb-2 text-justify">
                The outcome is a robust disease prediction system capable of
                accurately identifying health conditions based on symptoms,
                enabling timely interventions and informed healthcare decisions
                for improved patient outcomes.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictDisease;




// import React, { useState } from "react";

// function PredictDisease() {
//   const symptoms = [
//     "itching",
//     "skin_rash",
//     "nodal_skin_eruptions",
//     "continuous_sneezing",
//     "shivering",
//     "chills",
//     "joint_pain",
//     "stomach_pain",
//     "acidity",
//     "ulcers_on_tongue",
//     "muscle_wasting",
//     "vomiting",
//     "burning_micturition",
//     "spotting_urination",
//     "fatigue",
//     "weight_gain",
//     "anxiety",
//     "cold_hands_and_feets",
//     "mood_swings",
//     "weight_loss",
//     "restlessness",
//     "lethargy",
//     "patches_in_throat",
//     "irregular_sugar_level",
//     "cough",
//     "high_fever",
//     "sunken_eyes",
//     "breathlessness",
//     "sweating",
//     "dehydration",
//     "indigestion",
//     "headache",
//     "yellowish_skin",
//     "dark_urine",
//     "nausea",
//     "loss_of_appetite",
//     "pain_behind_the_eyes",
//     "back_pain",
//     "constipation",
//     "abdominal_pain",
//     "diarrhoea",
//     "mild_fever",
//     "yellow_urine",
//     "yellowing_of_eyes",
//     "acute_liver_failure",
//     "fluid_overload",
//     "swelling_of_stomach",
//     "swelled_lymph_nodes",
//     "malaise",
//     "blurred_and_distorted_vision",
//     "phlegm",
//     "throat_irritation",
//     "redness_of_eyes",
//     "sinus_pressure",
//     "runny_nose",
//     "congestion",
//     "chest_pain",
//     "weakness_in_limbs",
//     "fast_heart_rate",
//     "pain_during_bowel_movements",
//     "pain_in_anal_region",
//     "bloody_stool",
//     "irritation_in_anus",
//     "neck_pain",
//     "dizziness",
//     "cramps",
//     "bruising",
//     "obesity",
//     "swollen_legs",
//     "swollen_blood_vessels",
//     "puffy_face_and_eyes",
//     "enlarged_thyroid",
//     "brittle_nails",
//     "swollen_extremeties",
//     "excessive_hunger",
//     "extra_marital_contacts",
//     "drying_and_tingling_lips",
//     "slurred_speech",
//     "knee_pain",
//     "hip_joint_pain",
//     "muscle_weakness",
//     "stiff_neck",
//     "swelling_joints",
//     "movement_stiffness",
//     "spinning_movements",
//     "loss_of_balance",
//     "unsteadiness",
//     "weakness_of_one_body_side",
//     "loss_of_smell",
//     "bladder_discomfort",
//     "foul_smell_of_urine",
//     "continuous_feel_of_urine",
//     "passage_of_gases",
//     "internal_itching",
//     "toxic_look_(typhos)",
//     "depression",
//     "irritability",
//     "muscle_pain",
//     "altered_sensorium",
//     "red_spots_over_body",
//     "belly_pain",
//     "abnormal_menstruation",
//     "dischromic_patches",
//     "watering_from_eyes",
//     "increased_appetite",
//     "polyuria",
//     "family_history",
//     "mucoid_sputum",
//     "rusty_sputum",
//     "lack_of_concentration",
//     "visual_disturbances",
//     "receiving_blood_transfusion",
//     "receiving_unsterile_injections",
//     "coma",
//     "stomach_bleeding",
//     "distention_of_abdomen",
//     "history_of_alcohol_consumption",
//     "fluid_overload",
//     "blood_in_sputum",
//     "prominent_veins_on_calf",
//     "palpitations",
//     "painful_walking",
//     "pus_filled_pimples",
//     "blackheads",
//     "scurring",
//     "skin_peeling",
//     "silver_like_dusting",
//     "small_dents_in_nails",
//     "inflammatory_nails",
//     "blister",
//     "red_sore_around_nose",
//     "yellow_crust_ooze",
//     "prognosis",
//   ];

//   const PredictDisease = ({ symptoms }) => {
//     const [predictionData, setPredictionData] = useState({
//       prediction: '',
//       description: '',
//       precautions: [],
//     });
//     const [selectedSymptoms, setSelectedSymptoms] = useState({
//     symptom1: "",
//     symptom2: "",
//     symptom3: "",
//   });

//   const handlePredict = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/diseasepredict', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(selectedSymptoms),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       if (data.error) {
//         console.error("Error predicting disease:", data.error);
//       } else {
//         setPredictionData({
//           prediction: data.prediction.final_prediction,
//           description: data.description,
//           precautions: data.precautions,
//         });
//       }
//     } catch (error) {
//       console.error("Error predicting disease:", error.message);
//     }
//   }

  // const handlePredict = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5000/diseasepredict', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(selectedSymptoms),
  //     });

  //     if (!response.ok) {
  //       // If response is not ok, throw an error
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     if (data.error) {
  //       console.error("Error predicting disease:", data.error);
  //       // Handle error, e.g., display error message to user
  //     } else {
  //       setPrediction(data.prediction);
  //     }
  //   } catch (error) {
  //     console.error("Error predicting disease:", error.message);
  //     // Handle error, e.g., display error message to user
  //   }
  // };


  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setSelectedSymptoms((prevSymptoms) => ({
  //     ...prevSymptoms,
  //     [name]: value,
  //   }));
  // };

//   return (
//     <div className="">
//       <div className="w-full h-screen mb-20 font-text">
//         <div className="flex justify-center mt-10">
//           <form className="">
//             <div className="flex">
//               <div className="mx-3">
//                 <label>
//                   Symptom 1:
//                   <select
//                     name="symptom1"
//                     value={selectedSymptoms.symptom1}
//                     onChange={handleInputChange}
//                   >
//                     <option value="">Select Symptom</option>
//                     {symptoms.map((symptom) => (
//                       <option key={symptom} value={symptom}>
//                         {symptom}
//                       </option>
//                     ))}
//                   </select>
//                 </label>
//               </div>
//               <div className="mx-3">
//                 <label>
//                   Symptom 2:
//                   <select
//                     name="symptom2"
//                     value={selectedSymptoms.symptom2}
//                     onChange={handleInputChange}
//                   >
//                     <option value="">Select Symptom</option>
//                     {symptoms.map((symptom) => (
//                       <option key={symptom} value={symptom}>
//                         {symptom}
//                       </option>
//                     ))}
//                   </select>
//                 </label>
//               </div>
//               <div className="mx-3">
//                 <label>
//                   Symptom 3:
//                   <select
//                     name="symptom3"
//                     value={selectedSymptoms.symptom3}
//                     onChange={handleInputChange}
//                   >
//                     <option value="">Select Symptom</option>
//                     {symptoms.map((symptom) => (
//                       <option key={symptom} value={symptom}>
//                         {symptom}
//                       </option>
//                     ))}
//                   </select>
//                 </label>
//               </div>
//             </div>
//             <div className="flex justify-center">
//               <button
//                 type="button"
//                 onClick={handlePredict}
//                 className="bg-btn2 px-4 py-2 rounded mt-5"
//               >
//                 Predict
//               </button>
//             </div>
//           </form>
//           {prediction && (
//             <div className="flex justify-center mt-4">
//               <p>Predicted Disease: {prediction}</p>
//             </div>
//           )}
//         </div>
//         <div className="w-full flex justify-between p-10 mt-32 bg-gray-100">
//           <div className="w-1/2 flex justify-center items-center">
//             <h2 className="text-lightText capitalize text-6xl">
//               How does it work?
//             </h2>
//           </div>

//           <div className="w-2/3 flex justify-center items-center text-gray-700">
//             <ul className="px-2">
//               <li className="py-2 px-2 border-l-2 border-lightText mb-2 text-justify">
//                 Our model is trained on extensive and diverse datasets,
//                 facilitating comprehensive learning. It is rigorously tested,
//                 achieving a remarkable 100% accuracy rate in disease prediction,
//                 ensuring reliable and effective healthcare outcomes.
//               </li>
//               <li className="py-2 px-2 border-l-2 border-lightText mb-2 text-justify">
//                 Utilizing supervised learning and advanced Machine Learning
//                 algorithms, our model maps symptoms to diseases during training.
//                 This approach ensures precise predictions and empowers proactive
//                 healthcare interventions.
//               </li>
//               <li className="py-2 px-2 border-l-2 border-lightText mb-2 text-justify">
//                 The outcome is a robust disease prediction system capable of
//                 accurately identifying health conditions based on symptoms,
//                 enabling timely interventions and informed healthcare decisions
//                 for improved patient outcomes.
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// export default PredictDisease;


