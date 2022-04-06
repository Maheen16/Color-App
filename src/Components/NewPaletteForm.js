import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import { TextField } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { withStyles } from "@mui/styles";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { ChromePicker } from "react-color";
import chroma from "chroma-js";
import DraggableColorBox from "./DraggableColorBox";

const styles = () => ({
  chromePicker: {
    "& .chrome-picker": {
      width: "310px !important",
    },
  },
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    flexDirection: "column",
    margin: "8px 0",
  },
});

const drawerWidth = 350;

class NewPaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      currentColor: "teal",
      newColors: [{ color: "blue", name: "blue" }],
      isPaletteFull: false,
      newName: "",
      error: false,
      errorMessages: "",
    };
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  colorHandleChange = (newColor) => {
    this.setState({ currentColor: newColor.hex });
  };
  isExistName = () => {
    let isNameUnique = false;
    this.state.newColors.forEach((cur) => {
      if (cur.name === this.state.newName) {
        isNameUnique = true;
        // console.log("name must be unique");
        this.setState({ error: true });
      }
      this.setState({ errorMessages: "" });
    });
    return isNameUnique;
  };
  isExistColor = () => {
    let result = false;
    this.state.newColors.forEach((cur) => {
      if (cur.color === this.state.currentColor) {
        result = true;
        this.setState({ error: true });
      }
      this.setState({ errorMessages: "" });
    });
    return result;
  };
  creatColors = () => {
    if (this.state.newName === "") {
      console.log("required");
      this.setState({ errorMessages: "name is required", error: true });
      return;
    }
    this.setState({ errorMessages: "" });

    let isNameUnique = this.isExistName();
    let isColorUnique = this.isExistColor();
    if (isNameUnique) {
      this.setState({ errorMessages: "name must be unique" });
      // console.log("name already exist");
    } else if (isColorUnique) {
      this.setState({ errorMessages: "color must be unique" });
    } else {
      // console.log("unique name");
      const colorDetail = {
        color: this.state.currentColor,
        name: this.state.newName,
      };
      // console.log(colorDetail);
      this.setState(
        {
          newColors: [...this.state.newColors, colorDetail],
          error: false,
          newName: "",
        },
        () => {
          if (this.state.newColors.length >= 20) {
            this.setState({ isPaletteFull: true });
          }
        }
      );
    }
  };

  clearPalette = () => {
    this.setState({ newColors: [], isPaletteFull: false });
  };

  randomColor = () => {
    let randomColor = chroma.random();
    this.setState(
      {
        newColors: [...this.state.newColors, randomColor.hex()],
      },
      () => {
        if (this.state.newColors.length >= 20) {
          this.setState({ isPaletteFull: true });
        }
      }
    );
  };

  handleChange = (evt) => {
    this.setState({ newName: evt.target.value });
  };

  savePalette = () => {
    let newName = "my First palette";
    const newPaletteDetail = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.newColors,
    };
    this.props.savePalette(newPaletteDetail);
    this.props.navigate("/");
  };
  deleteColor = (colorName) => {
    console.log("deleted");
    this.setState({
      newColors: this.state.newColors.filter(
        (color) => color.name !== colorName
      ),
    });
  };
  render() {
    const {
      open,
      currentColor,
      newColors,
      isPaletteFull,
      newName,
      error,
      errorMessages,
    } = this.state;
    const { classes } = this.props;
    const Main = styled("main", {
      shouldForwardProp: (prop) => prop !== "open",
    })(({ theme, open }) => ({
      flexGrow: 1,
      height: "95vh",
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
          color="info"
          open={open}
          sx={{ width: "calc(100% -drawerWidth)" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
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
            </Box>
            <Box>
              <Button variant="contained" color="secondary">
                GO BACK
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={this.savePalette}
              >
                SAVE PALETTE
              </Button>
            </Box>
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
                disabled={isPaletteFull}
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
            <TextField
              error={error}
              label="Enter Color Name"
              variant="standard"
              onChange={this.handleChange}
              value={newName}
              helperText={errorMessages}
            />
            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={isPaletteFull}
              onClick={this.creatColors}
              sx={{
                mt: 2,
                width: "90%",
                // color: isLightColor ? "black" : "white",
                p: 1,
                fontWeight: "bold",
                fontSize: "23px",
              }}
              style={{ backgroundColor: currentColor }}
            >
              {isPaletteFull ? "Palette Full !!" : "Add Palette"}
            </Button>
          </Box>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          {newColors?.map((color, index) => {
            return (
              <DraggableColorBox
                handleClick={() => this.deleteColor(color.name)}
                color={color.color}
                name={color.name}
                key={color.name}
              />
            );
          })}
        </Main>
      </Box>
    );
  }
}
export default withStyles(styles)(NewPaletteForm);
