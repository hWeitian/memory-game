import React from "react";
import { Paper, Typography } from "@mui/material";

class CurrentResultsCard extends React.Component {
  render() {
    return (
      <>
        <Paper
          elevation={3}
          style={{ backgroundColor: "#6395B8", color: "#FCFCFC" }}
          onClick={this.handleClick}
        >
          <Typography variant="body1">{this.props.title}</Typography>
          <Typography variant="body1" style={{ fontWeight: 700 }}>
            {this.props.count === undefined ? 0 : this.props.count}
          </Typography>
        </Paper>
      </>
    );
  }
}

export default CurrentResultsCard;
