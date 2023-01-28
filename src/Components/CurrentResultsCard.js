import React from "react";
import { Paper, Typography, Grid, styled } from "@mui/material";

const AlignLeft = styled("div")(({ theme }) => ({
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    textAlign: "left",
  },
}));
const AlignRight = styled("div")(({ theme }) => ({
  textAlign: "center",
  [theme.breakpoints.up("md")]: {
    textAlign: "right",
  },
}));

class CurrentResultsCard extends React.Component {
  render() {
    return (
      <>
        <Paper
          elevation={3}
          style={{ backgroundColor: "#6395B8", color: "#FCFCFC" }}
          onClick={this.handleClick}
        >
          <Grid container justifyContent="space-between" p={{ xs: 1, md: 1.5 }}>
            <Grid item xs={12} md={6}>
              <AlignLeft>
                <Typography sx={{ typography: { xs: "body1", sm: "h6" } }}>
                  {this.props.title}
                </Typography>
              </AlignLeft>
            </Grid>
            <Grid item xs={12} md={6}>
              <AlignRight>
                <Typography
                  sx={{ typography: { xs: "body1", sm: "h6" } }}
                  style={{ fontWeight: 700 }}
                >
                  {this.props.children === undefined ? 0 : this.props.children}
                </Typography>
              </AlignRight>
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  }
}

export default CurrentResultsCard;
