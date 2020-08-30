import React from "react";
import { Link } from "react-router-dom";

// import Box from "@material-ui/core/Box";

import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Typography, Button, Divider } from "@material-ui/core";
import LinkedInCard from "../components/LinkedInCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //   flexGrow: 1,

      spacing: 1,

      marginTop: "1em",
      justify: "space-evenly",
      alignItems: "center",
    },
    descr: {
      marginTop: "5%",
      margin: "1em",
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
    text: { textAlign: "center" },
  })
);

const developers = [
  {
    name: "Nadine Grant",
    img: "NG",
    url: "nadine-g-b7158519a",
  },
  {
    name: "Marcin Robak",
    img: "MR",
    url: "mr-robak",
  },
  {
    name: "Max Ziegler",
    img: "MZ",
    url: "max-z-389a44198",
  },
];

export default function LandingPage() {
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.root}>
        <Grid item xs={6} className={classes.text}>
          <Typography variant="h6">
            The only board you will ever need to help you keep your tabs on the
            project! Create your board, add columns and cards to organize and
            prioritize your tasks in the projects! In just few clicks!
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
        <Grid item xs={6}>
          <img
            src={require("../assets/developer.svg")}
            alt="Developer with Laptop"
            style={{ width: "100%" }}
          />
        </Grid>
        <Divider />
        <Grid item xs={6}>
          <img
            src={require("../assets/olympics.jpeg")}
            style={{
              width: "100%",
              height: "auto",
            }}
            alt="Mintbean's Javascript Bootcamp Olympics"
          />
        </Grid>{" "}
        <Grid item xs={6}>
          <Typography variant="h5" className={classes.title}>
            The project was build from scratch by a team of ultra talented
            developers, over the course of just one weekend as a part of
            Mintbean's Javascript Bootcamp Olympics!
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.text}>
          <Typography variant="h5" className={classes.title}>
            Act now and hire these young guns before someone else sends them an
            offer!
          </Typography>
        </Grid>
        <Grid container xs={6}>
          {developers.map((dev, idx) => {
            const { name, img, url } = dev;
            return (
              <Grid item justify="center" alignItems="flex-start" xs={4}>
                <LinkedInCard key={idx} name={name} img={img} url={url} />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}
