import React from "react";
import { Paper, Typography, Grid } from "@mui/material";
// import "./MultiplayerScoreCard.css";

class MultiplayerScoreCard extends React.Component {
  render() {
    return (
      <>
        <Paper
          elevation={this.props.elevation}
          sx={{ pt: 2.5, pb: 2.4, px: 1.8 }}
          className={this.props.className}
        >
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12} sm={10}>
              <Typography
                sx={{
                  textAlign: { xs: "center", sm: "left" },
                  fontWeight: 700,
                  display: { xs: "block", sm: "none" },
                  letterSpacing: "-0.0625rem",
                }}
              >
                P {this.props.playerNum}
              </Typography>
              <Typography
                sx={{
                  textAlign: { xs: "center", sm: "left" },
                  fontWeight: 700,
                  display: { xs: "none", sm: "block" },
                }}
              >
                Player {this.props.playerNum}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography
                sx={{
                  textAlign: { xs: "center", sm: "right" },
                  fontWeight: 700,
                  letterSpacing: "-0.0625rem",
                }}
                variant="h5"
              >
                {this.props.score}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  }
}

export default MultiplayerScoreCard;
