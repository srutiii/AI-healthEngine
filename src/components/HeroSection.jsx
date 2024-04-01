import { motion } from "framer-motion";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { fadeIn } from "../variants";

function HeroSection() {
  return (
    <div className="w-full h-[450px] overflow-hidden font-text">
      {/* <img className="bg-center" src="public/heroimg.png" alt="" /> */}

      <div className="w-full h-full">
        <div className="w-full flex items-center justify-center flex-col  h-full px-10">
          <motion.span
            // variants={fadeIn("down", 0.1)}
            // initial="hidden"
            // whileInView="show"
            // viewport={{ once: false, amount: 0.2 }}
            className="md:text-5xl text-3xl font-bold "
          >
            {" "}
            AI HealthEngine
          </motion.span>
          <motion.h1
            // variants={fadeIn("down", 0.2)}
            // initial="hidden"
            // whileInView="show"
            // viewport={{ once: false, amount: 0.2 }}
            className="md:text-2xl text-xs font-medium text-gray-700 "
          >
            "Where technology meets healthcare for a healthier future."
          </motion.h1>
          <div className="mt-2 ">
            <motion.button
              whileTap={{ scale: 0.8 }}
              className="px-5 py-2 rounded-full bg-btn2 flex items-center"
            >
              Get Started
              <FaArrowRight className="ml-2" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
