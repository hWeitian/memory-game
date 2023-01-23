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
    if (this.state.numOfUpdates === 0 && this.props.roundStatus === "playing") {
      this.setState((prevState) => ({
        numOfUpdates: (prevState.numOfUpdates += 1),
        newRound: false,
      }));
      this.startTimer();
    } else if (this.props.roundStatus === "win") {
      this.pauseTimer();
    } else if (
      this.props.roundStatus === "new game" &&
      this.state.newRound === false
    ) {
      this.setState({
        date: Date.now() + this.props.timer,
        numOfUpdates: 0,
        newRound: true,
      });
    }
  }

  // componentDidMount(){
  //   this.setState({
  //     date: Date.now() + this.props.timer
  //   });
  // }

  handleComplete = () => {
    this.props.handleTimesUp();
  };

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
          onComplete={this.handleComplete}
        />
      </>
    );
  }
}

export default CountdownTimer;
