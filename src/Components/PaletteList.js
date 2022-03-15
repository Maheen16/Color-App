import React, { Component } from "react";
import { Link } from "react-router-dom";
export default class PaletteList extends Component {
  render() {
    const { allPalettes } = this.props;
    console.log(allPalettes);
    return (
      <div>
        {allPalettes.map((cur) => {
          return (
            <p>
              <Link to={`/palette/${cur.id}`}>{cur.paletteName}</Link>
            </p>
          );
        })}
      </div>
    );
  }
}
