import React from "react";
import Countdown from "react-countdown";

class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: Date.now() + this.props.timer,
      numOfUpdates: 0,
      newRound: false,
    };
    this.countdownRef = React.createRef();
  }

  startTimer = () => {
    this.countdownRef.current.api.start();
  };

  pauseTimer = () => {
    this.countdownRef.current.api.pause();
  };

  componentDidUpdate() {
    if (
      this.state.numOfUpdates === 0 &&
      this.props.roundStatus === "playing" &&
      this.props.isModalShown === false
    ) {
      // Start timer when the first tile is clicked
      this.setState((prevState) => ({
        numOfUpdates: (prevState.numOfUpdates += 1),
        newRound: false,
      }));
      this.startTimer();
    } else if (
      // Pause timer when user wins the round before the timer ends
      // Pause timer when user opens modal from header
      this.props.roundStatus === "win" ||
      this.props.isModalShown === true
    ) {
      this.pauseTimer();
    } else if (
      // Resume timer when user close the modal from header
      this.props.roundStatus === "playing" &&
      this.props.isModalShown === false
    ) {
      this.startTimer();
    } else if (
      // Update the timer with new countdown duration when user proceed to the next round
      this.props.roundStatus === "new game" &&
      this.state.newRound === false
    ) {
      this.setState({
        date: Date.now() + this.props.timer,
        numOfUpdates: 0,
        newRound: true,
      });
    } else if (
      // Restart the timer with the current countdown duration when user restart the current round
      // Reset the timer when user start a new game
      (this.props.roundStatus === "start" ||
        this.props.roundStatus === "restart") &&
      (this.state.newRound === true || this.state.numOfUpdates === 1)
    ) {
      this.pauseTimer();
      this.setState({
        date: Date.now() + this.props.timer,
        numOfUpdates: 0,
        newRound: false,
      });
    }
  }

  handleComplete = () => {
    this.props.handleTimesUp();
  };

  render() {
    const Completionist = () => <span>00:00</span>;

    const renderer = (props) => {
      if (props.completed) {
        // Render a completed state
        return <Completionist />;
      } else {
        // Render a countdown
        return (
          <span>
            {props.formatted.minutes}:{props.formatted.seconds}
          </span>
        );
      }
    };

    return (
      <>
        <Countdown
          date={this.state.date}
          renderer={renderer}
          autoStart={false}
          ref={this.countdownRef}
          onComplete={this.handleComplete}
        />
      </>
    );
  }
}

export default CountdownTimer;
