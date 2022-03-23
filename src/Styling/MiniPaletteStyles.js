import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    padding: "0.3rem",
    position: "relative",
    borderRadius: "5px",
    overflow: "hidden",
    width: "100%",
    "&:hover": {
      cursor: "pointer",
    },
  },
  colors: {
    background: "#dae1e4",
    width: "100%",
    height: "140px",
    borderRadius: "5px",
    overflow: "hidden",
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0.5rem 0",
    paddingBottom: "0.5rem",
    fontSize: "1rem",
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem",
  },
  miniColorBox: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-3.5px",
  },
});
export default useStyles;
