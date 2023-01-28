import React from "react";
import Tiles from "./Tiles/Tiles";
import "./Tiles/Tiles.css";
import { Grid, Container, Box } from "@mui/material";
import { generateID } from "../utlis";
import CurrentResults from "./CurrentResults";

class Board extends React.Component {
  handleClick = (id) => {
    this.props.handleTilesClicked(id);
  };

  render() {
    return (
      <>
        <Grid container justifyContent="center">
          <Grid item md={6} xs={12}>
            <Grid container justifyContent="center" gap={1} wrap="wrap">
              {this.props.idArray.map((obj, index) =>
                this.props.matchedTiles.includes(obj["uniqueId"]) ? (
                  <Tiles
                    key={`${index}-${obj["uniqueId"]}`}
                    id={obj["uniqueId"]}
                    visibility="visible"
                    onClick={this.handleClick}
                    className="animate__pulse animate__fast tile-matched"
                    // className="tile-matched"
                    pointerEvents={this.props.disable}
                    image={obj["image"]}
                  />
                ) : this.props.clickedTiles.includes(obj["uniqueId"]) ? (
                  <Tiles
                    key={`${index}-${obj["uniqueId"]}`}
                    id={obj["uniqueId"]}
                    visibility="visible"
                    onClick={this.handleClick}
                    className="animate__flipInY tile-open"
                    // className="tile-open"
                    pointerEvents="none"
                    image={obj["image"]}
                  />
                ) : (
                  <Tiles
                    key={`${index}-${obj["uniqueId"]}`}
                    id={obj["uniqueId"]}
                    visibility="visible"
                    onClick={this.handleClick}
                    // className="animate__bounceIn tile-close"
                    className="tile-close"
                    pointerEvents={this.props.disable}
                    image={obj["image"]}
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
