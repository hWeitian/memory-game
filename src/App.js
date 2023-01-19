import React from "react";
import logo from "./logo.png";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Typography } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "'Baloo 2', cursive;",
  },
});

class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <Typography>
              Edit <code>src/App.js</code> and save to reload.
            </Typography>
          </header>
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
