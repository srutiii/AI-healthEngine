import React, { useState } from "react";

function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [values, setValues] = useState({
    name: "Tom Holland",
    age: 25,
    weight: 70,
    height: 180,
    phoneNumber: "123-456-7890",
    email: "tom@example.com",
    address: "123 Main St, City, Country",
    image: "public/user.png",
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const handleViewFiles = () => {
    // Add logic to view uploaded files
    console.log(uploadedFiles);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // Add logic to save the edited details
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div className="w-full font-text">
      {/* user details */}
      <div className="w-[300px] h-[600px] bg-gray-200 p-2">
        <div className="flex flex-col w-full justify-center items-center">
          <img
            className="rounded-full w-32 h-32 object-cover shadow-md shadow-black border-[5px] border-btn2"
            src={values.image}
            alt=""
          />
          <h1 className="font-bold text-xl mt-2">{values.name}</h1>
          <p className="text-sm text-gray-700 font-medium">{values.email}</p>
        </div>
        {isEditing ? (
          <div>
            <div className="flex items-center ">
              <p>Age:</p>
              <input
                type="text"
                name="age"
                value={values.age}
                onChange={handleChange}
                placeholder="Age"
                className="my-2 px-2 rounded mx-2"
              />
            </div>
            <div className="flex  items-center">
              <p>Weight: </p>
              <input
                type="text"
                name="weight"
                value={values.weight}
                onChange={handleChange}
                placeholder="Weight"
                className="my-2 px-2 rounded mx-2"
              />
            </div>
            <div className="flex items-center">
              <p>Height</p>
              <input
                type="text"
                name="height"
                value={values.height}
                onChange={handleChange}
                placeholder="Height"
                className="my-2 px-2 rounded mx-2"
              />
            </div>
            <div className="flex items-center">
              <p>Phone: </p>
              <input
                type="text"
                name="phoneNumber"
                value={values.phoneNumber}
                onChange={handleChange}
                placeholder="Phone number"
                className="my-2 px-2 rounded mx-2"
              />
            </div>
            <div className="flex items-center">
              <p>Email: </p>
              <input
                type="text"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Email"
                className="my-2 px-2 rounded mx-2"
              />
            </div>
            <div className="flex items-center">
              <p>Address:</p>
              <input
                type="text"
                name="address"
                value={values.address}
                onChange={handleChange}
                placeholder="Address"
                className="my-2 px-2 rounded mx-2"
              />
            </div>
            <div className="flex justify-center items-center w-full mt-5">
              <button
                onClick={handleSaveClick}
                className="flex justify-center items-center  bg-btn2 px-5 py-2 rounded mb-3"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="p-2">
            <p className="text-base font-medium m-2">
              Age:{" "}
              <span className="text-sm text-gray-800 font-normal">
                {values.age}
              </span>
            </p>
            <p className="text-base font-medium m-2">
              Weight:{" "}
              <span className="text-sm text-gray-800 font-normal">
                {values.weight}
              </span>
            </p>
            <p className="text-base font-medium m-2">
              Height:{" "}
              <span className="text-sm text-gray-800 font-normal">
                {values.height}
              </span>{" "}
            </p>
            <p className="text-base font-medium m-2">
              Phone number:{" "}
              <span className="text-sm text-gray-800 font-normal">
                {values.phoneNumber}
              </span>
            </p>
            {/* <p>Email: {values.email}</p> */}
            <p className="text-base font-medium m-2">
              Address:{" "}
              <span className="text-sm text-gray-800 font-normal">
                {values.address}
              </span>
            </p>
            <div className="flex justify-center items-center w-full mt-5">
              <button
                onClick={handleEditClick}
                className="px-5 py-2 rounded bg-btn2"
              >
                Edit
              </button>
            </div>
          </div>
        )}
        {isEditing ? (
          <div>
            {/* ...Input fields for editing details... */}
            <div>
              <input
                type="file"
                placeholder="upload report"
                onChange={handleFileUpload}
              />
            </div>
            <div>
              <button
                onClick={handleViewFiles}
                className="flex justify-center items-center w-full px-5 py-2 rounded mt-2  bg-btn2"
              >
                View Uploaded Files
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* ...Display fields for non-edit mode... */}
            <button
              onClick={handleEditClick}
              className="flex justify-center items-center w-full px-5 py-2 rounded mt-2  bg-btn2"
            >
              Upload Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
