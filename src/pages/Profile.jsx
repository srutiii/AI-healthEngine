import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const [activeSection, setActiveSection] = useState("about");
  const [values, setValues] = useState({
    name: "",
    age: "",
    gender: "",
    phoneNumber: "",
    email: "",
    address: "",
    joiningDate: "",
    image: "public/user.png",
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { email } = useAuth();

  useEffect(() => {
    // Fetch user data from the backend
    fetch("http://localhost:5000/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          setValues({
            ...values,
            name: data.name,
            age: data.age,
            gender: data.gender,
            phoneNumber: data.phone,
            email: data.email,
            address: data.address,
            joiningDate: data.joiningDate || "",
          });
        }
      })
      .catch((error) => console.error("Error fetching profile:", error));
  }, []);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file);
    });
    formData.append("user_id", 1); // Replace 1 with the actual user ID or retrieve it from the authentication context

    fetch("http://localhost:5000/upload_report", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Handle response from the server
      })
      .catch((error) => console.error("Error uploading report:", error));
  };

  const handleDeleteFile = (index) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== index));
  };

  const renderAboutSection = () => {
    return (
      <div className="p-2">
        <div className="w-full bg-gray-300 p-2 rounded mb-4">
          <h2 className="text-xl font-bold mb-2">Personal Details</h2>
          <div className="relative">
            <p>Name: {values.name}</p>
            <p>Age: {values.age}</p>
            <p>Gender: {values.gender}</p>
            <p>Phone: {values.phoneNumber}</p>
            <p>Email: {values.email}</p>
            <p>Address: {values.address}</p>
            <p>Joining Date: {values.joiningDate}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full font-text flex">
      {/* Left side */}
      <div className="w-[300px] h-fit bg-gray-200 p-2">
        <div className="flex flex-col w-full justify-center items-center">
          <img
            className="rounded-full w-32 h-32 object-cover shadow-md shadow-black border-[5px] border-btn2"
            src={values.image}
            alt=""
          />
          <h1 className="font-bold text-xl mt-2">{values.name}</h1>
          <p className="text-sm text-gray-700 font-medium">{values.email}</p>
        </div>
        <div className="p-2">
          <p className="text-base font-medium m-2">
            Age:{" "}
            <span className="text-sm text-gray-800 font-normal">
              {values.age}
            </span>
          </p>
          <p className="text-base font-medium m-2">
            Gender:{" "}
            <span className="text-sm text-gray-800 font-normal">
              {values.gender}
            </span>
          </p>
          <p className="text-base font-medium m-2">
            Phone:{" "}
            <span className="text-sm text-gray-800 font-normal">
              {values.phoneNumber}
            </span>
          </p>
          <p className="text-base font-medium m-2">
            Address:{" "}
            <span className="text-sm text-gray-800 font-normal">
              {values.address}
            </span>
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex-1 p-2">
        <div className="flex mb-4">
          <button
            onClick={() => setActiveSection("about")}
            className={`flex-1 p-2 ${
              activeSection === "about"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            About
          </button>
          <button
            onClick={() => setActiveSection("reports")}
            className={`flex-1 p-2 ${
              activeSection === "reports"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            Reports
          </button>
          <button
            onClick={() => setActiveSection("appointments")}
            className={`flex-1 p-2 ${
              activeSection === "appointments"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            }`}
          >
            Appointments
          </button>
        </div>
        {activeSection === "about" && renderAboutSection()}
        {activeSection === "reports" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Reports</h2>
            <div className="flex flex-col">
              <input
                type="file"
                onChange={handleFileUpload}
                multiple
                className="mb-4"
              />
              {uploadedFiles.length > 0 && (
                <div className="bg-gray-200 p-2 rounded">
                  <h3 className="text-lg font-bold mb-2">Uploaded Files</h3>
                  <ul>
                    {uploadedFiles.map((fileURL, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span>{fileURL.split("/").pop()}</span>
                        <div className="flex">
                          <button
                            onClick={() => window.open(fileURL, "_blank")}
                            className="text-blue-500 hover:text-blue-700 mr-2"
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDeleteFile(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
        {activeSection === "appointments" && (
          <div>
            <h2 className="text-xl font-bold mb-2">Appointments</h2>
            {/* Add appointment details or management here */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
