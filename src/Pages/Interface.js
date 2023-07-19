import React, { useState } from "react";
import LoginModal from "../Components/LoginModal";
function Interface() {
  const [show, setShow] = useState(false);
  return (
    <div className="pb-12 overflow-y-hidden" style={{ minHeight: 700 }}>
      {/* Code block starts */}
      <dh-component>
        <nav>
          <div className="py-5 md:py-0 container mx-auto px-6 flex items-center justify-between">
            <div aria-label="Home. logo" role="img">
              <img
                style={{ width: "250px" }}
                className="w-12 md:w-auto"
                src="Campus_Kart_Logo-trans.png"
                alt="logo"
              />
            </div>

            <LoginModal />
          </div>
        </nav>
        <div>
          <img
            style={{ width: "650px", height: "500px", marginLeft: "400px" }}
            src="illus-1.png"
            alt=""
          />
        </div>
      </dh-component>
      {/* Code block ends */}
    </div>
  );
}

export default Interface;
