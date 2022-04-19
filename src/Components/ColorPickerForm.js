import React, { Component } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { withStyles } from "@mui/styles";
import { ChromePicker } from "react-color";

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
class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      error: false,
    };
  }

  render() {
    const {
      classes,
      isPaletteFull,
      createColors,
      handleChange,
      newColorName,
      error,
      errorMessages,
      currentColor,
      colorHandleChange,
    } = this.props;
    return (
      <>
        <Box className={classes.chromePicker}>
          <ChromePicker
            color={currentColor}
            onChangeComplete={colorHandleChange}
          />
        </Box>
        <TextField
          error={error}
          label="Enter Color Name"
          variant="standard"
          onChange={handleChange}
          value={newColorName}
          name={newColorName}
          helperText={errorMessages}
        />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={isPaletteFull}
          onClick={createColors}
          sx={{
            mt: 2,
            width: "90%",
            p: 1,
            fontWeight: "bold",
            fontSize: "23px",
          }}
          style={{ backgroundColor: isPaletteFull ? "grey" : currentColor }}
        >
          {isPaletteFull ? "Palette Full !!" : "Add Palette"}
        </Button>
      </>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
