import React from "react";
import Countdown from "react-countdown";

class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: Date.now() + 10000,
      numOfUpdates: 0,
    };
    this.countdownRef = React.createRef();
  }

  startTimer = () => {
    this.countdownRef.current.api.start();
  };

  componentDidUpdate() {
    if (this.state.numOfUpdates === 0) {
      this.setState((prevState) => ({
        numOfUpdates: (prevState.numOfUpdates += 1),
      }));
      this.startTimer();
    }
  }

  render() {
    const Completionist = () => <span>Time's Up!</span>;

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
        />
      </>
    );
  }
}

export default CountdownTimer;
