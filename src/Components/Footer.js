import React, { Component } from "react";
import "../Styling/Palette.css";

export default class Footer extends Component {
  render() {
    const { emoji, paletteName } = this.props;
    return (
      <>
        <footer className="footer">
          {paletteName}
          <span>{emoji}</span>
        </footer>
      </>
    );
  }
}
