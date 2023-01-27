import React from "react";
import { Typography, Grid } from "@mui/material";
import ResultsRow from "./ResultsRow/ResultsRow";
import ResultsPagination from "./ResultsPagination";

class ResultsContainer extends React.Component {
  render() {
    const numOfPlayers = this.props.players.length;
    const players = this.props.players;
    const results =
      numOfPlayers === 1
        ? players[0]["matched"].map((matchedCount, index) => {
            const lastIndex = players[0]["matched"].length - 1;
            let reverseIndex = lastIndex - index;
            if (reverseIndex === lastIndex) {
              return (
                <ResultsRow
                  round={reverseIndex + 1}
                  matched={players[0]["matched"][reverseIndex]}
                  moves={players[0]["moves"][reverseIndex]}
                  className={"current-round"}
                  key={`Round-${reverseIndex + 1}`}
                />
              );
            } else {
              return (
                <ResultsRow
                  round={reverseIndex + 1}
                  matched={players[0]["matched"][reverseIndex]}
                  moves={players[0]["moves"][reverseIndex]}
                  className={"prev-rounds"}
                  key={`Round-${reverseIndex + 1}`}
                />
              );
            }
          })
        : null;
    return (
      <>
        <Grid container sx={{ mb: 3.75 }}>
          <Grid item xs={12}>
            <Typography
              id="modal-modal-title"
              variant="h5"
              style={{ fontWeight: 700 }}
            >
              {this.props.clickSource === "results-navbar"
                ? "Results"
                : this.props.roundStatus === "lose"
                ? "Time's Up! You lose!"
                : "Congratulations!"}
            </Typography>
          </Grid>
          {this.props.clickSource === "results-navbar" ? null : (
            <Grid item xs={12}>
              <Typography style={{ fontWeight: 700, color: "#7191A5" }}>
                Results
              </Typography>
            </Grid>
          )}
        </Grid>
        <Grid container justifyContent="center" sx={{ mb: 2 }}>
          <ResultsPagination results={results} />
        </Grid>
      </>
    );
  }
}

export default ResultsContainer;
