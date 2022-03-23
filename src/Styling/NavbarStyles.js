const styles = () => ({
  slider: {
    width: "350px",
    margin: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& p": {
      width: "36%",
      margin: "0 12px",
    },
    "& .rc-slider-track": {
      background: "transparent !important",
    },
    "& .rc-slider-rail": {
      height: "8px",
    },
    "& .rc-slider-handle, .rc-slider-handle:active, .rc-slider-handle-dragging, .rc-slider-handle:focus, .rc-slider-handle:hover":
      {
        backgroundColor: "green",
        outline: "none",
        border: "2px solid green !important",
        boxShadow: "none !important",
        width: "13px",
      },
  },
  logoSlider: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "8vh",
  },
  logo: {
    background: "#8EA8B8",
    cursor: "pointer",
    height: "100%",
    alignItems: "center",
    display: "flex",
    padding: "0 10px",
    "& h5": {
      color: "black",
      textAlign: "center",
      fontSize: "2rem",
      fontWeight: "400",
    },
  },
  link: {
    textDecoration: "none",
  },
  navbarContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default styles;
