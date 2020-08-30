import React, { useState, MouseEvent, FormEvent, useContext } from "react";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
//experiment
import BoardContext from "../state/BoardContext";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";

const useStyles = makeStyles((theme: any) => ({
  paper: {
    minHeight: 500,
    width: 250,
    margin: 20,
    display: "flex",
    flexDirection: "column",
    // variant: "elevated5",
    // square: "true",
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
  const { dispatch } = useContext(BoardContext);

  function deleteTheColumn(event: MouseEvent) {
    event.preventDefault();
    dispatch({ type: "deleteColumn", payload: props.column.id });
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid>
            <Draggable draggableId={props.column.id} index={props.index}>
               {(provided) => (
                <Paper
                  elevation={4}
                  className={classes.paper}
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                >
                  <Grid container>
                    <Grid item xs={10}>
                      {editTitle ? (
                        <form onSubmit={setToNotEdit}>
                          <TextField
                            id="standard-basic"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                          />
                        </form>
                      ) : (
                        <header
                          onClick={setToEdit}
                          {...provided.dragHandleProps}
                        >
                          {title}
                        </header>
                      )}
                    </Grid>
                    <Grid item xs={2}>
                      {/* Menu button start*/}
                      <div>
                        <IconButton
                          aria-label="more"
                          aria-controls="long-menu"
                          aria-haspopup="true"
                          onClick={handleClick}
                        >
                          <MoreHorizOutlinedIcon />
                        </IconButton>
                        <Menu
                          id="simple-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleClose}
                        >
                          <MenuItem onClick={handleClose}>New task</MenuItem>
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
                                ? "#FFFFE0"
                                : "white",
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
