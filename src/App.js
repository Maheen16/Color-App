import seedPalettes from "./seedPalettes";
import Palette from "./Palette";
import { generatePalette } from "./ColorHelper";
function App() {
  // console.log(generatePalette(seedPalettes[4]));
  // console.log(seedPalettes);
  return (
    <div className="App">
      <Palette palette={generatePalette(seedPalettes[5])} />

      {/* {...seedPalettes[4]} object destructuring - whatever inside the seedPalettes will be passed as a prop */}
    </div>
  );
}

export default App;
