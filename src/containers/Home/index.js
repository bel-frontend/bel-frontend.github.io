import React from "react";
import { Avatar, Contacts, AboutMe } from "../../components";

import "./style.css";

const getUserData = async ({ saveUserDataCallback } = {}) => {
  const data = await fetch("https://randomuser.me/api/", {
    method: "GET",
  });
  const userData = await data.json();
  if (typeof saveUserDataCallback === "function") {
    saveUserDataCallback(userData);
  }
};

export const Home = () => {
  const [userDataState, setUserData] = React.useState();

  React.useEffect(() => {
    getUserData({ saveUserDataCallback: setUserData });
  }, []);

  const user = userDataState?.results[0];
  console.log(user);

  return (
    <>
      <section className="layout">
        <div className="sidebar">
          <Avatar src={user?.picture?.large} />
          <button
            onClick={() => getUserData({ saveUserDataCallback: setUserData })}
          >
            click me!
          </button>
          <Contacts phone={user?.cell} location={user?.location} />
          <AboutMe />
        </div>
        <div className="body">
          <h1 className="user_name"></h1>
          <h2>Frontend developer</h2>
          <div className="experience"></div>
        </div>
      </section>
    </>
  );
};
