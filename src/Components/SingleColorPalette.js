import React, { Component } from "react";
import { generatePalette } from "../Helpers/ColorHelper";
import seedPalettes from "../Helpers/seedPalettes";
import { withStyles } from "@mui/styles";

import ColorBox from "./Colorbox";
const styles = () => ({
  colorboxes: {
    height: "90%",
  },
  section: {
    height: "100vh",
    position: "fixed",
    width: "100%",
    top: 0,
    transition: "opactiy 0.5s ease-in-out",
  },
});
class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(
      generatePalette(this.findPaletteName()),
      this.props.params.colorId
    );
    // console.log(this._shades);
  }
  gatherShades = (palette, colorToFilterBy) => {
    let shades = [];
    let allColors = palette.colors;
    // console.log(allColors);
    for (const key in allColors) {
      shades = shades.concat(
        allColors[key].filter((color) => color.id === colorToFilterBy)
      );
    }
    return shades.slice(1);
  };
  findPaletteName = () => {
    return seedPalettes.find((palette) => {
      // console.log(palette);
      return palette.id === this.props.params.paletteId;
    });
  };
  render() {
    const colorBoxes = this._shades.map((color) => {
      // console.log(color);
      return (
        <ColorBox
          background={color.hex}
          name={color.name}
          key={color.name}
          showLink={false}
        />
      );
    });
    // console.log(colors, paletteName, id, emoji);
    // console.log(colorId);
    return (
      <div>
        <h1>Single Color Palette</h1>
        <div className={this.props.classes.section}>
          <div className={this.props.classes.colorboxes}>{colorBoxes}</div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(SingleColorPalette);
