import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import configData from "../config.json";

export default function ContactUs() {
  const [values, setValues] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      name: values.name,
      Email: values.email,
      message: values.message,
    };

    handleClose();

    console.log(body);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };

    try {
      const resp1 = await fetch(
        `${configData.apiurl}/contactmail`,
        requestOptions
      );

      if (resp1.ok) {
        handleClick();
        // alert("submitted")
      }
      // handleClicked();
      else throw { msg: "failed" };
    } catch (error) {
      console.log("Err ", error);
      error = error.msg ? error.msg : "could not submit the form";
      // alert(error) ;
      handleClicked();
    }
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openPopUp, setOpenPopUp] = React.useState(false);
  const [openPopUpError, setOpenPopUpError] = React.useState(false);

  const handleClicked = () => {
    setOpenPopUpError(true);
  };

  const handleClosePopError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenPopUpError(false);
  };

  const handleClick = () => {
    setOpenPopUp(true);
  };

  const handleClosePop = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenPopUp(false);
  };

  return (
    <>
      <Snackbar open={openPopUp} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClosePop}
          severity="success"
          sx={{ width: "100%" }}
        >
          Sent Successfully
        </Alert>
      </Snackbar>

      <Snackbar
        open={openPopUpError}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClosePopError}
          severity="error"
          sx={{ width: "100%" }}
        >
          Something went wrong
        </Alert>
      </Snackbar>

      <div className="py-2 lg:py-1  relative" style={{ paddingTop: "20px" }}>
        <img
          src="https://cdn.tuk.dev/assets/templates/radian/Back_Image.png"
          className="h-2/5 lg:h-full w-full lg:w-1/2 absolute inset-0 object-cover object-center xl:block hidden"
          alt="map"
        />
        <div className="xl:mx-auto xl:container  relative ">
          <div
            className="flex flex-wrap xl:mx-auto xl:container"
            style={{ marginTop: "100px" }}
          >
            <div className="w-full relative lg:w-1/2 xl:mt-10 mb-10 2xl:pr-24 2xl:pl-0 xl:pl-12 pl-0 ">
              <img
                src="https://cdn.tuk.dev/assets/templates/radian/Back_Image.png"
                className="h-full w-full xl:w-1/2 absolute inset-0 bg-cover bg-center xl:hidden"
                alt="map"
              />
              <div className="w-full flex flex-col items-start  xl:justify-start  relative z-20 xl:px-0 px-4 xl:py-0 py-4">
                <div className="w-full 2xl:pl-48 xl:pt-1">
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider text-gray-800">
                    We’re Here
                  </h1>
                  <div className="w-full md:w-10/12 mt-3">
                    <h2 className="text-gray-800 text-base md:text-lg leading-8 tracking-wider">
                      We believe digital innovation is at the heart of every
                      business success
                    </h2>
                    <div className="mt-4 md:mt-8">
                      <h2 className="text-sm md:text-base text-indigo-700 font-semibold">
                        Address
                      </h2>
                      <h2 className="text-gray-800 text-base md:text-lg leading-8 tracking-wider mt-2">
                        Room 333 , 3rd floor , 3rd block , MAIT delhi
                      </h2>
                    </div>
                    <div className="mt-4 md:mt-8">
                      <h2 className="text-sm md:text-base text-indigo-700 font-semibold">
                        Email
                      </h2>
                      <h2 className="text-gray-800 text-base md:text-lg leading-8 tracking-wider mt-2">
                        contact.technomaits@gmail.com
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2   xl:pt-10 lg:pl-24">
              <div className="flex flex-col items-start xl:justify-start 2xl:justify-end xl:px-0 px-4">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-wider text-indigo-700">
                  Let’s Talk
                </h1>
                <div className="w-full 2xl:w-8/12 mt-3">
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-gray-800 text-base md:text-lg leading-8 tracking-wider">
                      For enquiries, please email us using the form below
                    </h2>
                    <div className="mt-4 md:mt-8">
                      <p className="text-gray-800 text-base font-medium">
                        Name
                      </p>
                      <input
                        value={values.name}
                        onChange={handleChange("name")}
                        className="mt-3 text-base border-2 w-11/12 lg:w-full xl:w-10/12 hover:border-indigo-600 focus:border-indigo-600 focus:outline-none border-black py-5 pl-4 text-gray-800"
                        type="text"
                        placeholder="Justin Timberlake"
                      />
                    </div>
                    <div className="mt-4 md:mt-8">
                      <p className="text-gray-800 text-base font-medium">
                        Email Address
                      </p>
                      <input
                        value={values.email}
                        onChange={handleChange("email")}
                        className="mt-3 text-base border-2 w-11/12 lg:w-full xl:w-10/12 hover:border-indigo-600 focus:border-indigo-600 focus:outline-none border-black py-5 pl-4 text-gray-800"
                        type="email"
                        placeholder="example@mail.com"
                      />
                    </div>
                    <div className="mt-4 md:mt-8">
                      <p className="text-gray-800 text-base font-medium">
                        Message
                      </p>
                      <textarea
                        value={values.message}
                        onChange={handleChange("message")}
                        className="mt-3 text-base border-2 w-11/12 lg:w-full xl:w-10/12 resize-none hover:border-indigo-600 focus:border-indigo-600 focus:outline-none border-black xl:h-40 py-5 pl-4 text-gray-800"
                        type="text"
                        placeholder="Write us something..."
                        defaultValue={""}
                      />
                    </div>
                    <div className="py-5">
                      <button className="py-3 md:py-5 px-5 md:px-10 bg-gray-900 text-white hover:opacity-90 ease-in duration-150 text-sm md:text-lg tracking-wider font-semibold">
                        Send
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
