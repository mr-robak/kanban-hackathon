import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { Typography, Button, Grid, Card } from "@material-ui/core";

import Logo from "../assets/logo_linkedin.png";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: "flex-box",
      width: "180px",
      height: "310px",
      borderRadius: "17px",
      boxShadow: "0px 9px 16px -2px rgba(0,0,0,0.21)",
    },

    avatar: {
      margin: theme.spacing(-6),
      width: "100px",
      height: "100px",
      //   justifyContent: "center",
      border: "5px solid white",
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

export default function LinkedInCard(props: any) {
  const { name, img, url } = props;
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Grid container direction="column" justify="center" alignItems="center">
        <img src={require("../assets/bg.png")} alt="" />
        <Avatar
          src={require(`../assets/${img}.jpeg`)}
          alt={img}
          className={classes.avatar}
        />
        <Typography variant="h5" className={classes.text}>
          {name}
        </Typography>
        <Button variant="contained" color="primary" className={classes.button}>
          <a
            href={`https://www.linkedin.com/in/${url}/`}
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
