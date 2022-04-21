import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  root: {
    backgroundColor: "white",
    padding: "0.3rem",
    position: "relative",
    borderRadius: "5px",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    cursor: "pointer",
    "&:hover svg": {
      opacity: 1,
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
  deleteIcon: {
    color: "white",
    backgroundColor: "#eb3d30",
    width: "20px",
    height: "20px",
    position: "absolute",
    right: "0px",
    top: "0px",
    padding: "10px",
    zIndex: 10,
    opacity: 0,
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
