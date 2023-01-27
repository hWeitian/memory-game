import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import CurrentResultsCard from "./CurrentResultsCard";
import CountdownTimer from "./CountdownTimer";

class CurrentResults extends React.Component {
  render() {
    const currentRound = this.props.players[0]["moves"].length;
    const currentRoundIndex = currentRound - 1;
    const currentPlayerMoves =
      this.props.players[this.props.currentPlayer - 1]["moves"][
        currentRoundIndex
      ];
    const currentPlayerMatched =
      this.props.players[this.props.currentPlayer - 1]["matched"][
        currentRoundIndex
      ];
    return (
      <>
        <Grid container sx={{ justifyContent: "center" }}>
          <Grid item xs={4} sm={3} md={2}>
            <Paper
              elevation={3}
              sx={{
                backgroundColor: "#FDA214",
                color: "#FCFCFC",
                borderRadius: "26px",
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700 }}>
                Round {currentRound}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid item xs={3} sm={2} md={1}>
          <CurrentResultsCard title="Matched:">
            {currentPlayerMatched}
          </CurrentResultsCard>
        </Grid>
        <Grid item xs={3} sm={2} md={1}>
          <CurrentResultsCard title="Moves:">
            {currentPlayerMoves}
          </CurrentResultsCard>
        </Grid>
        <Grid item xs={3} sm={2} md={1}>
          <CurrentResultsCard title="Time:">
            <CountdownTimer
              timer={this.props.timer}
              handleTimesUp={this.props.handleTimesUp}
              roundStatus={this.props.roundStatus}
              isModalShown={this.props.isModalShown}
            />
          </CurrentResultsCard>
        </Grid>
      </>
    );
  }
}

export default CurrentResults;
