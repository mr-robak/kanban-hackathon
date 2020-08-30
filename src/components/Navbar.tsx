import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { NavLink, Link } from "react-router-dom";

import "./Navbar.css";
import { Button } from "@material-ui/core";

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
      <AppBar position="static">
        <Toolbar>
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

          <Button variant="contained" color="secondary">
            <Link
              to="/board"
              style={{ textDecoration: "none", color: "white" }}
            >
              Try it now!
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
