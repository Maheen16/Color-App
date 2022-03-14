import seedPalettes from "./seedPalettes";
import Palette from "./Palette";
import { generatePalette } from "./ColorHelper";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { Component } from "react";
import Colorbox from "./Components/Colorbox";
class App extends Component {
  // console.log(generatePalette(seedPalettes[4]));
  // console.log(seedPalettes);
  render() {
    return (
      <Routes>
        <Route path="/" element={<Colorbox />} />
        <Route
          path="/palette/:id"
          element={<Palette palette={generatePalette(seedPalettes[1])} />}
        />
        {/* <div>
        <Palette palette={generatePalette(seedPalettes[1])} />
        {...seedPalettes[4]} object destructuring - whatever inside the
        seedPalettes will be passed as a prop
      </div> */}
      </Routes>
    );
  }
}
export default App;
