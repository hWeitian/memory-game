import React from "react";
import { Modal, Box, Typography, Container, Grid } from "@mui/material";
import ResultsRow from "./ResultsRow/ResultsRow";
import ResultsPagination from "./ResultsPagination";
import CustomButton from "./CustomButton/CustomButton";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 327,
  bgcolor: "#F2F2F2",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  borderRadius: "40px",
  padding: 3,
};

class ResultsModal extends React.Component {
  handleClose = (event, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    this.props.handleResultsClose();
  };
  render() {
    const numOfPlayers = this.props.players.length;
    const players = this.props.players;
    const results =
      numOfPlayers === 1
        ? players[0]["matched"].map((matchedCount, index) => {
            const lastIndex = players[0]["matched"].length - 1;
            let reverseIndex = lastIndex - index;
            if (reverseIndex === lastIndex) {
              return (
                <ResultsRow
                  round={reverseIndex + 1}
                  matched={players[0]["matched"][reverseIndex]}
                  moves={players[0]["moves"][reverseIndex]}
                  className={"current-round"}
                  key={`Round-${reverseIndex + 1}`}
                />
              );
            } else {
              return (
                <ResultsRow
                  round={reverseIndex + 1}
                  matched={players[0]["matched"][reverseIndex]}
                  moves={players[0]["moves"][reverseIndex]}
                  className={"prev-rounds"}
                  key={`Round-${reverseIndex + 1}`}
                />
              );
            }
          })
        : null;
    return (
      <>
        <Modal
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableEscapeKeyDown={true}
        >
          <Box sx={style}>
            <Grid container sx={{ mb: 3.75 }}>
              <Grid item xs={12}>
                <Typography
                  id="modal-modal-title"
                  variant="h5"
                  style={{ fontWeight: 700 }}
                >
                  {this.props.roundStatus === "lose"
                    ? "Time's Up! You lose!"
                    : "Congratulations!"}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography style={{ fontWeight: 700, color: "#7191A5" }}>
                  Results
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent="center" sx={{ mb: 2 }}>
              <ResultsPagination results={results} />
            </Grid>
            <CustomButton
              onClick={this.props.resetRound}
              className="btn btn-light-blue"
              style={{ marginBottom: "0.685rem" }}
            >
              Restart
            </CustomButton>
            <CustomButton
              onClick={this.props.updateRound}
              className="btn btn-orange"
            >
              Next Round
            </CustomButton>
          </Box>
        </Modal>
      </>
    );
  }
}

export default ResultsModal;
