import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "80%",
  }
})

export default function Item() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Typography variant="h5">Card Title</Typography>
      <CardContent>Lorem ipsum</CardContent>
    </Card>
  );
}
