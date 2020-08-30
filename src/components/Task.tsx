import React, { useState, useContext } from "react";
import BoardContext from "../state/BoardContext";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Draggable } from "react-beautiful-dnd";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";

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
    // maxWidth: "92%",
    // padding: "0.2em",
    margin: "8px 15px",
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
                <MenuItem onClick={handleCloseContextMenu}>Edit task</MenuItem>
                <MenuItem onClick={handleCloseContextMenu}>Move task</MenuItem>
                <MenuItem onClick={handleDelete}>Delete task</MenuItem>
              </Menu>

              <Card className={classes.root} elevation={4}>
                <CardHeader
                  action={
                    <IconButton aria-label="settings" onClick={handleClick}>
                      <MoreHorizOutlinedIcon />
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
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
              </Menu>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}
