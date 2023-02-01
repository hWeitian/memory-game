import React from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Typography, Grid, Container, Box } from "@mui/material";
import Board from "./Components/Board";
import { generateID, updateWinner, resetPlayersInfo } from "./utlis";
import CurrentResults from "./Components/CurrentResults";
import Header from "./Components/Header";
import CustomModal from "./Components/CustomModal";
import Rules from "./Components/Rules";
import ResultsContainer from "./Components/ResultsContainer";
import PlayersSelection from "./Components/PlayersSelection";
import MultiplayerScore from "./Components/MultiplayerScore";

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
          roundsWon: 0,
        },
      ],
      currentPlayer: 1,
      clickedTiles: [],
      matchedTiles: [],
      disable: "auto",
      roundStatus: "selection",
      displayModal: false,
      displayModalSource: "default",
      roundWinners: [],
      // timer: 1000000,
      // timer: 10000,
      timer: 40000,
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
    this.updatePlayerInfo(this.state.currentPlayer, "matched");
    const roundCompleted = this.checkRoundCompleted();

    if (roundCompleted) {
      if (
        this.state.numOfPlayers > 1 &&
        this.state.currentPlayer === this.state.numOfPlayers
      ) {
        const [winners, newPlayersArr] = updateWinner(
          this.state.currentRound,
          this.state.players
        );
        this.setState({
          players: newPlayersArr,
          displayModal: true,
          roundStatus: "win",
          roundWinners: winners,
        });
      } else {
        this.setState({
          displayModal: true,
          roundStatus: "win",
        });
      }
    }

    this.setState((prevState) => ({
      matchedTiles: [...prevState.matchedTiles, prevState.clickedTiles[0], id],
      clickedTiles: [],
      disable: "auto",
    }));
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
        setTimeout(() => this.updateMatched(id), 500);
      } else {
        setTimeout(() => this.clearClickedTiles(), 700);
      }
    } else {
      this.setState((prevState) => ({
        clickedTiles: [...prevState.clickedTiles, id],
        disable: "auto",
        roundStatus: "playing",
      }));
    }
  };

  handleModalClose = () => {
    this.setState({
      displayModal: false,
      displayModalSource: "default",
    });
  };

  handleModalOpen = (source) => {
    this.setState({
      displayModal: true,
      displayModalSource: source,
    });
  };

  handleTimesUp = () => {
    const currentMatchedTiles =
      this.state.players[this.state.currentPlayer - 1]["matched"][
        this.state.currentRound - 1
      ];

    const totalTiles = this.state.idArray.length - 1;

    if (
      this.state.numOfPlayers > 1 &&
      this.state.currentPlayer === this.state.numOfPlayers
    ) {
      const [winners, newPlayersArr] = updateWinner(
        this.state.currentRound,
        this.state.players
      );
      this.setState({
        players: newPlayersArr,
        roundWinners: winners,
      });
    }

    if (currentMatchedTiles !== totalTiles) {
      this.setState({
        roundStatus: "lose",
        displayModal: true,
      });
    }
  };

  updateRound = () => {
    const maxRounds = 90;
    if (this.state.currentRound + 1 > maxRounds) {
      this.setState({
        roundStatus: "end game",
        displayModal: true,
        displayModalSource: "end game",
      });
      return;
    }

    const newPlayersArr = [...this.state.players];

    newPlayersArr.forEach((player) => {
      player["matched"].push(0);
      player["moves"].push(0);
    });

    this.setState((prevState) => ({
      idArray: generateID(prevState.currentRound + 1),
      currentRound: (prevState.currentRound += 1),
      currentPlayer: 1,
      players: newPlayersArr,
      clickedTiles: [],
      matchedTiles: [],
      disable: "auto",
      roundStatus: "new game",
      displayModal: false,
      timer: (prevState.timer += 15000),
    }));
  };

  resetRound = () => {
    const newPlayersArr = resetPlayersInfo(
      [...this.state.players],
      this.state.roundWinners
    );

    const currentRound = this.state.currentRound;
    this.setState({
      idArray: generateID(currentRound),
      players: newPlayersArr,
      clickedTiles: [],
      matchedTiles: [],
      disable: "auto",
      roundStatus: "new game",
      displayModal: false,
      displayModalSource: "default",
      currentPlayer: 1,
    });
  };

  resetGame = () => {
    this.setState({
      idArray: generateID(1),
      currentRound: 1,
      numOfPlayers: 1,
      players: [
        {
          moves: [0],
          matched: [0],
          roundsWon: 0,
        },
      ],
      currentPlayer: 1,
      clickedTiles: [],
      matchedTiles: [],
      disable: "auto",
      roundStatus: "selection",
      displayModal: false,
      displayModalSource: "default",
      roundWinners: [],
      timer: 40000,
    });
  };

  setNumOfPlayers = (num) => {
    const playersArr = [];
    for (let i = 0; i < num; i += 1) {
      playersArr.push({
        moves: [0],
        matched: [0],
        roundsWon: 0,
      });
    }
    num = Number(num);
    this.setState({
      numOfPlayers: num,
      players: playersArr,
      roundStatus: "start",
    });
  };

  switchPlayer = () => {
    this.setState((prevState) => ({
      idArray: generateID(prevState.currentRound),
      currentRound: prevState.currentRound,
      currentPlayer: (prevState.currentPlayer += 1),
      clickedTiles: [],
      matchedTiles: [],
      disable: "auto",
      roundStatus: "new game",
      displayModal: false,
      timer: prevState.timer,
    }));
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          {this.state.roundStatus === "selection" ? (
            <PlayersSelection setNumOfPlayers={this.setNumOfPlayers} />
          ) : (
            <Container sx={{ pt: 2, pb: 0 }}>
              <Header displayModal={this.handleModalOpen} />
              <Grid
                container
                sx={{
                  mb: 4.375,
                  mt: 7.5,
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                <CurrentResults
                  players={this.state.players}
                  currentPlayer={this.state.currentPlayer}
                  currentRound={this.state.currentRound}
                  timer={this.state.timer}
                  handleTimesUp={this.handleTimesUp}
                  roundStatus={this.state.roundStatus}
                  isModalShown={this.state.displayModal}
                />
              </Grid>
              <Grid container>
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
              </Grid>
              {this.state.numOfPlayers > 1 ? (
                <Grid container mt={5} p={3}>
                  <MultiplayerScore
                    players={this.state.players}
                    currentPlayer={this.state.currentPlayer}
                  />
                </Grid>
              ) : null}
              <Grid container>
                <CustomModal
                  open={this.state.displayModal}
                  handleResultsClose={this.handleModalClose}
                  updateRound={this.updateRound}
                  resetRound={this.resetRound}
                  resetGame={this.resetGame}
                  switchPlayer={this.switchPlayer}
                  clickSource={this.state.displayModalSource}
                  roundStatus={this.state.roundStatus}
                  numOfPlayers={this.state.numOfPlayers}
                  currentPlayer={this.state.currentPlayer}
                >
                  {this.state.displayModalSource === "rules" ? (
                    <Rules />
                  ) : this.state.displayModalSource === "reset-game" ? (
                    <Typography>
                      This will delete all game records.
                      <br />
                      Are you sure you want to continue?
                    </Typography>
                  ) : this.state.displayModalSource === "reset-round" ? (
                    <Typography>
                      This will reset the current level.
                      <br />
                      Are you sure you want to continue?
                    </Typography>
                  ) : this.state.roundStatus === "end game" ? (
                    <Box mb={2}>
                      <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Congratulations!
                      </Typography>
                      <Typography>
                        You have completed the final round. <br />
                        Please click on New Game to replay!
                      </Typography>
                    </Box>
                  ) : (
                    <ResultsContainer
                      players={this.state.players}
                      numOfPlayers={this.state.numOfPlayers}
                      round={this.state.currentRound}
                      roundStatus={this.state.roundStatus}
                      clickSource={this.state.displayModalSource}
                      currentPlayer={this.state.currentPlayer}
                      roundWinners={this.state.roundWinners}
                    />
                  )}
                </CustomModal>
              </Grid>
            </Container>
          )}
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
