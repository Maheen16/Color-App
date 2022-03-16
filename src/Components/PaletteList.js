import React, { Component } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@mui/styles";
export const styles = () => ({
  root: {
    backgroundColor: "purple",
    height: "100vh",
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
    console.log(allPalettes);
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1>Color App</h1>
            <a>Create Palette</a>
          </nav>
          <div className={classes.palettes}>
            {allPalettes.map((palette) => {
              {
                /* console.log(palette); */
              }
              return <MiniPalette {...palette} key={palette.id} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(PaletteList);
