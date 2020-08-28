import React, { MouseEvent, useState } from "react";
import Column from "./Column";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: any) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    margin: 10,
    overflowX: "auto",
  },
  button: {
    height: "60px",
    minWidth: "80px",
    alignSelf: "center",
  },
}));

export default function Board() {
  const classes = useStyles();
  const [columnNumber, setColumnNumber] = useState(3);

  function addColumn(event: MouseEvent) {
    event.preventDefault();
    setColumnNumber(columnNumber + 1);
  }

  function removeColumn(id: number) {
    console.log(id);
  }

  return (
    <div className={classes.root}>
      {Array.from(Array(columnNumber).keys()).map((key: number) => {
        return (
          <Column key={key} cardNumber={key} removeColumn={removeColumn} />
        );
      })}
      <Button variant="outlined" className={classes.button} onClick={addColumn}>
        Add Column
      </Button>
    </div>
  );
}
