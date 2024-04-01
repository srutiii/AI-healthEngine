import { Link } from "react-router-dom";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { PiMedalDuotone } from "react-icons/pi";

function DoctorCard({
  name,
  Specialization,
  city,
  location,
  image,
  experience,
}) {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="w-[360px] shadow-sm shadow-gray-500  my-5 p-2">
      <div className="flex">
        <div className="">
          <img
            src="https://assets-global.website-files.com/6426543485efe6a5ade36f21/64eeb730f28ad152d8d18244_Introducing-Dr.-Carewise--Your-Empathetic-3D-Animated-Doctor-gigapixel-standard-scale-6_00x.jpg"
            alt=""
            className="flex w-32 px-2 py-2 items-center rounded-full "
          />
        </div>
        <div className="w-full">
          <div className="border-b-2 ">
            <h5 className="text-2xl flex justify-center font-bold font-text tracking-tight  px-2 ">
              Dr. {name}
            </h5>
            <div className="w-full justify-center text-gray-600 flex text-sm">
              <p>{Specialization} </p>
            </div>
          </div>
          <div className="font-text px-3 py-2 text-sm text-gray-700 font-medium text-justify mt-2 capitalize">
            <div className="flex items-center ">
              <FaLocationDot className="text-red-500" size={15} />
              <p className="mx-4">
                {city}, {location}{" "}
              </p>
            </div>
            <div className="flex mt-2">
              <PiMedalDuotone className="text-yellow-500" size={15} />
              <p className="mx-4">{experience} years of experience</p>
            </div>
          </div>

          <div className=" flex  justify-center items-center w-full bg-btn1 rounded">
            <Link className="px-2 py-2">
              <button
                onClick={() => setOpenModal(true)}
                className="  text-gray-800 font-semibold  py-1 rounded text-sm font-text "
              >
                Book Appointment
              </button>
            </Link>
            {/* <Link className="px-2 py-2">
              <button className="bg-blue-300  px-4 py-2 rounded text-sm font-sans"></button>
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
