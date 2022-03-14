import {
  AppBar,
  FormControl,
  Typography,
  Box,
  Select,
  MenuItem,
  Snackbar,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "../Styling/Navbar.css";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { level, levelUpdate, colorFormat, val, open, handleClose } =
      this.props;
    const action = (
      <React.Fragment>
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </React.Fragment>
    );
    return (
      <AppBar
        position="static"
        color="transparent"
        sx={{ height: "6%", justifyContent: "center" }}
      >
        <Box className="navbar-container">
          <Box className="logo-slider">
            <Typography variant="h5" className="logo">
              ColorApp
            </Typography>
            <Box className="slider">
              <Typography sx={{ fontSize: "16px" }}>Level : {level}</Typography>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onAfterChange={levelUpdate}
              />
            </Box>
          </Box>
          <FormControl variant="standard" sx={{ width: "15%", mr: 4 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={val}
              onChange={colorFormat}
            >
              <MenuItem value="hex">HEX - #ffffff</MenuItem>
              <MenuItem value="rgb">RGB - (255,255,255)</MenuItem>
              <MenuItem value="rgba">RGBA - (255,255,255 , 1.0)</MenuItem>
            </Select>
          </FormControl>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={this.handleClose}
            message={`Format Changed to ${val.toUpperCase()}`}
            action={action}
          />
        </Box>
      </AppBar>
    );
  }
}
