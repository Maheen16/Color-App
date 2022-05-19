import React, { Component } from "react";
import { Box, Drawer, Typography, IconButton, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNav from "./PaletteFormNav";
import { withStyles } from "@mui/styles";
import ColorPickerForm from "./ColorPickerForm";
import seedPalettes from "../Helpers/seedPalettes";
import {
  Main,
  DrawerHeader,
  drawerWidth,
} from "../Styling/NewPaletteFormStyles";
import styles from "../Styling/NewPaletteFormStyles";

class NewPaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      currentColor: "teal",
      newColors: seedPalettes[0].colors,
      isPaletteFull: false,
      newColorName: "",
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

  clearPalette = () => {
    this.setState({ newColors: [], isPaletteFull: false });
  };

  handleChange = (evt) => {
    this.setState({ newColorName: evt.target.value });
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

  isExistName = () => {
    let isNameUnique = false;
    this.state.newColors.forEach((cur) => {
      if (cur.name === this.state.newColorName) {
        isNameUnique = true;
        // console.log("name must be unique");
        this.setState({ error: true });
      }
      this.setState({ errorMessages: "" });
    });
    return isNameUnique;
  };
  creatColors = () => {
    let isNameUnique = this.isExistName();
    let isColorUnique = this.isExistColor();
    if (this.state.newColorName === "") {
      this.setState({ errorMessages: "name is required", error: true });
      // console.log("required");
      return;
    }
    this.setState({ errorMessages: "" });

    if (isNameUnique) {
      this.setState({ errorMessages: "name must be unique" });
    } else if (isColorUnique) {
      this.setState({ errorMessages: "color must be unique" });
    } else {
      const colorDetail = {
        color: this.state.currentColor,
        name: this.state.newColorName,
      };
      this.setState(
        {
          newColors: [...this.state.newColors, colorDetail],
          error: false,
          newColorName: "",
        },
        () => {
          if (this.state.newColors.length >= 20) {
            this.setState({ isPaletteFull: true });
          }
        }
      );
    }
  };

  randomColor = () => {
    const allColors = this.props.palette.map((p) => p.colors).flat();
    // console.log(allColors);
    let randomColor;
    let isDuplicateColor = true;
    while (isDuplicateColor) {
      let rand = Math.floor(Math.random() * allColors.length);
      randomColor = allColors[rand];
      isDuplicateColor = this.state.newColors.some(
        (color) => color.name === randomColor.name
      );
    }
    this.setState(
      {
        newColors: [...this.state.newColors, randomColor],
      },
      () => {
        if (this.state.newColors.length >= 20) {
          this.setState({ isPaletteFull: true });
        }
      }
    );
  };

  savePalette = (newPalette) => {
    let newName = newPalette.paletteName;
    const newPaletteDetail = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.newColors,
      emoji: newPalette.emoji,
    };
    this.props.savePalette(newPaletteDetail);
    this.props.navigate("/");
  };
  deleteColor = (colorName) => {
    this.setState({
      newColors: this.state.newColors.filter(
        (color) => color.name !== colorName
      ),
      isPaletteFull: false,
    });
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ newColors }) => ({
      newColors: arrayMove(newColors, oldIndex, newIndex),
    }));
  };

  colorHandleChange = (newColor) => {
    this.setState({ currentColor: newColor.hex });
  };

  render() {
    const {
      open,
      newColors,
      isPaletteFull,
      newColorName,
      error,
      errorMessages,
      currentColor,
    } = this.state;
    const { palette, classes } = this.props;

    return (
      <Box sx={{ display: "flex" }}>
        <PaletteFormNav
          savePalette={this.savePalette}
          drawerWidth={drawerWidth}
          handleDrawerOpen={this.handleDrawerOpen}
          open={open}
          palette={palette}
          handlePaletteNameChange={this.handlePaletteNameChange}
        />

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </DrawerHeader>
          <Box className={classes.main}>
            <Typography
              variant="h5"
              sx={{ letterSpacing: "5px", wordSpacing: "5px" }}
            >
              Design Your Palette
            </Typography>
            <Box className={classes.buttons} sx={{ mb: 2, mt: 2 }}>
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
            <ColorPickerForm
              palette={palette}
              isPaletteFull={isPaletteFull}
              createColors={this.creatColors}
              handleChange={this.handleChange}
              newColorName={newColorName}
              errorMessages={errorMessages}
              error={error}
              currentColor={currentColor}
              colorHandleChange={this.colorHandleChange}
            />
          </Box>
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <DraggableColorList
            newColors={newColors}
            deleteColor={this.deleteColor}
            axis="xy"
            onSortEnd={this.onSortEnd}
            distance={20}
          />
        </Main>
      </Box>
    );
  }
}
export default withStyles(styles)(NewPaletteForm);
