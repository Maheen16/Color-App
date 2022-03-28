import seedPalettes from "./Helpers/seedPalettes";
import Palette from "./Components/Palette";
import { Route, Routes, useParams } from "react-router-dom";
import PaletteList from "./Components/PaletteList";
import SingleColorPalette from "./Components/SingleColorPalette";
import NewPaletteForm from "./Components/NewPaletteForm";
import PaletteForm from "./Components/PaletteForm";
const WrappedComponent = (props) => {
  const params = useParams();
  return <Palette params={params} {...props} />;
};
const Wrapper = (props) => {
  const params = useParams();
  // console.log(params);
  return <SingleColorPalette params={params} {...props} />;
};
// const PaletteFormWrapper = (props) => {
//   const params = useParams();
//   return <PaletteForm params={params} {...props} />;
// };
function App() {
  return (
    <Routes>
      <Route path="/" element={<PaletteList allPalettes={seedPalettes} />} />
      <Route path="/palette/newpalette" element={<NewPaletteForm />} />
      {/* <Route path="/palette/newpalette" element={<PaletteFormWrapper />} /> */}

      <Route path="/palette/:id" element={<WrappedComponent />} />
      <Route path="/palette/:paletteId/:colorId" element={<Wrapper />} />
    </Routes>
  );
}
export default App;
