import React from "react";
import Tiles from "./Tiles/Tiles";
import { Grid, Container } from "@mui/material";
import { generateID } from "../utlis";
import CurrentResults from "./CurrentResults";

class Board extends React.Component {
  handleClick = (id) => {
    this.props.handleTilesClicked(id);
  };

  render() {
    return (
      <>
        <Container style={{ maxWidth: "360px" }}>
          <Grid container gap={1} justifyContent="space-between">
            {this.props.idArray.map((obj, index) =>
              this.props.matchedTiles.includes(obj["uniqueId"]) ? (
                <Tiles
                  key={`${index}-${obj["uniqueId"]}`}
                  id={obj["uniqueId"]}
                  visibility="hidden"
                  onClick={this.handleClick}
                  className="tile-close"
                  pointerEvents={this.props.disable}
                  image={obj["image"]}
                />
              ) : this.props.clickedTiles.includes(obj["uniqueId"]) ? (
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
                  pointerEvents={this.props.disable}
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
