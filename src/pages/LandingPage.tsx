import React from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography, Button, Divider } from "@material-ui/core";
import { ReactComponent as ScrumBoard } from "../assets/Scrum_board.svg";
import LinkedInCard from "../components/LinkedInCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   flexGrow: 1,
      //   spacing: theme.spacing(0),
      spacing: 1,
      // direction: "column",
      //   alignItems: "top",
      //   minHeight: "100vh",
      marginTop: "1em",
      justify: "space-evenly",
      alignItems: "center",
    },
    descr: {
      marginTop: "5%",
    },
    illustration: {
      width: "100%",
      //   height: "25%",
    },
    title: {
      //   fontFamily: "Architects Daughter",
    },
    button: {
      backgroundColor: "#fffde7",
    },
    card: {
      direction: "rtl",
    },
    paper: { height: 250, width: 180 },
  })
);

export default function LandingPage() {
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Typography variant="h2" className={classes.title}>
            THE KANBAN BOARD
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5" className={classes.descr}>
            The only board you need to help you keep your tabs on the project!
          </Typography>

          <Divider />

          <Typography variant="h6">
            Create your board, add columns and cards to organize and prioritize
            your tasks in the projects! In just few clicks!
          </Typography>
          <Button variant="contained" color="primary">
            <Link
              to="/board"
              style={{ textDecoration: "none", color: "white" }}
            >
              Try it now!
            </Link>
          </Button>
        </Grid>
        <Grid item xs={4}>
          <ScrumBoard className={classes.illustration} />
        </Grid>
        <Divider />
        <Grid item justify="center" spacing={2} xs={12}>
          <LinkedInCard />
        </Grid>
      </Grid>
    </div>
  );
}
