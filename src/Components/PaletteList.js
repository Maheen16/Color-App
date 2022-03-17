import React, { Component } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@mui/styles";
import { Typography } from "@mui/material";
export const styles = () => ({
  root: {
    backgroundColor: "purple",
    height: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container: {
    width: "60%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  nav: {
    display: "flex",
    cursor: "pointer",
    width: "100%",
    color: "white",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "1.2rem 0",
  },
  palettes: {
    display: "grid",
    boxSizing: "border-box",
    width: "100%",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%",
  },
});
class PaletteList extends Component {
  render() {
    const { allPalettes, classes } = this.props;
    // console.log(allPalettes);
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <Typography variant="h4">Color App</Typography>
            <a>Create Palette</a>
          </nav>
          <div className={classes.palettes}>
            {allPalettes.map((palette) => {
              return <MiniPalette {...palette} key={palette.id} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(PaletteList);
