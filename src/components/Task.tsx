import React, { useState, useContext } from "react";
import BoardContext from "../state/BoardContext";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
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
  task: {
    id: string;
    title: string;
    description: string;
  };
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
    // transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#d3d3d3",
      color: "black",
      padding: "5px",
    },
  },
}));

export default function Task(props: PropsItem) {
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
  //show dialog form for uploading image
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleOpenForm = () => {
    handleCloseContextMenu();
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    //for move as well
    setShowMoveForm(false);
  };
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

              {/* below is dialog form for adding images */}
              <Dialog
                open={showForm}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseForm}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogContent>
                  <DialogContentText>
                    Choose an image for your task
                  </DialogContentText>
                  <Button
                    variant="contained"
                    color="default"
                    component="label"
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload file
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleCloseForm}
                    />
                  </Button>
                </DialogContent>
              </Dialog>
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
                <MenuItem onClick={handleOpenForm}>Add image</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}
