import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import styles from './App.module.css';
import Identicon from 'identicon.js';
import Footer from './Footer'
import GreenFunds from '../abis/GreenFunds.json'
import { Navigation } from ".";
import { TrinityRingsSpinner } from 'react-epic-spinners'
import bg from '../UI/applyBg.png'
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

class Apply extends Component {

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
    // const portis = new Portis('27e06da1-91de-4dc2-8589-c7cc820e9cef', 'ropsten');
    // const web3 = new Web3(portis.provider);
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
      
      const fundCount = await greenFunds.methods.fundCount().call()
      const requestCount = await greenFunds.methods.requestsCount().call()

      this.setState({ fundCount })
      this.setState({ requestCount })

      const balance = await web3.eth.getBalance(accounts[0])
      this.setState({ balance })

      // Load funds
      for (var i = 0; i < fundCount; i++) {
        const fund = await greenFunds.methods.funds(i).call()
        if(fund.funder !== this.state.account){
          this.setState({
            funds: [...this.state.funds, fund]
          })
        }
      }
      this.setState({ loading: false})

      this.setState({ loading: false})

    } else {
      window.alert('greenFunds contract not deployed to detected network.')
    }
  }

  sendApplication(id, detail, amount) {
    this.setState({ loading: true })
    this.state.greenFunds.methods.fundRequest(id, detail, amount).send({ from: this.state.account })
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
      funds: [],
      requestCount: 0,
      requests: [],
      loading: true,
      notrequest: true
    }

    this.sendApplication = this.sendApplication.bind(this)

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
                <div style={{paddingTop: 10, textAlign: "center", fontSize: 12, fontWeight: 600, color: "black"}}>Processing...</div>
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
                    <a href="/newfund" class="btn btn-light col-3" style={{height: 100, width: 40, backgroundImage: "url(" + newfund + ")", backgroundPosition: 'center', backgroundSize: "contain",
                    backgroundRepeat: 'no-repeat', resizeMode: 'contain', margin: 6, marginBottom: 6,
                    borderRadius: 10, boxShadow: "0px 0px 5px #D2D3D8"}}>
                    </a>
                    <a href="/apply" class="btn btn-outline-success col-3" style={{height: 100, width: 40, backgroundImage: "url(" + apply + ")", backgroundPosition: 'center', backgroundSize: "contain",
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
                  style={{paddingTop:80, paddingLeft: 40}}>Apply</div>

                  <p className={styles.desc}
                  style={{paddingTop:20, paddingLeft: 40, paddingRight: 30}}>
                    As an organisation, charitable trust, NGO or activist working for sustainability, ecological improvements, circular invitatives, you can submit 
                    requests to claim part of Green Funds issued by companies on the platform. A brief description and your requested amount would be sent to the issuing
                    authority, who will review and sanction your request.
                  </p>
                    
                  <div className="content" style={{marginTop:4, paddingRight: 40, paddingLeft: 40}}>
                    { this.state.funds.map((fund, key) => {
                        return(
                          <div className="card border-danger mb-3" style={{marginTop:0, paddingTop: 2}} key={key} >
                          <div className="card-header">
                          <small>{fund.fundName}</small>
                          <img
                              alt="identicon"
                              className='ml-2 float-right'
                              width='50'
                              height='50'
                              src={`data:image/png;base64,${new Identicon(fund.funder, 50).toString()}`}
                          />
                          <small className="text-muted float-right">Fund Creator: </small>
                          
                          <p></p>
                          <small style={{marginTop: -20}} className="text-muted float-right">{fund.funder.toString()}</small>
                          <small className="text-muted">Fund ID: {(fund.identity.toString())}</small>
                          <p></p>
                          <small className="text-muted">
                              Total Pledged Amount: {window.web3.utils.fromWei(fund.fundAmount.toString(), 'Ether')} ETH
                          </small>
                          </div>
                          <ul id="certificateList" className="list-group list-group-flush">
                          <li key={key} className="list-group-item py-2">
                              <small className="text-muted">Fund Description: {(fund.fundDetail.toString())}</small>
                              <p></p>
                              <small className="text-muted">Claimed Amount: {window.web3.utils.fromWei(fund.claimedAmount.toString(), 'Ether')} ETH</small>
                              <p></p>
                              <small className="text-muted">Remaining Amount: {window.web3.utils.fromWei(fund.remainingAmount.toString(), 'Ether')} ETH</small>
                          </li>

                          <form onSubmit={(event) => {
                                event.preventDefault()
                                const detail = this.descri.value
                                const value = this.requestValue.value
                                this.sendApplication(fund.identity, detail, window.web3.utils.toWei(value.toString(), 'Ether'))
                            }}>
                                <div style={{paddingTop: 14, marginLeft: 6, paddingBottom: 0}} class="input-group mb-3">
                                <input
                                    style={{marginRight: 6, marginLeft: 6, width: "50%"}}
                                    id="descri"
                                    type="text"
                                    ref={(input) => { this.descri = input }}
                                    className="form-control"
                                    placeholder="Description of your request"
                                    required />
                                <div style={{marginLeft: 6}} class="input-group-prepend">
                                    <span class="input-group-text">ETH</span>
                                </div>
                                <input
                                    style={{marginRight: 12}}
                                    id="requestValue"
                                    type="text"
                                    ref={(input) => { this.requestValue = input }}
                                    className="form-control"
                                    placeholder="Amount Required"
                                    required />
                                    <button type="submit"  style={{marginRight: 16}} className="btn btn-outline-success btn-sm float-right pt-0">Send Application</button>
                                </div>
                            </form>

                          {/* <li key={key} className="list-group-item py-2">
                            <small className="float-left mt-1 text-muted">EMI: {this.emiCalc(
                              window.web3.utils.fromWei(fund.loanAmount.toString(), 'Ether'),
                              fund.interest,
                              fund.period
                            )} ETH </small>
                          </li> */}
                          
                          </ul>
                      </div>
                        )
                    })}
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

export default Apply;
