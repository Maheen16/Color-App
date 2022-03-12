import { Box } from "@mui/material";
import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import Colorbox from "./Components/Colorbox";
import Navbar from "./Components/Navbar";
export const styles = () => ({
  colorboxes: {
    height: "90%",
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
  }
  levelUpdate = (level) => {
    this.setState({ level });
    console.log(level);
  };
  colorFormat = (e) => {
    this.setState({ colorFormatType: e.target.value, open: true });
    // alert(e.target.value);
  };

  render() {
    const { level, colorFormatType } = this.state;
    const { colors } = this.props.palette;
    const colorboxes = colors[level].map((bgcolor, index) => {
      // console.log(bgcolor[colorFormatType]);
      return (
        <Colorbox background={bgcolor[colorFormatType]} name={bgcolor.name} />
      );
    });
    // console.log(this.props.palette);
    return (
      <div style={{ height: "100vh" }}>
        <Navbar
          level={level}
          levelUpdate={this.levelUpdate}
          colorFormat={this.colorFormat}
          val={this.state.colorFormatType}
          open={this.state.open}
        />
        <Box className={this.props.classes.colorboxes}>{colorboxes}</Box>
        <Box>
          <footer></footer>
        </Box>
      </div>
    );
  }
}
export default withStyles(styles)(Palette);
