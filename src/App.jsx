import './App.css'
import React from 'react'
import Table from './Table'
import './TableStyle.css'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      text: "test"
    };
  }

  // promise: code that will eventually run, synchronous 
  componentDidMount() {
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson.bpi
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  update = () => {
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson.bpi
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {

    const myState = this.state.data ? Object.values(this.state.data) : [];

    const myStateSorted = myState.sort(
      (a, b) => {
        if (a.rate_float < b.rate_float) {
          return -1;
        }
        if (a.rate_float > b.rate_float) {
          return 1;
        }
        return 0;
      }
    );

    console.log(myState);
    const column = [
      { heading: "Code", value: "code" },
      { heading: "Description", value: "description" },
      { heading: "Symbol", value: "symbol" },
      { heading: "Rate", value: "rate" },
      { heading: "Rate Float", value: "rate_float" }
    ]
    return (
      <div>
        <Table data={myStateSorted} column={column} />
        <button className="button" onClick={this.update} >Update</button>
      </div>
    )
  }
}

export default App;