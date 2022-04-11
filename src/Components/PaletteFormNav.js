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
import { Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { savePalette, drawerWidth, open, handleDrawerOpen } = this.props;
    const {} = this.state;
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
            <Box>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
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
              <Link to={"/"}>
                <Button variant="contained" color="secondary">
                  GO BACK
                </Button>
              </Link>
              <Button variant="contained" color="success" onClick={savePalette}>
                SAVE PALETTE
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default PaletteFormNav;
