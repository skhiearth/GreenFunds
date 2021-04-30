import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import styles from './App.module.css';
import Footer from './Footer'
import GreenFunds from '../abis/GreenFunds.json'
import { Navigation } from ".";
import { TrinityRingsSpinner } from 'react-epic-spinners'
import bg from '../UI/rupee.png'
import newfund from '../UI/NewFund.png'
import apply from '../UI/apply.png'
import issue from '../UI/issue.png'
import monitor from '../UI/monitor.png'
import help from '../UI/help.png'
import walletBg from '../UI/walletBg.png'
import Portis from '@portis/web3';
import greenfunds from '../UI/GreenFunds.png'

const style = {
  content: {
    height: 800,
    backgroundColor: "rgba(247, 247, 248, 1.0)",
    color: "white",
    padding: 7,
    margin: 12,
    borderRadius: 20,
  }
}

class NewFund extends Component {

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
    const portis = new Portis('27e06da1-91de-4dc2-8589-c7cc820e9cef', 'ropsten');
    const web3 = new Web3(portis.provider);
    // const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = GreenFunds.networks[networkId]

    if(networkData) {
      const greenFunds = new web3.eth.Contract(GreenFunds.abi, networkData.address)
      this.setState({ greenFunds })
      
      const fundCount = await greenFunds.methods.fundCount().call()
      const requestCount = await greenFunds.methods.requestsCount().call()

      this.setState({ fundCount })
      this.setState({ requestCount })
      const balance = await web3.eth.getBalance(accounts[0])
      this.setState({ balance })

      this.setState({ loading: false})

      // for (var j = 0; j < 1000; j++) {
      //   const req = await blockCred.methods.requests(j).call()
      //   if(req.studentId === this.state.account){
      //     this.setState({ loading: false})
      //       if(req.approved === true){
      //          this.setState({ notrequest: false })
      //           this.setState({
      //               requests: [...this.state.requests, req]
      //           })
      //       }
      //   }
      // }

      this.setState({ loading: false})

    } else {
      window.alert('greenFunds contract not deployed to detected network.')
    }
  }

  createFund(name, detail, amount) {
    this.setState({ loading: true })
    this.state.greenFunds.methods.newFund(name, detail).send({ from: this.state.account, value: amount})
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      console.log(this.state.loading)
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      emi: 0,
      account: '',
      greenFunds: null,
      fundCount: 0,
      loans: [],
      requestCount: 0,
      requests: [],
      loading: true,
      notrequest: true,
      readError: null,
      writeError: null
    }

    this.createFund = this.createFund.bind(this)
  }

  render() {
    return (
      <div styles={{ backgroundImage:`url(${bg})`}}>
        { this.state.loading
          ? 
          <div className="center mt-19">
          <div style={{height: 40, backgroundImage: "url(" + greenfunds + ")", backgroundPosition: 'left', backgroundSize: "contain",
                  backgroundRepeat: 'no-repeat', resizeMode: 'contain'}}>
                  </div>
              <TrinityRingsSpinner
                style={{width: "100%"}}
                color='#251F82'
                size='200'
	            />
                <div style={{paddingTop: 10, textAlign: "center", fontSize: 12, fontWeight: 600, color: "black"}}>This may take a minute...</div>
                <Footer />
            </div>
          : 
          <div className={styles.grad}>
            <div class="row">


            <div class="col-lg-4 col-md-4 col-sm-4 col-4" >
                <div style={style.content}>
                <a href="/">
                  <div style={{height: 40, backgroundImage: "url(" + greenfunds + ")", backgroundPosition: 'left', backgroundSize: "contain",
                  backgroundRepeat: 'no-repeat', resizeMode: 'contain'}}>
                  </div>
                </a>
                  <p></p>
                  <hr></hr>
                  <div style={{padding: 16, fontSize: 12, fontWeight: 600, color: "black"}}>Logged in as: {this.state.account}</div>

                  <div style={{height: 80, margin: 10, marginBottom: 16, backgroundImage: "url(" + walletBg + ")",
                  backgroundPosition: 'center', backgroundSize: "contain",
                    backgroundRepeat: 'no-repeat', resizeMode: 'contain'}} className={styles.buttonBox}>
                    <div style={{paddingLeft: 110, paddingTop: 28}}
                    className={styles.boxText}>
                    Balance: ETH {window.web3.utils.fromWei(this.state.balance)}
                    </div>
                  </div>

                  <div style={{height: 10, margin: 18}}></div>

                  <div className={styles.verifyMid} style={{marginBottom: 8}}>Quick Actions</div>

                  <div class="row" style={{marginLeft: 42}}>
                    <a href="/newfund" class="btn btn-outline-success col-3" style={{height: 100, width: 40, backgroundImage: "url(" + newfund + ")", backgroundPosition: 'center', backgroundSize: "contain",
                    backgroundRepeat: 'no-repeat', resizeMode: 'contain', margin: 6, marginBottom: 6,
                    borderRadius: 10, boxShadow: "0px 0px 5px #D2D3D8"}}>
                    </a>
                    <a href="/apply" class="btn btn-light col-3" style={{height: 100, width: 40, backgroundImage: "url(" + apply + ")", backgroundPosition: 'center', backgroundSize: "contain",
                    backgroundRepeat: 'no-repeat', resizeMode: 'contain', margin: 6,
                    borderRadius: 10, boxShadow: "0px 0px 5px #D2D3D8"}}>
                    </a>
                    <a href="/issue" class="btn btn-light col-3" style={{height: 100, width: 40, backgroundImage: "url(" + issue + ")", backgroundPosition: 'center', backgroundSize: "contain",
                    backgroundRepeat: 'no-repeat', resizeMode: 'contain', margin: 6, marginBottom: 6,
                    borderRadius: 10, boxShadow: "0px 0px 5px #D2D3D8"}}>
                    </a>
                  </div>

                  <div class="row" style={{marginLeft: 42}}>
                    <a href="/browse" class="btn btn-light col-3" style={{height: 100, width: 40, backgroundImage: "url(" + monitor + ")", backgroundPosition: 'center', backgroundSize: "contain",
                    backgroundRepeat: 'no-repeat', resizeMode: 'contain', margin: 6,
                    borderRadius: 10, boxShadow: "0px 0px 5px #D2D3D8"}}>
                    </a>
                    <a href="/about" class="btn btn-light col-3" style={{height: 100, width: 40, backgroundImage: "url(" + help + ")", backgroundPosition: 'center', backgroundSize: "contain",
                    backgroundRepeat: 'no-repeat', resizeMode: 'contain', margin: 6,
                    borderRadius: 10, boxShadow: "0px 0px 5px #D2D3D8"}}>
                    </a>
                  </div>

                </div>
                
              </div>

              <div class="col-lg-8 col-md-8 col-sm-8 col-8">
              <Navigation account={this.state.account}/>
                <div style={{marginTop: 40, height: 600, backgroundImage: "url(" + bg + ")", backgroundPosition: 'center', backgroundSize: "contain",
              backgroundRepeat: 'no-repeat', resizeMode: 'contain'}}>
                  <div className={styles.verifyUpperMid}
                  style={{paddingTop:80, paddingLeft: 40}}>New Fund</div>

                  <p className={styles.desc}
                  style={{paddingTop:20, paddingLeft: 40, paddingRight: 30}}>
                    Create a new green fund. Directly pledge funds towards your company's green initiatives - a right step towards carbon neutrality. Funds issued on the platform
                    use the powerful Ethereum blockchain for transactions, transparency and accountability, while offering a community to reach verified NGOs and activists who are
                    best suited to utilise these funds. Transparency of the blockchain allows your company to be accountable and representative of your green initiatives.
                  </p>
                    
                    <div style={{margin: 40, marginRight: 220}}>
                        <form onSubmit={(event) => {
                            event.preventDefault()
                            const name = this.fundName.value
                            const content = this.fundDetails.value
                            const value = this.fundValue.value
                            this.createFund(name, content, window.web3.utils.toWei(value.toString(), 'Ether'))
                        }}>
                            <div className="form-group">
                            <input
                                id="loanDetail"
                                type="text"
                                ref={(input) => { this.fundName = input }}
                                className="form-control"
                                placeholder="Name of the fund"
                                required />
                            <input
                                id="loanDetail"
                                type="text"
                                ref={(input) => { this.fundDetails = input }}
                                className="form-control"
                                placeholder="Brief details about the fund"
                                required />
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">ETH</span>
                                </div>
                                <input
                                    id="loanValue"
                                    type="text"
                                    ref={(input) => { this.fundValue = input }}
                                    className="form-control"
                                    placeholder="Total value of this fund?"
                                    required />
                            </div>
                            
                            <button type="submit" className="btn btn btn-outline-primary">Create New Fund</button>
                        </form>
                    </div>
                    <Footer />
                </div>
                
              </div>
              
            </div>
            
          </div>
        }
      </div>
    );
  }
}

export default NewFund;
