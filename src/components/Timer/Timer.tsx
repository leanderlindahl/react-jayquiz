import React, { Component } from 'react';

export interface TimerProps {
  addSecondsAmount: number;
  onComplete(): void;
  reset: string;
  running: boolean;
  startValueInSeconds: number;
}

export interface TimerState {
  secondsRemaining: number;
}

interface Timer {
  timerID: any;
}

class Timer extends Component<TimerProps, TimerState> {
  static defaultProps = {
    addSecondsAmount: 0,
    onComplete: () => 'Timer reached zero and stopped.',
    reset: '0',
    running: true,
    startValueInSeconds: 15
  };

  state = {
    secondsRemaining: this.props.startValueInSeconds
  };

  public componentDidMount() {
    console.log('componentDidMount');
    this.timerID = setInterval(() => {
      this.tick();
    }, 1000);
  }

  public componentDidUpdate(prevProps: TimerProps, prevState: TimerState) {
    const { addSecondsAmount, reset, startValueInSeconds } = this.props;
    const { secondsRemaining } = this.state;

    if (reset !== prevProps.reset) {
      this.setState({ secondsRemaining: startValueInSeconds });
    }

    if (addSecondsAmount !== prevProps.addSecondsAmount) {
      this.setState({
        secondsRemaining: secondsRemaining + addSecondsAmount
      });
    }
  }

  public componentWillUnmount() {
    clearInterval(this.timerID);
  }

  public tick() {
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

  public render() {
    const { secondsRemaining } = this.state;
    return <div>{`Timer: ${secondsRemaining}`}</div>;
  }
}

export default Timer;
