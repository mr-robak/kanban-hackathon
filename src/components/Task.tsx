import React, { useState, useContext } from "react";
import BoardContext from "../state/BoardContext";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Collapse from "@material-ui/core/Collapse";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import { Draggable } from "react-beautiful-dnd";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface PropsItem {
  index: number;
  task: {
    id: string;
    title: string;
    description: string;
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function Task(props: PropsItem) {
  // Right-click context menu code below:
  // some event handlers might be redundant since
  // they can be shared with other expandable menu popup (...)

  const initialState = {
    mouseX: null,
    mouseY: null,
  };

  const [state, setState] = React.useState<{
    mouseX: null | number;
    mouseY: null | number;
  }>(initialState);

  /* --------------------------------------- */
  //show dialog form for uploading image
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleOpenForm = () => {
    handleCloseContextMenu();
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };
  /* --------------------------------------- */

  const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setState({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  const handleCloseContextMenu = () => {
    setState(initialState);
  };

  // Right-click context menu code above
  // -----------------------------------

  const {
    task: { id, title, description },
    index,
  } = props;
  const { dispatch } = useContext(BoardContext);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = useState<boolean>(false);

  //handlers for menu
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    handleClose();
    dispatch({ type: "deleteTask", payload: id });
  };

  //handle add image
  const handleAddImg = () => {};

  //handlers for expand
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            {/* div below is wrapper for right click menu*/}
            <div
              onContextMenu={handleRightClick}
              style={{ cursor: "context-menu" }}
            >
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>

              <Card className={classes.root}>
                <CardHeader
                  action={
                    <IconButton aria-label="settings" onClick={handleClick}>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={title}
                />
                <CardActions disableSpacing>
                  <IconButton
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Typography paragraph>{description}</Typography>
                  </CardContent>
                </Collapse>
              </Card>
              {/* below is dialog form for adding images */}
              <Dialog
                open={showForm}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseForm}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogContent>
                  <DialogContentText>
                    Choose an image for your task
                  </DialogContentText>
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
                      style={{ display: "none" }}
                      onChange={handleCloseForm}
                    />
                  </Button>
                </DialogContent>
              </Dialog>
              {/*  below is right click menu*/}
              <Menu
                keepMounted
                open={state.mouseY !== null}
                onClose={handleCloseContextMenu}
                anchorReference="anchorPosition"
                anchorPosition={
                  state.mouseY !== null && state.mouseX !== null
                    ? { top: state.mouseY, left: state.mouseX }
                    : undefined
                }
              >
                <MenuItem onClick={handleCloseContextMenu}>Edit</MenuItem>
                <MenuItem onClick={handleCloseContextMenu}>Move</MenuItem>
                <MenuItem onClick={handleOpenForm}>Add image</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}
