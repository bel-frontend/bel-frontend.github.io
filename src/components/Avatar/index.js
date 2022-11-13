import React from "react";
import style from "./style.module.css";

export const Avatar = ({ src }) => {
  return <img className={style.user_avatar} src={src} alt="Аватар" />;
};
