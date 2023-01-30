import React from "react";
import { Modal, Box, Grid } from "@mui/material";
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

class CustomModal extends React.Component {
  handleClose = (event, reason) => {
    if (reason === "backdropClick" && this.props.clickSource === "default") {
      return;
    } else if (reason === "reset-game") {
      this.props.resetGame();
    }
    this.props.handleResultsClose();
  };

  handleClick = () => {
    if (this.props.currentPlayer < this.props.numOfPlayers) {
      this.props.switchPlayer();
    } else {
      // determineWinner(this.props.currentRound, this.props.players);
      this.props.updateRound();
    }
  };

  render() {
    return (
      <>
        <Modal
          open={this.props.open}
          onClose={this.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          disableEscapeKeyDown={
            this.props.clickSource === "default" ? true : false
          }
        >
          <Box sx={style}>
            {this.props.children}
            {this.props.clickSource === "reset-game" ? (
              <>
                <Grid container justifyContent="space-around" sx={{ mt: 2 }}>
                  <Grid item xs={5}>
                    <CustomButton
                      onClick={this.handleClose}
                      className="btn btn-light-blue"
                    >
                      No
                    </CustomButton>
                  </Grid>
                  <Grid item xs={5}>
                    <CustomButton
                      onClick={() => this.handleClose("nil", "reset-game")}
                      className="btn btn-orange"
                    >
                      Yes
                    </CustomButton>
                  </Grid>
                </Grid>
              </>
            ) : this.props.clickSource === "rules" ||
              this.props.clickSource === "results-navbar" ||
              this.props.clickSource === "mobile-menu" ? (
              <CustomButton
                onClick={this.handleClose}
                className="btn btn-orange"
              >
                Close
              </CustomButton>
            ) : this.props.roundStatus === "lose" &&
              this.props.numOfPlayers === 1 ? (
              <CustomButton
                onClick={this.props.resetRound}
                className="btn btn-orange"
                style={{ marginBottom: "0.685rem" }}
              >
                Restart
              </CustomButton>
            ) : (
              <>
                {this.props.currentPlayer === this.props.numOfPlayers ? (
                  <CustomButton
                    onClick={this.props.resetRound}
                    className="btn btn-light-blue"
                    style={{ marginBottom: "0.685rem" }}
                  >
                    Restart
                  </CustomButton>
                ) : null}
                <CustomButton
                  onClick={this.handleClick}
                  className="btn btn-orange"
                >
                  {this.props.numOfPlayers === 1
                    ? "Next Level"
                    : this.props.currentPlayer < this.props.numOfPlayers
                    ? "Next Player"
                    : "Next Level"}
                </CustomButton>
              </>
            )}
          </Box>
        </Modal>
      </>
    );
  }
}

export default CustomModal;
