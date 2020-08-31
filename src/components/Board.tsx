import React, { useContext, useState, MouseEvent } from "react";
import BoardContext from "../state/BoardContext";
import Column from "./Column";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import BackgroundTile from "../assets/hip-square.png";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import Add from "@material-ui/icons/Add";
import Panorama from "@material-ui/icons/Panorama";
import RotateLeft from "@material-ui/icons/RotateLeft";
import EditIcon from "@material-ui/icons/Edit";
import DialogUpload from "./DialogUpload";

// import AddIcon from "@material-ui/icons/Add";
// import Fab from "@material-ui/core/Fab";
// // import DeleteIcon from '@material-ui/icons/Delete';
// // import IconButton from '@material-ui/core/IconButton';
// import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme: any) => ({
  root: {
    position: "relative",
    minHeight: "100vh",
    display: "inline-flex",
    // justifyContent: "center",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "row",
    marginLeft: 20,
    overflowX: "auto",
    overflowY: "hidden",
    backgroundImage: `url(${BackgroundTile})`,
    backgroundRepeat: "repeat",
    // msOverflowStyle: "none",
    // scrollbarWidth: "none",
  },
  button: {
    height: "60px",
    minWidth: "80px",
    alignSelf: "center",
  },
  fab: {
    position: "absolute",
    top: 70,
    right: 0,
    margin: "15px",
    // width: "200px",
  },
  speedDial: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function Board() {
  const classes = useStyles();
  const { state, dispatch } = useContext(BoardContext);

  function addNewColumn(event: MouseEvent) {
    event.preventDefault();
    dispatch({ type: "addColumn" });
  }

  //need to update type
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
      finish !== undefined &&
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

  /* --------------------------------------- */
  /* LOGIC FOR ADDING/REMOVING IMAGES        */
  /* --------------------------------------- */
  const bgImg = "bg-img";
  const [showForm, setShowForm] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleOpenForm = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleFileSubmit = (event: any) => {
    handleCloseForm();
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      //console.log(event.target.files[0]);
      //console.log(event.target.files[0].name.replace(/(.jpeg|.png|.jpg)/g, ""));

      //src to pass to props
      const srcImg = `data:${event.target.files[0].type};base64,`;
      //save source in localStorage
      localStorage.setItem(bgImg, srcImg);

      const handleFileRead = (event: ProgressEvent<FileReader>) => {
        const imgData: any = reader.result;

        localStorage[bgImg] += btoa(imgData);
        setRefresh(!refresh);
      };

      reader.onloadend = handleFileRead;
      reader.readAsBinaryString(event.target.files[0]);
    }
  };
  /* --------------------------------------- */
  /* --------------------------------------- */
  /* --------------------------------------- */

  /* ----------------------------- */
  /* Speed dial handlers, state... */
  /* ----------------------------- */
  // const [open, setOpen] = useState<boolean>(true);

  // // const handleOpen = () => {
  // //   setOpen(true);
  // // };

  // // const handleClose = () => {
  // //   setOpen(false);
  // // };

  const actions = [
    { icon: <Add />, name: "Add column", handler: addNewColumn },
    {
      icon: <Panorama />,
      name: "Customize background",
      handler: handleOpenForm,
    },
    {
      icon: <RotateLeft />,
      name: "Reset board",
      handler: async () => {
        await localStorage.clear();
        dispatch({ type: "reset", payload: "" });
      },
    },
  ];
  /* ----------------------------- */
  /* ----------------------------- */
  /* ----------------------------- */

  //determine which background image to use
  const bgImage = localStorage[bgImg]
    ? `url(${localStorage[bgImg]})`
    : `url(${BackgroundTile})`;

  return (
    <div>
      <div>
        <SpeedDial
          ariaLabel="Board actions"
          className={classes.speedDial}
          icon={<SpeedDialIcon openIcon={<EditIcon />} />}
          open={true}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.handler}
            />
          ))}
        </SpeedDial>
      </div>
      <div style={{ backgroundImage: `${bgImage}` }}>
        <DialogUpload
          showForm={showForm}
          handleCloseForm={handleCloseForm}
          handleFileSubmit={handleFileSubmit}
          message={"Choose a background picture for your board"}
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className={classes.root}
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{ backgroundImage: `${bgImage}` }}
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
        {/* <Tooltip title="Add a column" aria-label="add">
<Fab color="primary" className={classes.fab} onClick={addNewColumn}>
<AddIcon />
</Fab>
</Tooltip> */}
      </div>
    </div>
  );
}
