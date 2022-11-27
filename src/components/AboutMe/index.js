import React from "react";
import style from "./style.module.css";
import { useTranslation } from "react-i18next";

export const AboutMe = () => {
  const { t } = useTranslation();
  return (
    <div className={style.container}>
      <p>{t("about_me.title")}</p>
      {t("about_me.text")}
    </div>
  );
};
