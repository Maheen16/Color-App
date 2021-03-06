import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import PaletteDialogBox from "./PaletteDiagloBox";
class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingForm: false,
    };
  }
  showForm = () => {
    this.setState({ showingForm: true });
  };
  hideForm = () => {
    this.setState({ showingForm: false });
  };
  // componentDidMount() {
  //   console.log("paletteFormNav");
  // }
  render() {
    const {
      palette,
      drawerWidth,
      open,
      handleDrawerOpen,
      paletteNameValidate,
      handlePaletteNameChange,
      savePalette,
    } = this.props;
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
      <div>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="info"
          open={open}
          sx={{ width: "calc(100% -drawerWidth)" }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ fontWeight: "bold" }}
              >
                Create a Palette
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <Button variant="contained" color="secondary">
                  GO BACK
                </Button>
              </Link>

              <Button
                variant="contained"
                onClick={this.showForm}
                color="primary"
                sx={{ ml: 2 }}
              >
                SAVE
              </Button>
              {this.state.showingForm && (
                <PaletteDialogBox
                  palette={palette}
                  paletteNameValidate={paletteNameValidate}
                  handleChange={handlePaletteNameChange}
                  hideForm={this.hideForm}
                  savePalette={savePalette}
                />
              )}
            </Box>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default PaletteFormNav;
