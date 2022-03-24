import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import { withStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ChromePicker } from "react-color";
import chroma from "chroma-js";

const styles = () => ({
  chromePicker: {
    "& .chrome-picker": {
      width: "310px !important",
    },
  },
});

const drawerWidth = 350;

class NewPaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      currentColor: "teal",
      newColors: ["#2F2F51", "#CB342D", "#DF9C99", "#0C5D5D"],
      isPaletteFull: false,
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  colorHandleChange = (newColor) => {
    // console.log(newColor);
    this.setState({ currentColor: newColor.hex });
  };

  creatColors = () => {
    console.log("clicked");
    this.setState({
      newColors: [...this.state.newColors, this.state.currentColor],
    });
    if (this.state.newColors.length >= 20) {
      this.setState({ isPaletteFull: true });
    }
  };

  clearPalette = () => {
    this.setState({ newColors: [] });
  };

  randomColor = () => {
    let randomColor = chroma.random();
    console.log(this.state.newColors.length);
    this.setState({
      newColors: [...this.state.newColors, randomColor.hex()],
    });
    if (this.state.newColors.length >= 20) {
      this.setState({ isPaletteFull: true });
    }
  };
  render() {
    const { open, currentColor, newColors, isPaletteFull } = this.state;
    const { classes } = this.props;

    const Main = styled("main", {
      shouldForwardProp: (prop) => prop !== "open",
    })(({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: `-${drawerWidth}px`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      }),
    }));

    const DrawerHeader = styled("div")(({ theme }) => ({
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    }));

    const AppBar = styled(MuiAppBar, {
      shouldForwardProp: (prop) => prop !== "open",
    })(({ theme, open }) => ({
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }),
    }));

    return (
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{ width: "calc(100% -drawerWidth)" }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Create a Palette
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{ letterSpacing: "5px", wordSpacing: "5px" }}
            >
              Design Your Palette
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "center",
                mb: 2,
                mt: 2,
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                sx={{ mr: 2 }}
                onClick={this.clearPalette}
              >
                Clear Palette
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.randomColor}
              >
                Random Color
              </Button>
            </Box>
            <Box className={classes.chromePicker}>
              <ChromePicker
                color={currentColor}
                onChangeComplete={this.colorHandleChange}
              />
            </Box>
            <Button
              color="primary"
              variant="contained"
              disabled={isPaletteFull}
              sx={{ mt: 2, width: "90%", p: 2 }}
              style={{ backgroundColor: currentColor }}
              onClick={this.creatColors}
            >
              {isPaletteFull ? "Palette Full !!" : "Add Palette"}
            </Button>
          </Box>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <ul>
            {newColors?.map((color, index) => {
              return (
                <li style={{ backgroundColor: color }} key={index}>
                  {color}
                </li>
              );
            })}
          </ul>
        </Main>
      </Box>
    );
  }
}
export default withStyles(styles)(NewPaletteForm);
