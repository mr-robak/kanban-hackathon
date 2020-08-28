import React, { useState, MouseEvent, FormEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme: any) => ({
  paper: {
    height: 500,
    width: 250,
    margin: 20,
  },
}));

export default function Column() {
  const classes = useStyles();
  const [editTitle, setEditTitle] = useState(false);
  const [title, setTitle] = useState("Title");

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
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
