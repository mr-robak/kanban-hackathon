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
      // flexGrow: 1,
      maxWidth: "1600px",
      spacing: 1,

      margin: "1em auto",

      // justifyContent: "center",
      alignItems: "center",
    },
    descr: {
      marginTop: "5%",
      margin: "1em",
    },
    illustration: {
      width: "100%",
      // height: "25%",
    },
    title: {
      // fontFamily: "Architects Daughter",
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
    <Grid container className={classes.root} justify="center">
      <Grid
        item
        md={6}
        className={classes.text}
        style={{ textAlign: "right", padding: 30 }}
      >
        <Typography variant="h6" style={{ margin: 5 }}>
          The only board you will ever need to help you keep tabs on your
          project! Simply create your board, add columns and cards to organize
          your workflow, and prioritize your tasks! In just few clicks you are
          up and running! All this for free and available as an
          <strong>
            {" "}
            <a
              href="https://github.com/mr-robak/kanban-hackathon"
              target="blank"
              style={{ textDecoration: "none" }}
            >
              open source
            </a>
          </strong>
          .
        </Typography>
        <Typography variant="h6"></Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: 10, backgroundColor: "#1aab28" }}
        >
          <Link to="/board" style={{ textDecoration: "none", color: "white" }}>
            Try it now!
          </Link>
        </Button>
      </Grid>
      <Grid item md={6}>
        <img
          src={require("../assets/developer.svg")}
          alt="Developer with Laptop"
          style={{
            margin: "10px",
            width: "100%",
            height: "auto",
            borderRadius: 20,
          }}
        />
      </Grid>
      <Divider />
      <Grid item md={6}>
        <img
          src={require("../assets/olympics.jpeg")}
          style={{
            marginLeft: "10px",
            width: "100%",
            height: "auto",
            borderRadius: 20,
          }}
          alt="Mintbean's Javascript Bootcamp Olympics"
        />
      </Grid>{" "}
      <Grid item md={6} style={{ textAlign: "left", padding: 30 }}>
        <Typography variant="h6" className={classes.title}>
          The project was build from scratch by a team of ultra talented
          developers, over the course of just one weekend as a part of
          <a
            href="https://sites.google.com/mintbean.io/javascriptbootcampolympics/home"
            target="blank"
            style={{ textDecoration: "none" }}
          >
            {" "}
            <strong>Mintbean's</strong>
          </a>{" "}
          <strong>Javascript Bootcamp Olympics!</strong>
        </Typography>
      </Grid>
      <Grid item md={6} className={classes.text}>
        <Typography
          variant="h6"
          className={classes.title}
          style={{ textAlign: "right", padding: 20 }}
        >
          We are a group of passionate developers who enjoy a good challenge. We
          are all graduates of elite{" "}
          <a
            href="https://codaisseur.com/hire-developers/"
            target="blank"
            style={{ textDecoration: "none" }}
          >
            <strong>Codaisseur Academy</strong>
          </a>{" "}
          and come armed with the cutting edge technologies and skills. Every
          each one of us will be an invaluable addition to any Developer Team,
          and guess what?
        </Typography>
        <Typography
          variant="h5"
          className={classes.title}
          style={{ textAlign: "right", padding: 30 }}
        >
          <strong>We are available for hire!</strong>{" "}
        </Typography>
      </Grid>
      <Grid container md={6}>
        {developers.map((dev, idx) => {
          const { name, img, url } = dev;
          return (
            <Grid
              item
              sm={4}
              style={{
                // alignItems: "flex-start",
                justifyContent: "flex-start",
                padding: 30,
              }}
            >
              <LinkedInCard key={idx} name={name} img={img} url={url} />
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
}
