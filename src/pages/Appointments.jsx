import React, { useState } from "react";
import DoctorCard from "../components/DoctorCard";
import { FaSearch } from "react-icons/fa";
// import axios from "axios";
// import { load } from "cheerio";

function DoctorRecommend() {
  const [specialisation, setSpecialisation] = useState("");
  const [location, setLocation] = useState("");
  const [doctorsList, setDoctorsList] = useState([]);

  const handleSpecialisationChange = (event) => {
    setSpecialisation(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  // const fetchData = async () => {
  //   try {
  //     console.log("Searching...");

  //     const response = await axios.get("https://www.practo.com/doctors");

  //     console.log(response);
  //     console.log("Searching...");

  //     const html = response.data;
  //     const $ = load(html);

  //     const doctorsList = [];

  //     $(".doctor-card").each((index, element) => {
  //       const name = $(element).find(".doctor-name").text();
  //       const specialization = $(element).find(".doctor-specialization").text();
  //       const city = $(element).find(".doctor-location").text();

  //       doctorsList.push({ name, specialization, city });
  //     });

  //     setDoctorsList(doctorsList);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  return (
    <>
      <div className="w-full h-full relative font-text bg-lightBackground">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full h-[350px] bg-right bg-doc bg-fixed ">
            <div className="w-full h-full bg-black bg-opacity-60 flex flex-col justify-center items-center px-10">
              <h1 className="text-6xl top-20 justify-start items-center text-white font-text font-bold">
                Find Doctor
              </h1>
              <p className="text-white italic">
                "Effortless doctor appointments: Book with ease, stay healthy!"
              </p>
            </div>
          </div>

          <div className="flex px-10 py-3 w-full mt-5 ">
            <div className="px-6 flex ">
              <div className="px-4 ">
                <select
                  value={specialisation}
                  onChange={handleSpecialisationChange}
                  className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-btn2"
                >
                  <option value="">Specialisation</option>
                  <option value="Oncologist">Oncologist</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Neurosurgeon">Neurosurgeon</option>
                  <option value="Cardiac Surgeon">Cardiac Surgeon</option>
                  <option value="Orthopaedic">Orthopaedic</option>
                  <option value="Cosmetic Surgeon">Cosmetic Surgeon</option>
                </select>
              </div>
              <div>
                <select
                  value={location}
                  onChange={handleLocationChange}
                  className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-btn2"
                >
                  <option value="">Location</option>
                  <option value="Kolkata">Kolkata</option>
                  <option value="New Delhi">New Delhi</option>
                  <option value="Bangalore">Banglore</option>
                  <option value="Kochi">Kochi</option>
                  <option value="Kota">Kota</option>
                  <option value="Chennai">Chennai</option>
                </select>
              </div>
              <div className="flex justify-center items-center px-2">
                <button
                  className="flex justify-center items-center bg-btn2 py-2 px-3 rounded "
                  // onClick={fetchData}
                >
                  <span className="pr-2">Search</span>
                  <FaSearch className="" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-5 grid grid-cols-3">
          <DoctorCard
            name="Name"
            city="city"
            location="location"
            Specialization="something"
            rating="3"
            experience="5"
          />
          {/* <DoctorCard
            name="Name"
            city="city"
            location="location"
            specialisation="something"
          />
          <DoctorCard
            name="Name"
            city="city"
            location="location"
            specialisation="something"
          />
          <DoctorCard
            name="Name"
            city="city"
            location="location"
            specialisation="something"
          />
          <DoctorCard
            name="Name"
            city="city"
            location="location"
            specialisation="something"
          /> */}
        </div>
      </div>
    </>
  );
}

export default DoctorRecommend;
