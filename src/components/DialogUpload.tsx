import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { TransitionProps } from "@material-ui/core/transitions";
import { Zoom } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  // return <Slide direction="up" ref={ref} {...props} />;
  return <Zoom ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

interface propItems {
  showForm: boolean;
  handleCloseForm: () => void;
  handleFileSubmit: (event: any) => void;
  message: string;
}

export default function DialogUpload(props: propItems) {
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={props.showForm}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.handleCloseForm}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText>{props.message}</DialogContentText>
          <Button
            variant="contained"
            color="default"
            component="label"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <input
              type="file"
              accept="image/jpeg image/png image/jpg"
              id="file"
              style={{ display: "none" }}
              onChange={props.handleFileSubmit}
            />
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
