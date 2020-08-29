import React, { useState, MouseEvent, FormEvent } from "react";
import Item from "./Item";
import { Droppable } from "react-beautiful-dnd";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

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

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid>
            <Paper className={classes.paper}>
              {editTitle ? (
                <form onSubmit={setToNotEdit}>
                  <TextField
                    id="standard-basic"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </form>
              ) : (
                <header onClick={setToEdit}>{title}</header>
              )}
              <Droppable droppableId={props.column.id}>
                {(provided) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{ flexGrow: 1, minHeight: "100px" }}
                    >
                      {props.tasks.map((task: Task, index: number) => {
                        return <Item key={task.id} task={task} index={index} />;
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
