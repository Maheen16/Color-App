import React from "react";
import { useNavigate } from "react-router-dom";
import useStyles from "../Styling/MiniPaletteStyles";
import { Delete } from "@mui/icons-material";

export default function MiniPalette({ id, openDialog, ...palette }) {
  const classes = useStyles();
  const navigate = useNavigate();
  // console.log(palette);

  const miniColorBoxes = palette.colors.map((color) => {
    // returning small miniboxes inside of each individual palette
    return (
      <div
        className={classes.miniColorBox}
        style={{ background: color.color }}
        key={color.name}
      ></div>
    );
  });
  const handleClick = () => {
    // taking to individual palette
    navigate(`palette/${id}`);
  };
  const deletePalette = (e) => {
    e.stopPropagation();
    openDialog(id);
  };
  return (
    <div className={classes.root} onClick={handleClick}>
      <Delete
        className={classes.deleteIcon}
        style={{ transition: "all 0.3s ease-in-out" }}
        onClick={deletePalette}
      />
      <div className={classes.colors}>{miniColorBoxes}</div>
      <h5 className={classes.title}>
        {palette.paletteName}
        <span className={classes.emoji}>{palette.emoji}</span>
      </h5>
    </div>
  );
}
