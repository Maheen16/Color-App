import { Box } from "@mui/material";
import React, { Component } from "react";
import { withStyles } from "@mui/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "../Styling/Colorbox.css";
import { Link } from "react-router-dom";

export const styles = (theme) => ({
  box: {
    width: "20%",
    height: "25%",
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
      padding: "12px",
      letterSpacing: "2px",
      fontSize: "13px",
    },
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
    console.log("copied");
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 2000);
    });
  };
  render() {
    const { background, name, classes } = this.props;
    const { copied } = this.state;
    return (
      <>
        <CopyToClipboard text={background} onCopy={this.changeCopyState}>
          <Box sx={{ background }} className={classes.box}>
            <div
              className={`copyOverlay ${copied && "show"}`}
              style={{ background }}
            />
            <div className={`copy-msg-container ${copied && "show"}`}>
              <h1 className="copy-msg">Copied ! </h1>
              <p>{background}</p>
            </div>
            <Box className={classes.parentContainer}>
              <div className={classes.boxContent}>
                <span>{name}</span>
              </div>
              <button className="copyBtn">COPY</button>
              <Link to="/" onClick={(e) => e.stopPropagation()}>
                <span className="moreBtn">More</span>
              </Link>
            </Box>
          </Box>
        </CopyToClipboard>
      </>
    );
  }
}
export default withStyles(styles)(Colorbox);
