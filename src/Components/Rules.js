import React from "react";
import { Typography } from "@mui/material";

class Rules extends React.Component {
  render() {
    return (
      <>
        <Typography variant="h6">Rules</Typography>
        <ul
          style={{
            fontSize: "0.9rem",
            textAlign: "left",
            margin: "20px 0",
          }}
        >
          <li>
            The aim of this game is to match pairs of cards within the given
            time limit with as little moves as possible.
          </li>
          <li>
            All cards are placed face down at the start of each round, player
            will have to click on each card to reveal the card content.
          </li>
          <li>
            After revealing every 2 cards, if the images on both cards does not
            match, the cards will be flipped back.
          </li>
        </ul>
      </>
    );
  }
}

export default Rules;
