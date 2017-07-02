import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

injectTapEventPlugin();

const Loader = () => (
  <div className="loader">
    <CircularProgress size={80} thickness={5} />
  </div>
);

const Quote = ({ text, author }) => (
  <div className="quote-container">
    <div className="quote-text">{text}</div>
    <div className="quote-author">{author}</div>
  </div>
)




class App extends React.Component {
  constructor() {
    super();
      this.state = {
        text: "",
        author: ""
      }
  }

  componentDidMount = () => {
    this.getQuote();
  }

  getQuote = () => {
    const url = "https://thesimpsonsquoteapi.glitch.me/quotes";

    fetch(url)
      .then(res => res.json())
      .catch(err => {console.log(err)})
      .then(data => {this.setState(
          () => ({
            text: data[0].quote,
            author: data[0].character
          })
        )
      })
  }

  tweetQuote = () => {
    window.open(`https://twitter.com/home?status=${this.state.text} -${this.state.author}`);
  }

  render() {
    return (
      <div>
        <h2>Random Quote Generator</h2>
        <Paper className="main-container" zDepth={2}>
          {this.state.text 
              ? <Quote text={this.state.text} author={this.state.author} /> 
              : <Loader />}
          <div className="buttons-container">
            <RaisedButton 
              primary 
              label="New quote" 
              style={{ margin: "10px"}}
              onTouchTap={this.getQuote} />
            <RaisedButton 
              primary 
              label="Tweet me" 
              style={{ margin: "10px"}}
              onTouchTap={this.tweetQuote} />
          </div>
        </Paper>
      </div>
    );
  }
}



export default App;