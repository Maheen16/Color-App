import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import { Box, Drawer, Typography, IconButton, Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DraggableColorList from "./DraggableColorList";
import { arrayMove } from "react-sortable-hoc";
import PaletteFormNav from "./PaletteFormNav";
import ColorPickerForm from "./ColorPickerForm";

const drawerWidth = 350;
class NewPaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      currentColor: "teal",
      newColors: this.props.palette[0].colors,
      isPaletteFull: false,
      newName: "",
      error: false,
      errorMessages: "",
    };
    this.deleteColor = this.deleteColor.bind(this);
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
    this.setState({ newName: evt.target.value });
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
      if (cur.name === this.state.newName) {
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
    if (this.state.newName === "") {
      this.setState({ errorMessages: "name is required", error: true });
      console.log("required");
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
        name: this.state.newName,
      };
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
      newName,
      error,
      errorMessages,
      currentColor,
    } = this.state;
    const { palette } = this.props;

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
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    }));

    return (
      <Box sx={{ display: "flex" }}>
        <PaletteFormNav
          savePalette={this.savePalette}
          drawerWidth={drawerWidth}
          handleDrawerOpen={this.handleDrawerOpen}
          open={open}
        />

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
            <ColorPickerForm
              palette={palette}
              isPaletteFull={isPaletteFull}
              createColors={this.creatColors}
              handleChange={this.handleChange}
              newName={newName}
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
export default NewPaletteForm;
