import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography, Button, Paper, Divider } from "@material-ui/core";
import scrum_board from "../assets/undraw_Scrum_board_re_wk7v.svg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.primary,
    },
    button: {
      backgroundColor: "#fffde7",
    },
  })
);

export default function LandingPage() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid
          item
          xs={7}
          spacing={1}
          direction="column"
          justify="space-evenly"
          alignItems="stretch"
        >
          <Grid item>
            <Typography variant="h2">
              Kanban board helps you to keep tabs on your project progress.
            </Typography>
          </Grid>
          <Divider />
          <Grid item>
            <Typography variant="h5">
              Create your board, add columns and cards to organize and
              prioritize your tasks in the projects! In just few clicks!
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary">
              <Link
                to="/board"
                style={{ textDecoration: "none", color: "white" }}
              >
                Try it now!
              </Link>
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <img src={scrum_board} alt="scrum board" />
        </Grid>
        <Grid item xs={4}>
          <Paper></Paper>
        </Grid>
      </Grid>
    </div>
  );
}
