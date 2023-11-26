import React from "react";
import contacts from "../../../YourSNS.json";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  return (
    <div className="snap-center w-full h-full p-4">
      <div className="flex md:flex-col">
        <span className="fa-solid fa-user fill-gray-300 text-gray-300 w-8 h-8 md:w-12 md:h-12 my-2"></span>
        <h2 className="text-4xl  my-2 text-gray-300">Contact</h2>
      </div>
      <div className="gap-4 md:grid-cols-3 grid-cols-2 grid mt-2 h-[80%]">
        {contacts.map(({ label, link, icon }) => (
          <motion.div
            className="bg-gray-300 rounded-3xl border-gray-300 relative flex justify-center items-center hover:dropshadow-xl shadow-white hover:bg-gray-100 transition duration-500 ease-in-out col-span-auto"
            key={label}
            whileHover={{ scale: 1.2 }}
            onHoverStart={(e) => {}}
            onHoverEnd={(e) => {}}
            drag
            dragConstraints={{
              top: -50,
              left: -50,
              right: 50,
              bottom: 50,
            }}
          >
            <a className="absolute w-full h-full right-0 top-0" href={link}>
              <span
                className={`fill-gray-800 text-gray-800 w-16 h-16 mx-auto ${icon}`}
                aria-label={label}
              />
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
