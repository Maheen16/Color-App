import { Box } from "@mui/material";
import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styles from "../Styling/ColorboxStyles";
import { Link } from "react-router-dom";
import chroma from "chroma-js";

class Colorbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
    this.changeCopyState = this.changeCopyState.bind(this);
  }
  changeCopyState = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 2000);
    });
  };
  render() {
    const { background, name, classes, colorId, paletteId, showLink } =
      this.props;
    const { copied } = this.state;
    const isDarkColor = chroma(background).luminance() <= 0.09;
    const isLightColor = chroma(background).luminance() >= 0.7;
    return (
      <>
        <CopyToClipboard text={background} onCopy={this.changeCopyState}>
          <Box sx={{ background }} className={classes.box}>
            <div
              className={`${this.props.classes.copyOverlay} ${
                copied && this.props.classes.showOverlay
              }`}
              style={{ background }}
            />
            <div
              className={`${this.props.classes.copyMsgContainer} ${
                copied && this.props.classes.show
              }`}
            >
              <h1 className={this.props.classes.copyMsg}>Copied ! </h1>
              <p
                className={
                  isLightColor
                    ? `${this.props.classes.darkText}`
                    : `${this.props.classes.lightText}`
                }
              >
                {background}
              </p>
            </div>
            <Box className={classes.parentContainer}>
              <div className={classes.boxContent}>
                <span
                  className={
                    isDarkColor ? `${this.props.classes.lightText}` : ""
                  }
                >
                  {name}
                </span>
              </div>
              <button className={`copyBtn ${isLightColor ? "darkText" : ""}`}>
                COPY
              </button>
              {showLink && (
                <Link
                  to={`/palette/${paletteId}/${colorId}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className={this.props.classes.moreBtn}>More</span>
                </Link>
              )}
            </Box>
          </Box>
        </CopyToClipboard>
      </>
    );
  }
}
export default withStyles(styles)(Colorbox);
