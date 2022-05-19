const styles = () => ({
  root: {
    backgroundColor: "#394bad",
    // height: "100vh",
    height: "100%",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  container: {
    width: "60%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  nav: {
    display: "flex",
    cursor: "pointer",
    width: "100%",
    color: "white",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "1.2rem 0",
    "& a": {
      color: "black",
    },
  },
  palettes: {
    display: "grid",
    boxSizing: "border-box",
    width: "100%",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "5%",
  },
});
export default styles;
