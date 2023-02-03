import React from "react";
import { generateRoundsArr } from "../utlis";
import { MenuItem, FormControl, Select, Grid } from "@mui/material";

class LevelSelect extends React.Component {
  render() {
    const rounds = generateRoundsArr(this.props.currentRound);
    return (
      <>
        <Grid container justifyContent="center">
          <Grid item xs={12}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <Select
                value={this.props.value}
                onChange={this.props.onChange}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                sx={{
                  p: 0,
                  borderRadius: 10,
                  backgroundColor: "#DFE7EC",
                  color: "#304859",
                  fontWeight: 700,
                  border: 0,
                }}
                SelectDisplayProps={{
                  style: { padding: "5px 20px 5px 0px" },
                }}
              >
                {rounds.map((round, index) => (
                  <MenuItem value={round} key={`${index}-${round}`}>
                    Level {round}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default LevelSelect;
