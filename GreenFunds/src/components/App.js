import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home, NewFund, Apply, Issue, About, Browse } from ".";
import GreenFunds from '../abis/GreenFunds.json'
import Web3 from 'web3';

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = GreenFunds.networks[networkId]
    if(networkData) {
      const greenFunds = new web3.eth.Contract(GreenFunds.abi, networkData.address)
      this.setState({ greenFunds })

      this.setState({ loading: false})

    } else {
      window.alert('greenFunds contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      emi: 0,
      account: '',
      greenFunds: null
    }
  }

  render() {
    return (
      <div className="App" style={{position: "absolute", left: 0, right: 0, top:0, bottom: 0}}>
        <Router>
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/newfund" exact component={() => <NewFund />} />
            <Route path="/apply" exact component={() => <Apply />} />
            <Route path="/issue" exact component={() => <Issue />} />
            <Route path="/about" exact component={() => <About />} />
            <Route path="/browse" exact component={() => <Browse />} />
          </Switch>
        </Router>
      </div>
    );
  }
  
}

export default App;