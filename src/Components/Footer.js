import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="mx-auto container xl:px-20 lg:px-12 sm:px-6 px-4 px-4 py-12">
      <div className="flex flex-col items-center justify-center">
        <div>
          <h1 style={{ fontSize: "30px", fontWeight: "600" }}>Campus Kart</h1>
        </div>

        <div className="flex items-center gap-x-8 mt-6"></div>
        <div className="flex items-center mt-6">
          <p className="text-base leading-4 text-gray-800">
            2022 <span className="font-semibold">Campus Kart</span>
          </p>
          <div className="border-l border-gray-800 pl-2 ml-2">
            <p className="text-base leading-4 text-gray-800">
              Inc. All rights reserved
            </p>
          </div>
        </div>
        <p>
          Developed By team{" "}
          <a href="https://technomaits.vercel.app/" target="_blank">
            Technomaits
          </a>{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
