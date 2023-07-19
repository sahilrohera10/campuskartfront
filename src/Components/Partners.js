import React from "react";

function Partners() {
  return (
    <>
      <div className="px-4 py-12">
        <div className="lg:max-w-[1440px] md:max-w-[744px] max-w-[375px] w-full  py-12 bg-gray-100 mx-auto">
          <div className="mb-10">
            <p className="text-3xl font-semibold leading-9 text-center text-gray-800 lg:text-4xl">
              Valuable Partnerships
            </p>
          </div>
          <div className="lg:max-w-[1280px] w-full bg-white px-12 py-12 mx-auto">
            <div className="block lg:block md:hidden">
              <div
                style={{ display: "flex", justifyContent: "space-evenly" }}
                className="flex flex-col items-center justify-center lg:justify-between lg:flex-row gap-x-5 gap-y-12"
              >
                <p
                  style={{
                    fontSize: "30px",
                    fontWeight: "600",
                    fontFamily: "cursive",
                  }}
                >
                  MAIT
                </p>

                <p className="border-r border-gray-400 lg:block hidden h-[30px] " />
                <p
                  style={{
                    fontSize: "30px",
                    fontWeight: "600",
                    fontFamily: "cursive",
                  }}
                >
                  TechnoMaits
                </p>

                <p className="border-r border-gray-400 lg:block hidden h-[30px]" />
                <p
                  style={{
                    fontSize: "30px",
                    fontWeight: "600",
                    fontFamily: "cursive",
                  }}
                >
                  MAIMS
                </p>

                <p className="border-r border-gray-400 lg:block hidden h-[30px]" />
                <p
                  style={{
                    fontSize: "30px",
                    fontWeight: "600",
                    fontFamily: "cursive",
                  }}
                >
                  MATES
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Partners;
