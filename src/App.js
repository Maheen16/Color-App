import seedPalettes from "./Helpers/seedPalettes";
import Palette from "./Components/Palette";
import { Route, Routes, useParams } from "react-router-dom";
import PaletteList from "./Components/PaletteList";
import SingleColorPalette from "./Components/SingleColorPalette";
import NewPaletteForm from "./Components/NewPaletteForm";
import { useNavigate } from "react-router-dom";
import { Component, useState } from "react";

const WrappedComponent = (props) => {
  const params = useParams();
  return <Palette params={params} {...props} />;
};
const Wrapper = (props) => {
  const params = useParams();
  // console.log(params);
  return <SingleColorPalette params={params} {...props} />;
};
const PaletteFormWrapper = (props) => {
  const navigate = useNavigate();
  return <NewPaletteForm navigate={navigate} {...props} />;
};
// class App extends Component() {
//   constructor(props) {
//     super(props);
//     this.state = {
//       palettes: seedPalettes,
//     };
//   }
//   render() {
//     return (
//       <Routes>
//         <Route
//           path="/"
//           element={<PaletteList allPalettes={this.state.palettes} />}
//         />
//         <Route path="/palette/newpalette" element={<PaletteFormWrapper />} />

//         <Route path="/palette/:id" element={<WrappedComponent />} />
//         <Route path="/palette/:paletteId/:colorId" element={<Wrapper />} />
//       </Routes>
//     );
//   }
// }
// export default App;

export default function App() {
  const [palette, setPalettes] = useState(seedPalettes);

  const savePalette = (newPalette) => {
    console.log(palette);
    console.log(newPalette);
    setPalettes([...palette, newPalette]);
  };
  return (
    <Routes>
      <Route path="/" element={<PaletteList allPalettes={palette} />} />
      <Route
        path="/palette/newpalette"
        element={<PaletteFormWrapper savePalette={savePalette} />}
      />

      <Route
        path="/palette/:id"
        element={<WrappedComponent seedPalettes={palette} />}
      />
      <Route
        path="/palette/:paletteId/:colorId"
        element={<Wrapper seedPalettes={palette} />}
      />
    </Routes>
  );
}
