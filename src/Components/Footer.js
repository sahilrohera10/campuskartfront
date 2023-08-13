import React from "react";

import { Link, useNavigate } from "react-router-dom";
import "./Footer.css";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon
} from "mdb-react-ui-kit";

import Wishlist from "./Wishlist";

const Footer = () => {
  return (
    <div>
      <MDBFooter
        bgColor="light"
        className="text-center text-lg-start text-muted"
        style={{ textDecoration: "none" }}
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div className="me-5 d-none d-lg-block">
            {/* <span>Get connected with us on social networks:</span> */}
          </div>
          <div>
            <a href="" className="me-4 text-reset">
              <MDBIcon style={{color:"red"}} rippleColor="dark" fab icon="facebook-f" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="twitter" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="google" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="instagram" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="linkedin" />
            </a>
            <a href="" className="me-4 text-reset">
              <MDBIcon fab icon="github" />
            </a>
          </div>
        </section>

        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol
                md="3"
                lg="4"
                xl="3"
                id="link_des"
                className="mx-auto mb-4"
              >
                {/* <h6 className="text-uppercase fw-bold mb-4">
                  <MDBIcon color="secondary" icon="gem" className="me-3" />
                  Campus Kart
                </h6> */}
                {/* <div>
                </div> */}
                <img src="Campus_Kart_Logo_no_bg.png" alt="" style={{height:"70px" , width:"200px"}} />
                <p>
                  CAMPUS KART is an innovative and student-centered platform
                  designed to provide convenience and ease to college students
                  in their everyday lives. 
                </p>
              </MDBCol>

              <MDBCol
                md="2"
                lg="2"
                xl="2"
                id="link_des"
                className="mx-auto mb-4"
              >
                <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                <p>
                  <a
                    href={`books`}
                    className="text-reset"
                    style={{ textDecoration: "none" }}
                  >
                    Books
                  </a>
                </p>
                <p>
                  <a href={`furniture`} className="text-reset">
                    Furniture
                  </a>
                </p>
                <p>
                  <a href={`electronics`} className="text-reset">
                    Electronics
                  </a>
                </p>
                <p>
                  <a href={`stationery`} className="text-reset">
                    Stationery
                  </a>
                </p>
              </MDBCol>

              <MDBCol
                md="3"
                lg="2"
                xl="2"
                id="link_des"
                className="mx-auto mb-4"
              >
                <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                <p>
                  <a href={`wishlist`} className="text-reset">
                    Wishlist
                  </a>
                </p>
                <p>
                  <a href={`profilePage`} className="text-reset">
                    Profile
                  </a>
                </p>
                <p>
                  <a href={`wishlist`} className="text-reset">
                    Orders
                  </a>
                </p>
                <p>
                  <a href={`profilePage`} className="text-reset">
                    Help
                  </a>
                </p>
              </MDBCol>

              <MDBCol
                md="4"
                lg="3"
                xl="3"
                className="mx-auto mb-md-0 mb-4"
                style={{
                  alignItems: "flex-start",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <MDBIcon color="secondary" icon="home" className="me-2" />
                  MAIT Sec-22, Rohini
                </p>
                <p>
                  <MDBIcon color="secondary" icon="envelope" className="me-3" />
                  Delhi-110085
                </p>
                <p>
                  <MDBIcon color="secondary" icon="phone" className="me-3" />
                  sahilrohera10@gmail.com
                </p>
                <p>
                  <MDBIcon color="secondary" icon="print" className="me-3" />{" "}
                  sahilaroraji2002@gmail.com
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          © 2021 Copyright: Developed By team{" "}
          <a href="https://technomaits.vercel.app/" target="_blank">
            Technomaits
          </a>{" "}
        </div>
      </MDBFooter>
    </div>
  );
};

export default Footer;