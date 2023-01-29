import React from "react";
import "./CustomButton.css";

class CustomButton extends React.Component {
  handleClick = () => {
    if (this.props.onClick === null) {
      return;
    } else {
      this.props.onClick();
    }
  };

  render() {
    return (
      <>
        <button
          className={this.props.className}
          onClick={this.handleClick}
          style={this.props.style}
        >
          {this.props.children}
        </button>
      </>
    );
  }
}

export default CustomButton;
