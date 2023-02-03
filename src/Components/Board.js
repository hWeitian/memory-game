import React from "react";
import Tiles from "./Tiles/Tiles";
import "./Tiles/Tiles.css";
import { Grid } from "@mui/material";
import { calculateLayout } from "../utlis";

class Board extends React.Component {
  handleClick = (id) => {
    this.props.handleTilesClicked(id);
  };

  render() {
    const numOfTiles = this.props.idArray.length;
    const [customWidth, flex] = calculateLayout(
      numOfTiles,
      this.props.currentRound
    );

    return (
      <>
        <Grid container justifyContent="center">
          <Grid item md={customWidth} xs={12}>
            <Grid container justifyContent="center" gap={1} wrap="wrap">
              {this.props.idArray.map((obj, index) => (
                <Tiles
                  key={`${index}-${obj["uniqueId"]}`}
                  id={obj["uniqueId"]}
                  visibility="visible"
                  onClick={this.handleClick}
                  className={
                    this.props.matchedTiles.includes(obj["uniqueId"])
                      ? "animate__bounceIn tile-matched"
                      : this.props.clickedTiles.includes(obj["uniqueId"])
                      ? "animate__flipInY tile-open"
                      : "tile-close"
                  }
                  pointerEvents={
                    this.props.clickedTiles.includes(obj["uniqueId"])
                      ? "none"
                      : this.props.disableClick
                  }
                  image={obj["image"]}
                  flex={flex}
                />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Board;
