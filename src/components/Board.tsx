import React, { MouseEvent, useState } from "react";
import Column from "./Column";
import Button from "@material-ui/core/Button";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import initialState from "../state/BoardContext";

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
  // const [columnNumber, setColumnNumber] = useState(3);
  // const [columns, setColumns] = useState(
  //   Array.from(Array(columnNumber).keys())
  // );

  // function addColumn(event: MouseEvent) {
  //   event.preventDefault();
  //   setColumnNumber(columnNumber + 1);
  //   setColumns(Array.from(Array(columnNumber).keys()));
  // }

  // function removeColumn(id: number) {
  //   const filteredColumns = [...columns].filter((column) => column !== id);
  //   setColumnNumber(columnNumber - 1);
  //   setColumns(filteredColumns);
  // }

  return (
    <div className={classes.root}>
      {/* {columns.map((key: number) => {
        return (
          <Column key={key} cardNumber={key} removeColumn={removeColumn} />
        );
      })}
      <Button variant="outlined" className={classes.button} onClick={addColumn}>
        Add Column
      </Button> */}
    </div>
  );
}
