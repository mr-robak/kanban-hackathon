import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import BG from "../assets/bg.png";
import { Typography, Button, Grid, Card } from "@material-ui/core";
import MR from "../assets/MR.jpeg";
import Logo from "../assets/logo_linkedin.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // box: {
    //   width: "160px",
    //   height: "190px",
    //   display: "flex-box",
    //   squared: false,

    //   "& > *": {
    //     margin: theme.spacing(0),
    //   },
    //   justifyContent: "center",
    // },

    card: {
      display: "flex-box",
      width: "180px",
      height: "300px",
      borderRadius: "17px",
      boxShadow: "0px 9px 16px -2px rgba(0,0,0,0.21)",
    },

    avatar: {
      margin: theme.spacing(-6),
      width: "100px",
      height: "100px",
      //   justifyContent: "center",
    },
    text: {
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(3),
    },

    button: {
      // marginTop: ,
      //   marginBottom: "15px",
      marginBottom: theme.spacing(2),
    },
    logo: {
      width: "80px",
    },
  })
);

export default function LinkedInCard() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Grid container direction="column" justify="center" alignItems="center">
        <img src={BG} alt="" />
        <Avatar src={MR} alt="Marcin Robak" className={classes.avatar} />
        <Typography variant="h5" className={classes.text}>
          Marcin Robak
        </Typography>
        <Button variant="contained" color="primary" className={classes.button}>
          <a
            href="//www.linkedin.com/in/mr-robak/"
            target="blank"
            style={{ textDecoration: "none", color: "white" }}
          >
            View profile
          </a>
        </Button>
        <img src={Logo} alt="" className={classes.logo} />
      </Grid>
    </Card>
  );
}
