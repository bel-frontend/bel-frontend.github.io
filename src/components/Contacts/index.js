import React from "react";
import style from "./style.module.css";
import { ContactItem } from "./ContactItem";

import contacts from "./contacts.json";

export const Contacts = ({ t }) => {
  return (
    <div className={style.container}>
      {contacts.map((i) => {
        return (
          <ContactItem
            title={t(`contacts.${i.title}`, i.title)}
            value={t(`contacts.${i.title}_value`, i.value)}
          />
        );
      })}
    </div>
  );
};
