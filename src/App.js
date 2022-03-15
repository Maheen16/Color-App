import seedPalettes from "./Helpers/seedPalettes";
import Palette from "./Components/Palette";
import { Route, Routes, useParams } from "react-router-dom";
// import { Component } from "react";
import PaletteList from "./Components/PaletteList";
// import findPaletteName from "./Helpers/helpers.js";
const WrappedComponent = (props) => {
  const params = useParams();
  return <Palette params={params} {...props} />;
};
function App() {
  return (
    <Routes>
      <Route path="/" element={<PaletteList allPalettes={seedPalettes} />} />
      <Route path="/palette/:id" element={<WrappedComponent />} />
    </Routes>
  );
}
export default App;
