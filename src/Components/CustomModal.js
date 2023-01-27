import React from "react";
import { Modal, Box, Typography, Grid } from "@mui/material";
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
    }
    this.props.handleResultsClose();
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
            {this.props.clickSource === "rules" ||
            this.props.clickSource === "results-navbar" ||
            this.props.clickSource === "mobile-menu" ? (
              <CustomButton
                onClick={this.handleClose}
                className="btn btn-orange"
              >
                Close
              </CustomButton>
            ) : this.props.clickSource === "mobile-menu" ? null : (
              <>
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
              </>
            )}
          </Box>
        </Modal>
      </>
    );
  }
}

export default CustomModal;
