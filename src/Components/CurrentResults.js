import React from "react";
import { Grid, Container } from "@mui/material";
import CurrentResultsCard from "./CurrentResultsCard";
import CountdownTimer from "./CountdownTimer";

class CurrentResults extends React.Component {
  render() {
    const currentRound = this.props.currentRound - 1;
    const currentPlayerMoves =
      this.props.players[this.props.currentPlayer - 1]["moves"][currentRound];
    const currentPlayerMatched =
      this.props.players[this.props.currentPlayer - 1]["matched"][currentRound];
    return (
      <>
        <Container>
          <Grid container>
            <Grid item xs={4}>
              <CurrentResultsCard
                title="Matched:"
                count={currentPlayerMatched}
              />
            </Grid>
            <Grid item xs={4}>
              <CurrentResultsCard title="Moves:" count={currentPlayerMoves} />
            </Grid>
            <Grid item xs={4}>
              <CurrentResultsCard
                title="Time:"
                count={
                  <CountdownTimer
                    timer={this.props.timer}
                    handleTimesUp={this.props.handleTimesUp}
                    roundStatus={this.props.roundStatus}
                    currentMoves={currentPlayerMoves}
                  />
                }
              />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

export default CurrentResults;
