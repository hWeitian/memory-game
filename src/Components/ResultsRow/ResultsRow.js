import React from "react";
import "./ResultsRow.css";
import { Grid, Typography } from "@mui/material";

class ResultsRow extends React.Component {
  render() {
    return (
      <>
        <Grid
          container
          className={this.props.className}
          sx={{ p: 1, mb: 1.875 }}
        >
          <Grid item xs={3} style={{ margin: "auto" }}>
            <Typography
              style={{
                fontSize: "0.8125rem",
                fontWeight: 700,
                textAlign: "left",
              }}
            >
              {`Round ${this.props.round}`}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography style={{ fontSize: "1.25rem", fontWeight: 700 }}>
              {`${this.props.matched} Pairs`}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography style={{ fontSize: "1.25rem", fontWeight: 700 }}>
              {`${this.props.moves} Moves`}
            </Typography>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default ResultsRow;
