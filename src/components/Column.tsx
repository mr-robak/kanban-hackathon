import React, { useState, MouseEvent, FormEvent, useContext } from "react";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
//experiment
import BoardContext from "../state/BoardContext";
import { IconButton, Menu, MenuItem, Tooltip } from "@material-ui/core";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";

const useStyles = makeStyles((theme: any) => ({
  paper: {
    minHeight: 530,
    width: 250,
    margin: "20px",
    display: "flex",
    flexDirection: "column",
    // variant: "elevated5",
    // square: "false",
    // elevation={3}
  },
}));

interface Task {
  id: string;
  title: string;
  description: string;
}

interface iColumn {
  id: string;
  title: string;
  taskIds: string[];
}

// make interface
interface PropItem {
  column: iColumn;
  tasks: Task[];
  index: number;
}

export default function Column(props: PropItem) {
  const { dispatch } = useContext(BoardContext);
  const classes = useStyles();
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState(props.column.title);

  // Menu button handlers start
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNewTask = () => {
    handleClose();
    dispatch({ type: "addTask", payload: props.column.id });
  };

  // Menu button handlers end

  function setToEdit(event: MouseEvent) {
    event.preventDefault();
    setEditTitle(true);
  }

  function setToNotEdit(event: FormEvent) {
    event.preventDefault();
    setEditTitle(false);
  }

  //experiment with delele

  function deleteTheColumn(event: MouseEvent) {
    event.preventDefault();
    dispatch({ type: "deleteColumn", payload: props.column.id });
  }

  return (
    <Grid container>
      <Grid item>
        <Grid
          container
          justify="center"
          // style={{ backgroundImage: `url(${BackgroundTile})` }}
        >
          <Grid>
            <Draggable draggableId={props.column.id} index={props.index}>
              {(provided) => {
                return (
                  <Paper
                    elevation={8}
                    className={classes.paper}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                  >
                    <Grid container style={{ backgroundColor: "lightgrey" }}>
                      <Grid item xs={10}>
                        {editTitle ? (
                          <form onSubmit={setToNotEdit}>
                            <TextField
                              style={{
                                textAlign: "center",
                                fontSize: "1.4em",
                                padding: "8px",
                              }}
                              id="standard-basic"
                              value={title}
                              onChange={(event) => setTitle(event.target.value)}
                            />
                          </form>
                        ) : (
                          <Tooltip title="Drag to Move. Click to edit title. Enter to save.">
                            <header
                              style={{
                                textAlign: "center",
                                fontSize: "1.4em",
                                padding: "8px",
                              }}
                              onClick={setToEdit}
                              {...provided.dragHandleProps}
                            >
                              {title}
                            </header>
                          </Tooltip>
                        )}
                      </Grid>
                      <Grid item xs={2}>
                        {/* Menu button start*/}
                        <div>
                          <Tooltip title="Manage column">
                            <IconButton
                              aria-label="more"
                              aria-controls="long-menu"
                              aria-haspopup="true"
                              onClick={handleClick}
                            >
                              <MoreHorizOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            <MenuItem onClick={handleNewTask}>
                              New task
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                              Clear all tasks
                            </MenuItem>
                            <MenuItem onClick={deleteTheColumn}>
                              Delete column
                            </MenuItem>
                          </Menu>
                        </div>
                        {/* Menu button end */}
                      </Grid>
                    </Grid>

                    <Droppable droppableId={props.column.id} type="task">
                      {(provided, snapshot) => {
                        const isDraggingOver = snapshot.isDraggingOver;
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              flexGrow: 1,
                              minHeight: "100px",
                              backgroundColor: isDraggingOver
                                ? "#c6f7d1"
                                : "#f0f0f0",
                            }}
                          >
                            {props.tasks.map((task: Task, index: number) => {
                              return (
                                <Task key={task.id} task={task} index={index} />
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </Paper>
                );
              }}
            </Draggable>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
