import React from "react";
import style from "./style.module.css";
import AvatarMUI from "@mui/material/Avatar";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({}));

export const Avatar = ({ src, size, style = {}, children }) => {
  const sizeAvatar = size === "small" ? 120 : 240;
  return (
    <AvatarMUI
      sx={{ width: sizeAvatar, height: sizeAvatar, ...style }}
      src={src}
    >
      {children}
    </AvatarMUI>
  );
};
