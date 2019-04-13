import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Timer extends Component {
  constructor(props) {
    super(props);
    const { startValueInSeconds } = this.props;
    this.state = {
      secondsRemaining: startValueInSeconds
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentDidUpdate(prevProps) {
    const { addSecondsAmount, reset, startValueInSeconds } = this.props;
    const { secondsRemaining } = this.state;
    if (reset !== prevProps.reset) {
      setInterval(
        this.setState({
          secondsRemaining: startValueInSeconds
        }),
        10000
      );
    }
    if (addSecondsAmount !== prevProps.addSecondsAmount) {
      this.setState({
        secondsRemaining: secondsRemaining + addSecondsAmount
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const { secondsRemaining } = this.state;
    const { onComplete, running } = this.props;
    if (running) {
      this.setState({
        secondsRemaining: secondsRemaining - 1
      });
      if (secondsRemaining - 1 <= 0) {
        return onComplete();
      }
    }
  }

  render() {
    const { secondsRemaining } = this.state;
    return <div>{`Timer: ${secondsRemaining}`}</div>;
  }
}

Timer.propTypes = {
  addSecondsAmount: PropTypes.number,
  onComplete: PropTypes.func,
  reset: PropTypes.string,
  running: PropTypes.bool,
  startValueInSeconds: PropTypes.number
};

Timer.defaultProps = {
  addSecondsAmount: 0,
  onComplete: () => 'Timer reached zero and stopped.',
  reset: '0',
  running: true,
  startValueInSeconds: 15
};

export default Timer;
