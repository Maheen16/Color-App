import React, { Component } from "react";
import { generatePalette } from "../Helpers/ColorHelper";
import { Box } from "@mui/material";
import seedPalettes from "../Helpers/seedPalettes";
import { withStyles } from "@mui/styles";
import Navbar from "./Navbar";
import ColorBox from "./Colorbox";
import Footer from "./Footer";
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
    this.state = {
      open: false,
      colorFormatType: "hex",
    };
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
  colorFormat = (e) => {
    this.setState({ colorFormatType: e.target.value, open: true });
  };
  handleClose = (event, reason) => {
    this.setState({ open: false });
    if (reason === "clickaway") {
      return;
    }
  };
  findPaletteName = () => {
    return seedPalettes.find((palette) => {
      // console.log(palette);
      return palette.id === this.props.params.paletteId;
    });
  };
  render() {
    const { colorFormatType } = this.state;
    const { emoji, paletteName } = generatePalette(this.findPaletteName());
    console.log(emoji, paletteName);
    const colorBoxes = this._shades.map((color) => {
      return (
        <ColorBox
          background={color[colorFormatType]}
          name={color.name}
          key={color.name}
          showLink={false}
        />
      );
    });
    return (
      <div className={this.props.classes.section}>
        <Navbar
          showingAllColors={false}
          colorFormat={this.colorFormat}
          val={this.state.colorFormatType}
          handleClose={this.handleClose}
          open={this.state.open}
        />
        <div className={this.props.classes.colorBoxes}>{colorBoxes}</div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Footer paletteName={paletteName} emoji={emoji} />
        </Box>
      </div>
    );
  }
}
export default withStyles(styles)(SingleColorPalette);
