import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

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

  return (
    <>
      <Grid className="layout" container spacing={3}>
        <Grid className="sidebar" item md={3} xs={6}>
          <Avatar src={user?.picture?.large} size="small" />
          <Button
            variant="contained"
            onClick={() => getUserData({ saveUserDataCallback: setUserData })}
          >
            click me!
          </Button>
          <Contacts phone={user?.cell} location={user?.location} />
          <AboutMe />
        </Grid>
        <Grid item md={9} xs={6}>
          <Typography variant="h1">Test name </Typography>
          <Typography variant="h2">Frontend developer</Typography>
        </Grid>
      </Grid>
    </>
  );
};
