import React from "react";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4.5px",
  },
});
function DraggableColorBox(props) {
  const classes = useStyles(props);

  return (
    <div style={{ backgroundColor: props.color }} className={classes.root}>
      {props.name}
    </div>
  );
}

export default DraggableColorBox;
