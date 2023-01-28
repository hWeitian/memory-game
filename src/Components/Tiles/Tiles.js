import React from "react";
import "./Tiles.css";
import { Card, CardActionArea, CardContent } from "@mui/material";

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
            flex: "1 0 23%",
          }}
          className={this.props.className}
          className={`animate__animated ${this.props.className}`}
          // className={`${this.state.className} ${this.props.className}`}
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
