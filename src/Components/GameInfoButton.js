import React from "react";
import { Tooltip, Zoom, IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

class GameInfoButton extends React.Component {
  handleClick = () => {
    this.props.onClick("rules");
  };

  render() {
    return (
      <Tooltip TransitionComponent={Zoom} title="Game Info">
        <IconButton
          aria-label="mobile menu"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={this.handleClick}
          sx={{
            color: "#304859",
            padding: 0,
          }}
        >
          <HelpOutlineIcon sx={{ fontSize: this.props.size }} />
        </IconButton>
      </Tooltip>
    );
  }
}

export default GameInfoButton;
