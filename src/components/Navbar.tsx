import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { NavLink, Link } from "react-router-dom";

import "./Navbar.css";
import { Button, SvgIcon } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
);

export default function Navbar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{ height: 70, backgroundColor: "#0a82f2" }}
      >
        <Toolbar>
          {" "}
          <Link to="/board" style={{ textDecoration: "none", color: "white" }}>
            <SvgIcon style={{ fontSize: 40, margin: 10 }}>
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </SvgIcon>
          </Link>
          <NavLink
            exact
            to="/"
            className={classes.title}
            style={{
              textDecoration: "none",
              color: "white",
              fontSize: "2em",
              textAlign: "left",
            }}
          >
            THE TRUE KANBAN BOARD
          </NavLink>
          <Button
            variant="contained"
            color="secondary"
            style={{
              backgroundColor: "#1aab28",
              color: "black",
              textDecoration: "red",
              textDecorationColor: "black",
            }}
          >
            <Link
              to="/board"
              style={{ textDecoration: "none", color: "white" }}
            >
              Open your board
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
