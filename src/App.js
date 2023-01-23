import React from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Typography, Grid, Container } from "@mui/material";
import Board from "./Components/Board";
import { generateID } from "./utlis";
import CurrentResults from "./Components/CurrentResults";
import ResultsModal from "./Components/ResultsModal";

const theme = createTheme({
  typography: {
    fontFamily: "'Baloo 2', cursive;",
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idArray: generateID(1),
      currentRound: 1,
      numOfPlayers: 1,
      players: [
        {
          moves: [0],
          matched: [0],
        },
      ],
      currentPlayer: 1,
      clickedTiles: [],
      matchedTiles: [],
      disable: "auto",
      roundStatus: "start",
      showResults: false,
      timer: 30000,
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
    const indexToUpdate = this.state.currentRound - 1;
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

  checkMatched = (id) => {
    const uniqueIdOne = id.split("-")[0];
    const uniqueIdTwo = this.state.clickedTiles[0].split("-")[0];
    if (uniqueIdTwo === uniqueIdOne) {
      return true;
    }
    return false;
  };

  updateMatched = (id) => {
    const roundCompleted = this.checkRoundCompleted();

    if (roundCompleted) {
      this.setState({
        showResults: true,
        roundStatus: "win",
      });
    }

    this.setState((prevState) => ({
      matchedTiles: [...prevState.matchedTiles, prevState.clickedTiles[0], id],
      clickedTiles: [],
      disable: "auto",
    }));
    this.updatePlayerInfo(this.state.currentPlayer, "matched");
  };

  checkRoundCompleted = () => {
    const numOfMatchedTiles = this.state.matchedTiles.length;
    const numOfTiles = this.state.idArray.length;

    if (numOfMatchedTiles === numOfTiles - 2) {
      return true;
    }

    return false;
  };

  clearClickedTiles = () => {
    this.setState({
      clickedTiles: [],
      disable: "auto",
    });
  };

  startTimer = () => {
    this.setState({
      timerRunning: true,
    });
  };

  handleTilesClicked = (id) => {
    if (this.state.clickedTiles.length === 1) {
      this.updatePlayerInfo(this.state.currentPlayer, "moves");
      this.setState((prevState) => ({
        clickedTiles: [...prevState.clickedTiles, id],
        disable: "none",
      }));
      let isMatched = this.checkMatched(id);
      if (isMatched) {
        setTimeout(() => this.updateMatched(id), 600);
      } else {
        setTimeout(() => this.clearClickedTiles(), 800);
      }
    } else {
      this.setState((prevState) => ({
        clickedTiles: [...prevState.clickedTiles, id],
        disable: "auto",
        roundStatus: "playing",
      }));
    }
  };

  handleResultsClose = () => {
    this.setState({
      showResults: false,
    });
  };

  handleTimesUp = () => {
    const currentMatchedTiles =
      this.state.players[this.state.currentPlayer - 1]["matched"][
        this.state.currentRound - 1
      ];

    const totalTiles = this.state.idArray.length - 1;

    if (currentMatchedTiles !== totalTiles) {
      this.setState({
        roundStatus: "lose",
        showResults: true,
      });
    }
  };

  updateRound = () => {
    const newPlayersArr = [...this.state.players];

    newPlayersArr.forEach((player) => {
      player["matched"].push(0);
      player["moves"].push(0);
    });

    this.setState((prevState) => ({
      idArray: generateID(prevState.currentRound + 1),
      currentRound: (prevState.currentRound += 1),
      players: newPlayersArr,
      clickedTiles: [],
      matchedTiles: [],
      disable: "auto",
      roundStatus: "new game",
      showResults: false,
      timer: (prevState.timer += 20000),
    }));
  };

  resetRound = () => {
    const newPlayersArr = [...this.state.players];
    const resultLastIndex = this.state.players[0]["matched"].length - 1;
    newPlayersArr.forEach((player) => {
      player["matched"][resultLastIndex] = 0;
      player["moves"][resultLastIndex] = 0;
    });
    this.setState({
      players: newPlayersArr,
      clickedTiles: [],
      matchedTiles: [],
      disable: "auto",
      roundStatus: "new game",
      showResults: false,
    });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App" style={{ marginTop: "20px" }}>
          <Container>
            <CurrentResults
              players={this.state.players}
              currentPlayer={this.state.currentPlayer}
              currentRound={this.state.currentRound}
              timer={this.state.timer}
              handleTimesUp={this.handleTimesUp}
              roundStatus={this.state.roundStatus}
            />
            <Board
              rounds={this.state.currentRound}
              updatePlayerInfo={this.updatePlayerInfo}
              currentPlayer={this.state.currentPlayer}
              players={this.state.players}
              idArray={this.state.idArray}
              handleTilesClicked={this.handleTilesClicked}
              disable={this.state.disable}
              matchedTiles={this.state.matchedTiles}
              clickedTiles={this.state.clickedTiles}
            />
            <ResultsModal
              open={this.state.showResults}
              handleResultsClose={this.handleResultsClose}
              players={this.state.players}
              round={this.state.currentRound}
              roundStatus={this.state.roundStatus}
              updateRound={this.updateRound}
              resetRound={this.resetRound}
            />
          </Container>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
