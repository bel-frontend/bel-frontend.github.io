import React from "react";
import style from "./style.module.css";

export const Contacts = ({ phone, location }) => {
  return (
    <div className={style.container}>
      <p>Contacts</p>
      <ul>
        <li>Тэлефон:{phone}</li>
      </ul>
    </div>
  );
};
