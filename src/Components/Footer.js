import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import styles from "../Styling/FooterStyles";

class Footer extends Component {
  render() {
    const { emoji, paletteName } = this.props;
    return (
      <>
        <footer className={this.props.classes.footer}>
          {paletteName}
          <span>{emoji}</span>
        </footer>
      </>
    );
  }
}
export default withStyles(styles)(Footer);
