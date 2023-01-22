import React from "react";
import Tiles from "./Tiles/Tiles";
import { Grid, Container } from "@mui/material";
import { generateID } from "../utlis";
import CurrentResults from "./CurrentResults";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedTiles: [],
      matchedTiles: [],
      disable: "auto",
      idArray: generateID(this.props.rounds),
    };
  }

  checkMatched = (id) => {
    const uniqueIdOne = id.split("-")[0];
    const uniqueIdTwo = this.state.clickedTiles[0].split("-")[0];
    if (uniqueIdTwo === uniqueIdOne) {
      return true;
    }
    return false;
  };

  updateMatched = (id) => {
    this.setState((prevState) => ({
      matchedTiles: [...prevState.matchedTiles, prevState.clickedTiles[0], id],
      clickedTiles: [],
      disable: "auto",
    }));
    this.props.updatePlayerInfo(this.props.currentPlayer, "matched");
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

  handleClick = (id) => {
    let isMatched = false;

    if (this.state.clickedTiles.length === 1) {
      this.props.updatePlayerInfo(this.props.currentPlayer, "moves");
      this.setState((prevState) => ({
        clickedTiles: [...prevState.clickedTiles, id],
        disable: "none",
      }));
      isMatched = this.checkMatched(id);
      if (isMatched) {
        setTimeout(() => this.updateMatched(id), 900);
      } else {
        setTimeout(() => this.clearClickedTiles(), 1000);
      }
    } else {
      this.setState((prevState) => ({
        clickedTiles: [...prevState.clickedTiles, id],
        disable: "auto",
      }));
    }
  };

  render() {
    return (
      <>
        <Container style={{ maxWidth: "360px" }}>
          <CurrentResults
            players={this.props.players}
            currentPlayer={this.props.currentPlayer}
            startTimer={this.state.timerRunning}
          />
          <Grid container gap={1} justifyContent="space-between">
            {this.state.idArray.map((obj, index) =>
              this.state.matchedTiles.includes(obj["uniqueId"]) ? (
                <Tiles
                  key={`${index}-${obj["uniqueId"]}`}
                  id={obj["uniqueId"]}
                  visibility="hidden"
                  onClick={this.handleClick}
                  className="tile-close"
                  pointerEvents={this.state.disable}
                  image={obj["image"]}
                />
              ) : this.state.clickedTiles.includes(obj["uniqueId"]) ? (
                <Tiles
                  key={`${index}-${obj["uniqueId"]}`}
                  id={obj["uniqueId"]}
                  visibility="visible"
                  onClick={this.handleClick}
                  className="tile-open"
                  pointerEvents="none"
                  image={obj["image"]}
                />
              ) : (
                <Tiles
                  key={`${index}-${obj["uniqueId"]}`}
                  id={obj["uniqueId"]}
                  visibility="visible"
                  onClick={this.handleClick}
                  className="tile-close"
                  pointerEvents={this.state.disable}
                  image={obj["image"]}
                />
              )
            )}
          </Grid>
        </Container>
      </>
    );
  }
}

export default Board;
