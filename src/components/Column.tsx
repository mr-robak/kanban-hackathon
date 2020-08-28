import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container justify="center">
          <Grid>
            <Paper className={classes.paper} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
