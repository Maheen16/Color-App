import { Box } from "@mui/material";
import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import Colorbox from "./Colorbox";
import Navbar from "./Navbar";
import "../Styling/Palette.css";
import { generatePalette } from "../Helpers/ColorHelper";
import seedPalettes from "../Helpers/seedPalettes";
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
class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      colorFormatType: "hex",
      open: false,
    };
    this.levelUpdate = this.levelUpdate.bind(this);
    this.colorFormat = this.colorFormat.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  levelUpdate = (level) => {
    this.setState({ level });
    console.log(level);
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
    // console.log(this.props.params.id);
    return seedPalettes.find((palette) => {
      // console.log(palette);
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
      // console.log(bgcolor);
      return (
        <Colorbox
          background={bgcolor[colorFormatType]}
          name={bgcolor.name}
          key={bgcolor.name}
          paletteId={id}
          colorId={bgcolor.id}
        />
      );
    });
    // console.log(this.props.palette);
    return (
      <div className={this.props.classes.section}>
        <Navbar
          level={level}
          levelUpdate={this.levelUpdate}
          colorFormat={this.colorFormat}
          val={this.state.colorFormatType}
          open={this.state.open}
          handleClose={this.handleClose}
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
          <footer className="footer">
            {paletteName}
            <span>{emoji}</span>
          </footer>
        </Box>
      </div>
    );
  }
}
export default withStyles(styles)(Palette);
