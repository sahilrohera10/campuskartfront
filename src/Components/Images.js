import React from "react";
import Slider from "react-slick";

export default function Images() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <>
      <div className="banner">
        <Slider {...settings}>
          <div>
            <img
              src="stationaryBanner.png"
              style={{
                width: "95%",
                height: "300px",
                alignItems: "center",
                margin: "auto",
                marginTop: "80px",
              }}
              alt=""
            />
          </div>
          <div>
            <img
              src="booksBanner.png"
              style={{
                width: "95%",
                height: "300px",
                alignItems: "center",
                margin: "auto",
                marginTop: "80px",
              }}
              alt=""
            />
          </div>
          <div>
            <img
              src="elecBanner.png"
              style={{
                width: "95%",
                height: "300px",
                alignItems: "center",
                margin: "auto",
                marginTop: "80px",
              }}
              alt=""
            />
          </div>
        </Slider>
      </div>
      <div className="responsiveBanner">
        <Slider {...settings}>
          <div>
            <img
              src="RespStationeryGif.gif"
              style={{
                width: "95%",
                height: "350px",
                alignItems: "center",
                margin: "auto",
                marginTop: "80px",
              }}
              alt=""
            />
          </div>
          <div>
            <img
              src="RespBookGif.gif"
              style={{
                width: "95%",
                height: "350px",
                alignItems: "center",
                margin: "auto",
                marginTop: "80px",
              }}
              alt=""
            />
          </div>
          <div>
            <img
              src="RespElectronicsGif.gif"
              style={{
                width: "95%",
                height: "350px",
                alignItems: "center",
                margin: "auto",
                marginTop: "80px",
              }}
              alt=""
            />
          </div>
        </Slider>
      </div>
    </>
  );
}
