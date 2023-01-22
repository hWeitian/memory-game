import React from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Typography, Grid, Container } from "@mui/material";
import Board from "./Components/Board";

const theme = createTheme({
  typography: {
    fontFamily: "'Baloo 2', cursive;",
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rounds: 1,
      numOfPlayers: 1,
      players: [
        { moves: [0], matched: [0] },
        { moves: [0], matched: [0] },
      ],
      currentPlayer: 1,
    };
  }

  updatePlayerInfo = (player, infoType) => {
    player -= 1;
    const currentPlayers = [...this.state.players];
    const updatedPlayers = this.generateNewPlayerInfo(
      currentPlayers,
      player,
      infoType,
      1
    );

    this.setState({
      players: updatedPlayers,
    });
  };

  /**
   * Function to update a specific player's info
   * @param {array} playersArr
   * @param {number} playerIndex
   * @param {string} infoType
   * @param {number} info
   * @returns {array} Returns a new array of players state with updated info
   */
  generateNewPlayerInfo = (playersArr, playerIndex, infoType, info) => {
    const indexToUpdate = this.state.rounds - 1;
    let newInfo = Number(playersArr[playerIndex][infoType][indexToUpdate]);
    newInfo += info;
    const newPlayersArr = playersArr.map((player, index) => {
      if (index === playerIndex) {
        player[infoType][indexToUpdate] = newInfo;
        return player;
      } else {
        return player;
      }
    });
    return newPlayersArr;
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App" style={{ marginTop: "20px" }}>
          <Container>
            <Board
              rounds={this.state.rounds}
              updatePlayerInfo={this.updatePlayerInfo}
              currentPlayer={this.state.currentPlayer}
              players={this.state.players}
            />
          </Container>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
