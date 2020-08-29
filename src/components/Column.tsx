import React, { useState, MouseEvent, FormEvent, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: any) => ({
  paper: {
    height: 500,
    width: 250,
    margin: 20,
  },
}));

export default function Column(props: any) {
  const classes = useStyles();
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState("Title");

  useEffect(() => {
    if (props.cardNumber === 0) {
      setTitle("To Do");
    } else if (props.cardNumber === 1) {
      setTitle("In Progress");
    } else if (props.cardNumber === 2) {
      setTitle("Done");
    }
  }, []);

  function setToEdit(event: MouseEvent) {
    event.preventDefault();
    setEditTitle(true);
  }

  function setToNotEdit(event: FormEvent) {
    event.preventDefault();
    setEditTitle(false);
  }

  function deleteColumn(event: MouseEvent) {
    event.preventDefault();
    props.removeColumn(props.cardNumber);
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
              <Button onClick={deleteColumn}>Delete</Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
