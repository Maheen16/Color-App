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
      stage: "form",
      error: false,
      newPaletteName: "",
      errorMessages: "",
    };
  }
  submit = () => {
    let control = false;
    if (this.state.newPaletteName === "") {
      control = true;
      this.setState({ errorMessages: "can not be empty" });
    } else {
      this.props.palette.forEach((element) => {
        console.log(element.paletteName, "loop element name");
        console.log(this.state.newPaletteName, "name in state");
        if (
          element.paletteName.toLowerCase() ===
          this.state.newPaletteName.toLowerCase()
        ) {
          control = true;
          this.setState({ errorMessages: "name already exists." });
          console.log("same name");
        }
      });
    }
    // console.log(control);
    this.setState({ error: control });
    if (!control) {
      this.setState({ stage: "emoji" });
    }
  };
  handleChange(evt) {
    this.setState({
      newPaletteName: evt.target.value,
    });
  }
  addEmoji = (emoji) => {
    const newPalette = {
      paletteName: this.state.newPaletteName,
      emoji: emoji.native,
    };
    this.props.savePalette(newPalette);
    // console.log(newPalette, "newPalette");
    this.setState({ stage: "" });
  };
  // componentDidMount() {
  //   console.log("dialogbox");
  // }
  render() {
    const { error, stage, newPaletteName, errorMessages } = this.state;
    const { hideForm } = this.props;
    return (
      <Box>
        <Dialog open={stage === "emoji"}>
          <Picker onSelect={this.addEmoji} title="Pick a Palette Emoji" />
        </Dialog>
        <Dialog open={stage === "form"} onClose={hideForm}>
          <DialogTitle sx={{ fontWeight: "bold", fontSize: "18px" }}>
            Choose a Palette Name
          </DialogTitle>
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
              helperText={errorMessages}
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
