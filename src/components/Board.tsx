import React from "react";
import Column from "./Column";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: "50px",
  },
}));

export default function Board() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Column />
      <Column />
      <Column />
    </div>
  );
}
