import React, { useLayoutEffect, useState } from "react";
import { DotLoader } from "react-spinners";

export default function ForumPage() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  useLayoutEffect(() => {
    setIsLoading(true);
    fetch("https://campus-kart-api.ml/ShowAllRequest")
      .then((resp) => resp.json())
      .then((resp) => {
        console.log("resp =>", resp);
        setData(resp);
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <div className="forumLoader">
        <DotLoader
          color="#5ee727"
          size={50}
          speedMultiplier={1}
          loading={isLoading}
        />
      </div>
      <div
        style={{
          display: "flex",
          // margin: "20px",
          flexWrap: "wrap",
          // flexDirection: "column",
          marginLeft: "20px",
          paddingTop: "100px",
          paddingBottom: "250px",
        }}
      >
        {data &&
          data.map((forum) => (
            <div
              style={{
                width: "300px",
                // height: "90px",
                color: "black",
                background: "blue",
                backgroundImage: "radial-gradient(#78fff6 , #2678e0)",
                marginBottom: "20px",
                padding: "20px",
                borderRadius: "20px",
                margin: "20px",
              }}
            >
              <p>
                from <span> {forum.name} </span>{" "}
              </p>
              <p> {forum.request} </p>
            </div>
          ))}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
