import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    border: "1px solid black",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    width: "100%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  colors: {
    background: "#dae1e4",
    width: "100%",
    height: "150px",
    borderRadius: "5px",
    overflow: "hidden",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0.5rem 0",
    paddingBottom: "0.5rem",
    fontSize: "1rem",
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem",
  },
  miniColorBox: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-3.5px",
  },
});

export default function MiniPalette({ ...palette }) {
  const classes = useStyles();
  // console.log(palette);
  const miniColorBoxes = palette.colors.map((color) => {
    return (
      <div
        className={classes.miniColorBox}
        style={{ background: color.color }}
        key={color.name}
      ></div>
    );
  });
  return (
    <div className={classes.root}>
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {palette.paletteName}
        <span className={classes.emoji}>{palette.emoji}</span>
      </h5>
    </div>
  );
}
