import React, { useEffect, useState } from "react";

const MyContext = React.createContext([{}, () => {}]);

function UserContext(props) {
  async function loadUserData(email) {
    let data = await fetch(`https://campus-kart-api.ml/get/user/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: ` Bearer ${email}`,
      },
    });

    let finalData = await data.json();
    console.log("useContext", finalData);
    SetUserData(finalData);
  }
  useEffect(() => {
    let email = localStorage.getItem("email");
    if (email) {
      loadUserData(email);
    }
  }, []);

  const [user, SetUser] = useState({ data: null });

  const SetUserData = (data) => {
    SetUser({ data: data });
  };
  return (
    <MyContext.Provider value={[user, SetUserData]}>
      {props.children}
    </MyContext.Provider>
  );
}

export { UserContext, MyContext };
