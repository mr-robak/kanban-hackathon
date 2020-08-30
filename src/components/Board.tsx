import React, { useContext } from "react";
import BoardContext from "../state/BoardContext";
import Column from "./Column";
// import Button from "@material-ui/core/Button";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
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
  const { state, dispatch } = useContext(BoardContext);

  //need to update
  function onDragEnd(result: any) {
    const { destination, source, draggableId, type } = result;

    //no destination - no actions necessary and exit
    if (!destination) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    //if these are true the user dropped the card back in the original position
    //check that it's not the same position in a different column
    if (
      destination.droppable === source.droppable &&
      destination.index === source.index &&
      start.id === finish.id
    ) {
      return;
    }

    //if type is a column then a column is being moved
    if (type === "column") {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      dispatch({ type: "moveColumns", payload: newState });
      return;
    }

    //reorder task-id array
    //if a task is moving in same column (moving a card)
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
      dispatch({ type: "moveTasks", payload: newState });
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
    dispatch({ type: "moveTasks", payload: newState });
    return;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            className={classes.root}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {state.columnOrder.map((columnId: string, index: number) => {
              const column = state.columns[columnId];
              const tasks = column.taskIds.map(
                (taskId: string) => state.tasks[taskId]
              );
              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
