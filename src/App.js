import seedPalettes from "./Helpers/seedPalettes";
import Palette from "./Components/Palette";
import { Route, Routes, useParams } from "react-router-dom";
import PaletteList from "./Components/PaletteList";
import SingleColorPalette from "./Components/SingleColorPalette";
const WrappedComponent = (props) => {
  const params = useParams();
  return <Palette params={params} {...props} />;
};
function App() {
  return (
    <Routes>
      <Route path="/" element={<PaletteList allPalettes={seedPalettes} />} />
      <Route path="/palette/:id" element={<WrappedComponent />} />
      <Route
        path="/palette/:paletteId/:colorId"
        element={<SingleColorPalette />}
      />
    </Routes>
  );
}
export default App;
