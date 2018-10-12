import React, { Component } from 'react';
import logo from '../logo.svg';
import '../styles/App.css';
import loadedQuestions from '../questions.json';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    this.setState({
      questions: loadedQuestions.questions,
    });
  }

  render() {
    const { questions } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Sigge och Zelda
            är bäst
          </p>
        </header>
        <div>
          <h2>Sigge och Zelda är bäst</h2>
          <ul>
            {questions.map(q => (
              <li key={q.question}>
                {q.question}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
