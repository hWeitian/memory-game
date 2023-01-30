import React from "react";
import { Typography, Grid } from "@mui/material";
import ResultsRow from "./ResultsRow/ResultsRow";
import ResultsPagination from "./ResultsPagination";
import { generateResults, generateRoundsArr, determineWinner } from "../utlis";
import LevelSelect from "./LevelSelect";

class ResultsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLevel: this.props.round,
    };
  }

  handleSelectChange = (event) => {
    this.setState({
      selectedLevel: event.target.value,
    });
  };

  render() {
    const numOfPlayers = this.props.numOfPlayers;
    const currentRoundIndex = this.state.selectedLevel - 1;
    const currentPlayerIndex = this.props.currentPlayer - 1;
    // const players = this.props.players;
    const roundWinner = determineWinner(
      this.state.selectedLevel,
      this.props.players
    );
    const results =
      numOfPlayers === 1 ? (
        // Generate results for single player
        this.props.players[0]["matched"].map((matchedCount, index) => {
          const lastIndex = this.props.players[0]["matched"].length - 1;
          let reverseIndex = lastIndex - index;
          if (reverseIndex === lastIndex) {
            return (
              <ResultsRow
                round={reverseIndex + 1}
                matched={this.props.players[0]["matched"][reverseIndex]}
                moves={this.props.players[0]["moves"][reverseIndex]}
                className={"current-round"}
                key={`Round-${reverseIndex + 1}`}
                multiplayer={false}
              />
            );
          } else {
            return (
              <ResultsRow
                round={reverseIndex + 1}
                matched={this.props.players[0]["matched"][reverseIndex]}
                moves={this.props.players[0]["moves"][reverseIndex]}
                className={"prev-rounds"}
                key={`Round-${reverseIndex + 1}`}
                multiplayer={false}
              />
            );
          }
        })
      ) : this.props.currentPlayer === numOfPlayers ||
        this.props.clickSource === "results-navbar" ? (
        // Generate results for multiplayer at the end of each round or when the results button is clicked
        this.props.players.map((player, index) => {
          return roundWinner.includes(index + 1) ? (
            // If player is the winner of the round, the row will be highlighted.
            // No row will be highlighted if user select results for the ongoing level.
            <ResultsRow
              matched={player["matched"][currentRoundIndex]}
              moves={player["moves"][currentRoundIndex]}
              key={`player${index}`}
              round={index + 1}
              className={
                this.props.round === this.state.selectedLevel &&
                this.props.clickSource === "results-navbar"
                  ? "prev-rounds"
                  : "current-round"
              }
              multiplayer={true}
            />
          ) : (
            // If player is not the winner, set a different colour for player's results row
            <ResultsRow
              matched={player["matched"][currentRoundIndex]}
              moves={player["moves"][currentRoundIndex]}
              key={`player${index}`}
              round={index + 1}
              className="prev-rounds"
              multiplayer={true}
            />
          );
        })
      ) : (
        // Generate results for multiplayer after each player's turn.
        // Does not include the last player.
        <ResultsRow
          matched={
            this.props.players[currentPlayerIndex]["matched"][currentRoundIndex]
          }
          moves={
            this.props.players[currentPlayerIndex]["moves"][currentRoundIndex]
          }
          key={`player${currentPlayerIndex}}`}
          round={this.props.currentPlayer}
          className={"prev-rounds"}
          multiplayer={true}
        />
      );
    const resultStatement =
      this.props.numOfPlayers > 1 &&
      this.props.currentPlayer === this.props.numOfPlayers
        ? generateResults(this.props.roundWinners)
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
                : this.props.numOfPlayers > 1 &&
                  this.props.currentPlayer === this.props.numOfPlayers
                ? resultStatement
                : this.props.roundStatus === "lose"
                ? "Time's Up! You lose!"
                : "Congratulations!"}
            </Typography>
          </Grid>
          {this.props.clickSource === "results-navbar" &&
          this.props.numOfPlayers > 1 ? (
            <LevelSelect
              currentRound={this.props.round}
              onChange={this.handleSelectChange}
              value={this.state.selectedLevel}
            />
          ) : this.props.clickSource === "results-navbar" ? null : (
            <Grid item xs={12}>
              <Typography style={{ fontWeight: 700, color: "#7191A5" }}>
                Results
              </Typography>
            </Grid>
          )}
        </Grid>
        <Grid container justifyContent="center" sx={{ mb: 2 }}>
          {this.props.numOfPlayers === 1 ? (
            <ResultsPagination results={results} />
          ) : (
            results
          )}
        </Grid>
      </>
    );
  }
}

export default ResultsContainer;
