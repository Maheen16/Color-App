import { Box } from "@mui/material";
import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import Colorbox from "./Colorbox";
import Navbar from "./Navbar";
import { generatePalette } from "../Helpers/ColorHelper";
// import seedPalettes from "../Helpers/seedPalettes";
import Footer from "./Footer";
import styles from "../Styling/PaletteStyles";

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      colorFormatType: "hex",
      open: false,
      isShowingAllColors: true,
    };
    this.levelUpdate = this.levelUpdate.bind(this);
    this.colorFormat = this.colorFormat.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  levelUpdate = (level) => {
    this.setState({ level });
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
    return this.props.seedPalettes.find((palette) => {
      // console.log(palette);
      console.log(this.props.seedPalettes);
      return palette.id === this.props.params.id;
    });
  };
  render() {
    const { level, colorFormatType } = this.state;
    const { id } = this.props.params;
    // console.log(id);
    const { colors, paletteName, emoji } = generatePalette(
      this.findPaletteName()
    );
    const colorboxes = colors[level].map((bgcolor) => {
      return (
        <Colorbox
          colors={colors}
          background={bgcolor[colorFormatType]}
          name={bgcolor.name}
          key={bgcolor.name}
          paletteId={id}
          colorId={bgcolor.id}
          showLink={true}
        />
      );
    });
    return (
      <div className={this.props.classes.section}>
        <Navbar
          level={level}
          levelUpdate={this.levelUpdate}
          colorFormat={this.colorFormat}
          val={this.state.colorFormatType}
          open={this.state.open}
          handleClose={this.handleClose}
          showingAllColors={this.state.isShowingAllColors}
        />
        <Box className={this.props.classes.colorboxes}>{colorboxes}</Box>
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
export default withStyles(styles)(Palette);
