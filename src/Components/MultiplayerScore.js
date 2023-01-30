import React from "react";
import { Paper, Typography, Grid } from "@mui/material";
import MultiplayerScoreCard from "./MultiplayerScoreCard/MultiplayerScoreCard";

class MultiplayerScore extends React.Component {
  render() {
    const indexOfCurrentPlayer = this.props.currentPlayer - 1;
    return (
      <>
        <Grid container justifyContent="space-between" sx={{ gap: 1 }}>
          {this.props.players.map((player, index) => {
            return (
              <Grid item xs={2.5} key={`${index}`}>
                <MultiplayerScoreCard
                  playerNum={index + 1}
                  score={player["roundsWon"]}
                  className={
                    indexOfCurrentPlayer === index
                      ? "current-player"
                      : "normal-player"
                  }
                  elevation={indexOfCurrentPlayer === index ? 16 : 2}
                />
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  }
}

export default MultiplayerScore;
