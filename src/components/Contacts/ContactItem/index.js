import React from "react";
import { Box } from "@mui/material";
import CardHeader from "@mui/material/CardHeader";
import { makeStyles } from "@mui/styles";

import { Avatar } from "../../Avatar";

const useStyles = makeStyles({
  container: {
    padding: "6px 0 !important",
  },
});

export const ContactItem = ({ title, value, icon }) => {
  const classes = useStyles();
  return (
    <Box>
      <CardHeader
        className={classes.container}
        avatar={<Avatar style={{ height: 32, width: 32 }}></Avatar>}
        title={title}
        subheader={value}
      />
    </Box>
  );
};
