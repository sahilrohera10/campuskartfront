import React from "react";

const FeatureProducts = () => {
  return (
    <div className="2xl:mx-auto 2xl:container">
      <div className="lg:px-20 md:px-6 px-4 md:py-12 py-8">
        <h1 className="lg:text-4xl text-3xl font-semibold text-gray-800 text-center">
          Featured Products
        </h1>
        <div className="flex justify-center">
          <div
            style={{ width: "1100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 lg:mt-16 md:mt-12 mt-8 items-center"
          >
            <div className="relative flex flex-col">
              <img
                src="https://skillsify.in/wp-content/uploads/2020/12/bba-3rd-sem.jpg"
                alt="two girls"
                className="w-full"
              />
              <img
                src="https://i.ibb.co/Tb5CKHn/Rectangle-49.png"
                alt="opacity bg"
                className="absolute top-0"
              />
              <div className="absolute m-6 bottom-0 z-30">
                <p className="text-sm leading-none text-white"></p>
                <h1 className="w-64 text-2xl font-semibold leading-8 mt-2 text-white">
                  Akash Books
                </h1>
                <p className="mt-4 text-base font-medium cursor-pointer leading-4 underline text-white">
                  Discover
                </p>
              </div>
            </div>
            <div className="relative flex flex-col">
              <img
                src="http://images.indialisted.com/nlarge/omega_mini_drafter_at_cheapest_cost_5555754.jpg"
                alt="black guy"
                // className="w-full"
              />
              <img
                src="https://i.ibb.co/Tb5CKHn/Rectangle-49.png"
                alt="opacity bg"
                className="absolute top-0"
              />
              <div className="absolute m-6 bottom-0 z-30">
                <p className="text-sm leading-none text-white"></p>
                <h1 className="w-64 text-2xl font-semibold leading-8 mt-2 text-white">
                  Drafters
                </h1>
                <p className="mt-4 text-base font-medium cursor-pointer leading-4 underline text-white">
                  Discover
                </p>
              </div>
            </div>
            <div className="relative flex flex-col">
              <img
                src="https://www.lifewire.com/thmb/92ocQcUPVCzxeugWOX4beRdKZn0=/900x0/filters:no_upscale():max_bytes(150000):strip_icc()/RazerKrakenUltimate-ac809e1d099b44cc8cbe3fb1881572d8.jpg"
                alt="black guy"
                className="w-full"
              />
              <img
                src="https://i.ibb.co/Tb5CKHn/Rectangle-49.png"
                alt="opacity bg"
                className="absolute w-full top-0"
              />
              <div className="absolute m-6 bottom-0 z-30">
                <p className="text-sm leading-none text-white"></p>
                <h1 className="w-64 text-2xl font-semibold leading-8 mt-2 text-white">
                  Headsets
                </h1>
                <p className="mt-4 text-base font-medium cursor-pointer leading-4 underline text-white">
                  Discover
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureProducts;
