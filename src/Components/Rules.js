import React from "react";
import { Typography } from "@mui/material";

const style = {
  fontSize: "0.9rem",
  textAlign: "left",
  margin: "20px 0",
};

class Rules extends React.Component {
  render() {
    return (
      <>
        <Typography variant="h5">How to Play</Typography>
        <ul style={style}>
          <li>
            The goal of this game is to match pairs of cards within the given
            time limit with as few moves as possible.
          </li>
          <li>
            All cards are placed face down at the start of each round, the
            player will have to click on each card to reveal the card content.
          </li>
          <li>
            After revealing every two cards, cards will be flipped back if the
            images on both cards do not match.
          </li>
        </ul>
        <Typography variant="h6" sx={{ textAlign: "left" }}>
          Multiplayer
        </Typography>
        <ul style={style}>
          <li>Players take turns to play each round.</li>
          <li>
            The player who matched the most cards with the least number of moves
            is the winner of the round.
          </li>
          <li>The player who won the most rounds is the winner of the game.</li>
        </ul>
      </>
    );
  }
}

export default Rules;
