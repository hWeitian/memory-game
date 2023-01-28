import React from "react";
import Tiles from "./Tiles/Tiles";
import "./Tiles/Tiles.css";
import { Grid, Container, Box } from "@mui/material";

class Board extends React.Component {
  handleClick = (id) => {
    this.props.handleTilesClicked(id);
  };

  calculateLayout = (numOfTiles) => {
    let width = 6;
    let flex = "1 0 23%";
    if (numOfTiles > 12) {
      if (numOfTiles % 5 === 0) {
        width = 8;
        flex = "1 0 18%";
      } else if (numOfTiles % 6 === 0) {
        width = 9;
        flex = "1 0 14%";
      }
    }
    return [width, flex];
  };

  render() {
    const numOfTiles = this.props.idArray.length;
    const [customWidth, flex] = this.calculateLayout(numOfTiles);

    return (
      <>
        <Grid container justifyContent="center">
          <Grid item md={customWidth} xs={12}>
            <Grid container justifyContent="center" gap={1} wrap="wrap">
              {this.props.idArray.map((obj, index) =>
                this.props.matchedTiles.includes(obj["uniqueId"]) ? (
                  <Tiles
                    key={`${index}-${obj["uniqueId"]}`}
                    id={obj["uniqueId"]}
                    visibility="visible"
                    onClick={this.handleClick}
                    className="animate__bounceIn tile-matched"
                    pointerEvents={this.props.disable}
                    image={obj["image"]}
                    flex={flex}
                  />
                ) : this.props.clickedTiles.includes(obj["uniqueId"]) ? (
                  <Tiles
                    key={`${index}-${obj["uniqueId"]}`}
                    id={obj["uniqueId"]}
                    visibility="visible"
                    onClick={this.handleClick}
                    className="animate__flipInY tile-open"
                    pointerEvents="none"
                    image={obj["image"]}
                    flex={flex}
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
                    flex={flex}
                  />
                )
              )}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Board;
