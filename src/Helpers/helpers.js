import seedPalettes from "./seedPalettes";
console.log(seedPalettes);
export default function findPaletteName() {
  return seedPalettes.find((id) => {
    return seedPalettes.id === id;
  });
}
