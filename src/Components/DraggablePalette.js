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
function DraggablePalette(props) {
  const classes = useStyles(props);
  console.log(props.color);
  console.log(props.name);
  return (
    <div style={{ backgroundColor: props.color }} className={classes.root}>
      {props.name}
    </div>
  );
}

export default DraggablePalette;
