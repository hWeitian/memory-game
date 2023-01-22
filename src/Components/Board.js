import React from "react";
import Tiles from "./Tiles/Tiles";
import { Grid, Container } from "@mui/material";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedTiles: [],
      matchedTiles: [],
      disable: "auto",
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
  };

  clearClickedTiles = () => {
    this.setState({
      clickedTiles: [],
      disable: "auto",
    });
  };

  handleClick = (id) => {
    let isMatched = false;

    if (this.state.clickedTiles.length === 1) {
      this.setState((prevState) => ({
        clickedTiles: [...prevState.clickedTiles, id],
        disable: "none",
      }));
      isMatched = this.checkMatched(id);
      if (isMatched) {
        setTimeout(() => this.updateMatched(id), 1000);
      } else {
        setTimeout(() => this.clearClickedTiles(), 2000);
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
          <Grid container gap={1}>
            {this.props.idArray.map((obj, index) =>
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
