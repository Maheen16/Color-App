import React, { Component } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
} from "@mui/material";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
export default class PaletteDialogBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      error: false,
      newPaletteName: "",
    };
  }
  submit = () => {
    let control = false;
    if (this.state.newPaletteName === "") {
      this.setState({ error: true });
    } else {
      this.props.palette.forEach((element) => {
        if (
          element.paletteName.toLowerCase() ===
          this.state.newPaletteName.toLowerCase()
        ) {
          control = true;
          console.log("same name");
        }
      });
      this.setState({ error: control });
    }
  };
  handleChange(evt) {
    this.setState({
      newPaletteName: evt.target.value,
    });
  }
  render() {
    const { error, newPaletteName, open } = this.state;
    const { hideForm, showingForm } = this.props;
    return (
      <Box>
        <Dialog open={showingForm} onClose={hideForm}>
          <DialogTitle sx={{ fontWeight: "bold", fontSize: "18px" }}>
            Choose a Palette Name
          </DialogTitle>
          <Picker set="apple" />
          <DialogContent>
            <DialogContentText>
              Please enter a name for your new beautiful palette. Make sure it's
              unique!
            </DialogContentText>
            <TextField
              onChange={(e) => this.handleChange(e)}
              value={newPaletteName}
              autoFocus
              margin="normal"
              id="name"
              label="Palette Name"
              type="text"
              fullWidth
              variant="standard"
              error={error}
              helperText={
                error
                  ? newPaletteName
                    ? "already used name"
                    : "can not be empty"
                  : ""
              }
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideForm}>Cancel</Button>
            <Button onClick={this.submit} variant="contained" color="primary">
              SAVE PALETTE
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  }
}
