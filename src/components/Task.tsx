import React, { useState, useContext } from "react";
import BoardContext from "../state/BoardContext";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";

import { Draggable } from "react-beautiful-dnd";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
import { Tooltip, Zoom } from "@material-ui/core";

import { SingleTask } from "../models/index";
import DialogUpload from "./DialogUpload";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  // return <Slide direction="up" ref={ref} {...props} />;
  return <Zoom ref={ref} {...props} />;
});

interface Column {
  [key: string]: {
    id: string;
    title: string;
    description: string;
  };
}

interface PropsItem {
  index: number;
  task: SingleTask;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "90%",
    // textAlign: "center",
    // padding: "0.2em",
    margin: "8px auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    margin: "5%",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  button: {
    margin: theme.spacing(1),
  },
  dropdown: {
    scale: "50%",
  },
  title: {
    textAlign: "center",
    fontSize: "2em",
  },
  movebutton: {
    cursor: "pointer",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#d3d3d3",
      color: "black",
      padding: "5px",
    },
  },
}));

export default function Task(props: PropsItem) {
  const imgId = `img-${props.task.id.slice(-1)}`;
  const altText = `${imgId}-alt`;
  // Right-click context menu code below:
  // some event handlers might be redundant since
  // they can be shared with other expandable menu popup (...)

  const initialState = {
    mouseX: null,
    mouseY: null,
  };

  const [coordinateState, setCoordinateState] = React.useState<{
    mouseX: null | number;
    mouseY: null | number;
  }>(initialState);

  /* --------------------------------------- */
  /* LOGIC FOR ADDING/REMOVING IMAGES        */
  /* --------------------------------------- */
  const [showForm, setShowForm] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const handleOpenForm = () => {
    handleCloseContextMenu();
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    //for move as well
    setShowMoveForm(false);
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
      localStorage.setItem(imgId, srcImg);
      //alt text for image (stripped file name)
      localStorage.setItem(
        altText,
        event.target.files[0].name.replace(/(.jpeg|.png|.jpg)/g, "")
      );

      const handleFileRead = (event: ProgressEvent<FileReader>) => {
        const imgData: any = reader.result;

        localStorage[imgId] += btoa(imgData);
        dispatch({
          type: "addImgToTask",
          payload: { taskId: props.task.id, imgId },
        });
        setRefresh(!refresh);
      };

      reader.onloadend = handleFileRead;
      reader.readAsBinaryString(event.target.files[0]);
    }
  };

  const handleDeleteImg = () => {
    handleCloseContextMenu();
    localStorage.removeItem(imgId);
    localStorage.removeItem(altText);
    setRefresh(!refresh);
  };
  /* --------------------------------------- */
  /* ABOVE LOGIC FOR ADDING/REMOVING IMAGES  */
  /* --------------------------------------- */

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setCoordinateState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleCloseContextMenu = () => {
    setCoordinateState(initialState);
  };

  // Right-click context menu code above
  // -----------------------------------

  const {
    task: { id, title, description },
    index,
  } = props;
  const { state, dispatch } = useContext(BoardContext);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  //handlers for menu
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    handleClose();
    dispatch({ type: "deleteTask", payload: id });
  };

  //handlers for expand
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  //for move modal
  const [showMoveForm, setShowMoveForm] = useState<boolean>(false);

  //current info
  let columnTitles: Column[] = [];
  let startColumn: string = "";
  for (let column in state.columns) {
    if (state.columns[column].taskIds.includes(id)) {
      startColumn = column;
    }
  }

  for (let column in state.columns) {
    if (column !== startColumn) {
      columnTitles.push(state.columns[column]);
    }
  }

  const handleMoveCard = () => {
    setShowMoveForm(true);
  };

  const moveCards = (column: Column) => {
    dispatch({
      type: "moveCard",
      payload: { column, id, startColumn },
    });
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => {
        const isDragging = snapshot.isDragging;
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {/* div below is wrapper for right click menu*/}
            <div
              onContextMenu={handleRightClick}
              style={{ cursor: "context-menu" }}
            >
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleCloseContextMenu}>Edit task</MenuItem>
                {localStorage[imgId] ? (
                  <MenuItem onClick={handleDeleteImg}>Delete image</MenuItem>
                ) : (
                  <MenuItem onClick={handleOpenForm}>Add image</MenuItem>
                )}
                <MenuItem onClick={handleMoveCard}>Move task</MenuItem>
                <MenuItem onClick={handleDelete}>Delete task</MenuItem>
              </Menu>

              <Card
                className={classes.root}
                elevation={2}
                style={{
                  background: isDragging ? "#f5e36c" : "#f5eebf",
                }}
              >
                <CardHeader
                  action={
                    <Tooltip title="Manage task">
                      <IconButton aria-label="settings" onClick={handleClick}>
                        <MoreHorizOutlinedIcon />
                      </IconButton>
                    </Tooltip>
                  }
                  title={title}
                />
                {localStorage[imgId] ? (
                  <CardMedia
                    className={classes.media}
                    image={localStorage[imgId]}
                    title={localStorage[altText]}
                  />
                ) : null}

                <CardActions>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>{description}</Typography>
                  </CardContent>
                </Collapse>
              </Card>

              <DialogUpload
                showForm={showForm}
                handleCloseForm={handleCloseForm}
                handleFileSubmit={handleFileSubmit}
              ></DialogUpload>

              {/* below is dialog form for moving cards */}
              <Dialog
                open={showMoveForm}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseForm}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogContent>
                  {columnTitles.map((column, index) => {
                    return (
                      <DialogContentText
                        key={index}
                        onClick={() => moveCards(column)}
                        className={classes.movebutton}
                      >
                        {column.title}
                      </DialogContentText>
                    );
                  })}
                </DialogContent>
              </Dialog>
              {/*  below is right click menu*/}
              <Menu
                keepMounted
                open={coordinateState.mouseY !== null}
                onClose={handleCloseContextMenu}
                anchorReference="anchorPosition"
                anchorPosition={
                  coordinateState.mouseY !== null &&
                  coordinateState.mouseX !== null
                    ? {
                        top: coordinateState.mouseY,
                        left: coordinateState.mouseX,
                      }
                    : undefined
                }
              >
                <MenuItem onClick={handleCloseContextMenu}>Edit</MenuItem>
                <MenuItem onClick={handleMoveCard}>Move</MenuItem>
                {localStorage[imgId] ? (
                  <MenuItem onClick={handleDeleteImg}>Delete image</MenuItem>
                ) : (
                  <MenuItem onClick={handleOpenForm}>Add image</MenuItem>
                )}
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}
