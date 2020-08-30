import React, { useState, MouseEvent, FormEvent, useContext } from "react";
import Task from "./Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
//experiment
import BoardContext from "../state/BoardContext";

const useStyles = makeStyles((theme: any) => ({
  paper: {
    height: 500,
    width: 250,
    margin: 20,
    display: "flex",
    flexDirection: "column",
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
                  className={classes.paper}
                  {...provided.draggableProps}
                  ref={provided.innerRef}
                >
                  {editTitle ? (
                    <form onSubmit={setToNotEdit}>
                      <TextField
                        id="standard-basic"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                      />
                    </form>
                  ) : (
                    <header onClick={setToEdit} {...provided.dragHandleProps}>
                      {title}
                    </header>
                  )}
                  <Droppable droppableId={props.column.id} type="task">
                    {(provided) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{ flexGrow: 1, minHeight: "100px" }}
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
                  <Button onClick={deleteTheColumn}>Delete</Button>
                </Paper>
              )}
            </Draggable>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
