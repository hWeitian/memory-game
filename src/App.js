import React from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { generatePairIdArray } from "./utlis";
import Board from "./Components/Board";

const theme = createTheme({
  typography: {
    fontFamily: "'Baloo 2', cursive;",
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rounds: 1,
    };
  }

  /** Function to calculate total number of tiles to display based on the current round */
  calNumOfTiles = (rounds) => {
    const baseTilesNum = 8;
    let tilesIncrement = 4;

    let totalTiles = baseTilesNum;

    for (let i = 0; i < rounds; i += 1) {
      totalTiles += tilesIncrement;
    }
    return totalTiles;
  };

  /** Function to generate an array of unique pairs of id */
  generateID = () => {
    const totalTilesRequired = this.calNumOfTiles(this.state.rounds);
    const numOfIdRequired = totalTilesRequired / 2;
    const idArray = generatePairIdArray(numOfIdRequired);
    return idArray;
  };

  render() {
    const idArray = this.generateID();
    return (
      <ThemeProvider theme={theme}>
        <div className="App" style={{ marginTop: "20px" }}>
          <Board idArray={idArray} />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
