import React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import { Avatar, Contacts, AboutMe } from "../../components";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import style from "./style.module.css";

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
  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    getUserData({ saveUserDataCallback: setUserData });
  }, []);

  const user = userDataState?.results[0];

  return (
    <>
      <Grid className="layout" container spacing={3}>
        <Grid className={style.sidebar} item md={4} xs={6}>
          <Avatar src={user?.picture?.large} size="small" />
          <Contacts t={t} />
          <AboutMe />
        </Grid>
        <Grid item md={8} xs={6}>
          <Typography variant="h1">Test name </Typography>
          <Typography variant="h2">Frontend developer</Typography>
          <Typography variant="body2">{t("welcom")}</Typography>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            onChange={(ev, value) => {
              i18n.changeLanguage(ev.target.value);
            }}
          >
            <MenuItem value={"en"}>English</MenuItem>
            <MenuItem value={"by"}>Беларуская</MenuItem>
          </Select>
          <Button
            variant="contained"
            onClick={() => getUserData({ saveUserDataCallback: setUserData })}
          >
            {t("home_page.button", "CLICK ME")}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
