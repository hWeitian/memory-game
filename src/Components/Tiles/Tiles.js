import React from "react";
import "./Tiles.css";
import { Card, CardActionArea, CardContent, Grid } from "@mui/material";

class Tiles extends React.Component {
  handleClick = () => {
    this.props.onClick(this.props.id);
  };

  render() {
    return (
      <>
        <Card
          onClick={this.handleClick}
          sx={{
            visibility: this.props.visibility,
            pointerEvents: this.props.pointerEvents,
          }}
        >
          <CardActionArea>
            <CardContent
              sx={{
                height: "4.375rem",
                width: "4.375rem",
                padding: 0,
              }}
              className={this.props.className}
            >
              <img src={`emoji-images/${this.props.image}`} alt="trees" />
            </CardContent>
          </CardActionArea>
        </Card>
      </>
    );
  }
}

export default Tiles;
