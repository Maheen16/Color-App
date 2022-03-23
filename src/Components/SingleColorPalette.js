import React, { Component } from "react";
import { generatePalette } from "../Helpers/ColorHelper";
import { Box } from "@mui/material";
import seedPalettes from "../Helpers/seedPalettes";
import { withStyles } from "@mui/styles";
import "../Styling/Colorbox.css";
import Navbar from "./Navbar";
import ColorBox from "./Colorbox";
import Footer from "./Footer";
import { Link } from "react-router-dom";
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
  box: {
    width: "20%",
    cursor: "pointer",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    marginBottom: "-4.5px",
  },
  goBack: {
    height: "50%",
    background: "black",
  },
  goBackBtn: {
    position: "absolute",
    top: "50%",
    left: "50%",
    display: "block",
    width: "100px",
    height: "30px",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    border: "none",
    color: "white",
    textDecoration: "none",
    background: "rgba(255,255,255,0.3)",
    fontSize: "14px",
    lineHeight: "30px",
    cursor: "pointer",
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
    const { emoji, paletteName, id } = generatePalette(this.findPaletteName());
    // console.log(emoji, paletteName, id);
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
        <div className={this.props.classes.colorboxes}>
          {colorBoxes}
          <div
            className={`${this.props.classes.box} ${this.props.classes.goBack}`}
          >
            <Link
              to={`/palette/${id}`}
              className={this.props.classes.goBackBtn}
            >
              GO BACK
            </Link>
          </div>
        </div>
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
