import React, { Component } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import styles from "../Styling/PaletteListStyles";
class PaletteList extends Component {
  render() {
    const { allPalettes, classes } = this.props;
    // console.log(allPalettes);
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <Typography variant="h4">Color App</Typography>
            <Link to={`palette/newpalette`}>Create Palette</Link>
          </nav>
          <div className={classes.palettes}>
            {allPalettes.map((palette) => {
              return (
                <MiniPalette {...palette} key={palette.id} id={palette.id} />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(PaletteList);
