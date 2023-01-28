import React from "react";
import "./Tiles.css";
import { Card, CardActionArea, CardContent, styled } from "@mui/material";
import "animate.css";

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
            borderRadius: "10px",
            height: "90px",
            flex: { xs: "0 0 23%", md: this.props.flex },
          }}
          className={`animate__animated ${this.props.className}`}
        >
          <CardActionArea
            sx={{ display: "flex", height: "100%", width: "100%" }}
          >
            <CardContent
              sx={{
                height: "100%",
                width: "100%",
                padding: 0,
              }}
            >
              <img
                src={require(`../../fontawesome-icons/${this.props.image}`)}
                alt="brand icons"
              />
            </CardContent>
          </CardActionArea>
        </Card>
      </>
    );
  }
}

export default Tiles;
