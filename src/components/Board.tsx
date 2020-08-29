import React, { useState, useContext } from "react";
import Column from "./Column";
import BoardContext from "../state/BoardContext";

// import Button from "@material-ui/core/Button";
import { DragDropContext } from "react-beautiful-dnd";

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
  const { state, dispatch } = useContext(BoardContext);
  const [istate, setState] = useState(state);

  //need to update
  function onDragEnd(result: any) {
    const { destination, source, draggableId } = result;

    //no destination - no actions necessary and exit
    if (!destination) {
      return;
    }

    //if these are true the user dropped the card back in the original position
    if (
      destination.droppable === source.droppable &&
      destination.index === source.index
    ) {
      return;
    }

    //reorder task-id array
    const start = istate.columns[source.droppableId];
    const finish = istate.columns[destination.droppableId];

    //if moving in same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      //remove the item
      newTaskIds.splice(source.index, 1);
      //insert nothing and insert new idea
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = { ...start, taskIds: newTaskIds };

      //update state
      const newState = {
        ...state,
        columns: { ...state.columns, [newColumn.id]: newColumn },
      };
      setState(newState);
      dispatch(newState);
      return;
    }

    //if moving in another column
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
    dispatch(newState);
    return;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={classes.root}>
        {state.columnOrder.map((columnId: any) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map(
            (taskId: any) => state.tasks[taskId]
          );
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </div>
    </DragDropContext>
  );
}
