import React, { Component } from "react";
import { Link } from "react-router-dom";
import MiniPalette from "./MiniPalette";
import { withStyles } from "@mui/styles";
import { Typography, Button } from "@mui/material";
import styles from "../Styling/PaletteListStyles";
import DeleteDialog from "./DeleteDialog";
class PaletteList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDialogOpen: false,
      deletingId: "",
    };
  }
  openDialog = (id) => {
    this.setState({ isDialogOpen: true, deletingId: id });
  };
  closeDialog = () => {
    this.setState({ isDialogOpen: false });
  };
  deletePalette = () => {
    // deleting palette
    this.props.deletePalette(this.state.deletingId);
    this.closeDialog();
    console.log("deleted");
  };
  render() {
    const { allPalettes, classes, deletePalette } = this.props;
    const { isDialogOpen, deletingId } = this.state;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <Typography variant="h4">Color App</Typography>
            <div>
              <Button
                variant="contained"
                color="inherit"
                sx={{ textDecoration: "none", ml: 3 }}
              >
                <Link
                  to={`palette/newpalette`}
                  style={{ textDecoration: "none" }}
                >
                  Create Palette
                </Link>
              </Button>
            </div>
          </nav>
          <div className={classes.palettes}>
            {allPalettes.map((palette) => {
              return (
                <MiniPalette
                  {...palette}
                  key={palette.id}
                  id={palette.id}
                  openDialog={this.openDialog}
                  // handleDelete={this.deletePalette}
                />
              );
            })}
          </div>
          <DeleteDialog
            handleClickOpen={this.openDialog}
            handleClickClose={this.closeDialog}
            isDialogOpen={isDialogOpen}
            deletePalette={this.deletePalette}
            deletingId={deletingId}
          />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(PaletteList);
