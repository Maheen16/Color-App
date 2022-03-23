import { Box } from "@mui/material";
import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "../Styling/Colorbox.css";
import { Link } from "react-router-dom";
import chroma from "chroma-js";
export const styles = (theme) => ({
  box: {
    width: "20%",
    height: "25%",
    height: (props) => (props.showLink ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4.5px",
    " & .copyBtn": {
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
      background: "rgba(255,255,255,0.3)",
      fontSize: "14px",
      lineHeight: "30px",
      cursor: "pointer",
      opacity: 0,
    },
    "&:hover .copyBtn": {
      opacity: 1,
    },
  },
  boxContent: {
    position: "absolute",
    left: "0px",
    bottom: "0px",
    fontSize: "12px",
    letterSpacing: "1px",
    width: "100%",
    color: "black",
    textTransform: "uppercase",
    "& span": {
      paddingLeft: "4px",
      letterSpacing: "2px",
      fontSize: "13px",
    },
  },
  lightText: {
    color: "white",
  },
  darkText: {
    color: "black",
  },
});
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
              className={`copyOverlay ${copied && "show"}`}
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
                  <span className="moreBtn">More</span>
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
