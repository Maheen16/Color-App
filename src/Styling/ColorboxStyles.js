const styles = () => ({
  box: {
    width: "20%",
    height: (props) => (props.showLink ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-4.5px",
    " & .copyBtn": {
      position: "absolute",
      top: "50%",
      left: "50%",
      display: "block",
      width: "100px",
      height: "30px",
      marginLeft: "-50px",
      marginTop: "-15px",
      textAlign: "center",
      border: "none",
      color: "white",
      background: "rgba(255,255,255,0.3)",
      fontSize: "14px",
      lineHeight: "30px",
      cursor: "pointer",
      opacity: 0,
    },
    "&:hover .copyBtn": {
      opacity: 1,
    },
  },
  boxContent: {
    position: "absolute",
    left: "0px",
    bottom: "0px",
    fontSize: "12px",
    letterSpacing: "1px",
    width: "100%",
    color: "black",
    textTransform: "uppercase",
    "& span": {
      paddingLeft: "4px",
      letterSpacing: "2px",
      fontSize: "13px",
    },
  },
  lightText: {
    color: "white",
  },
  darkText: {
    color: "black",
  },
  copyOverlay: {
    zIndex: 0,
    opacity: 0,
    width: "100%",
    height: "100%",
    transform: "scale(0.1)",
  },
  showOverlay: {
    position: "absolute",
    width: " 100%",
    transition: "transform 0.6s ease-in-out",
    opacity: 1,
    transform: "scale(10)",
    zIndex: 10,
  },
  copyMsgContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "4rem",
    transform: "scale(0.1)",
    color: "white",
    opacity: 0,
    "& p": {
      fontWeight: 100,
      fontSize: "2rem",
    },
  },
  show: {
    opacity: 1,
    zIndex: 25,
    transform: "scale(1)",
    transition: " all 0.4s ease-in-out",
    transitionDelay: "0.3s",
  },
  copyMsg: {
    fontWeight: 400,
    textShadow: "1px 2px black",
    width: "100%",
    background: "rgba(255, 255, 255, 0.1)",
    textAlign: "center",
    padding: "2rem",
    marginBottom: 0,
    textTransform: "uppercase",
  },
  moreBtn: {
    right: 0,
    width: "60px",
    border: "none",
    bottom: 0,
    height: "30px",
    position: "absolute",
    background: "rgba(255, 255, 255, 0.3)",
    textAlign: "center",
    color: "black",
    lineHeight: "30px",
    textTransform: "uppercase",
  },
});
export default styles;
