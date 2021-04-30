import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import styles from './App.module.css';
import Footer from './Footer'
import { Navigation } from ".";
import { TrinityRingsSpinner } from 'react-epic-spinners'
import bg from '../UI/leaf.png'
import borrow from '../UI/NewFund.png'
import apply from '../UI/apply.png'
import requests from '../UI/issue.png'
import monitor from '../UI/monitor.png'
import help from '../UI/help.png'
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

class About extends Component {

  async componentWillMount() {
    await this.loadWeb3()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      this.setState({ loading: false})
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
      this.setState({ loading: false})
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
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
      currentScore: 0,
      scores: [],
      readError: null,
      writeError: null
    }

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
    

                  <div style={{height: 10, margin: 18}}></div>

                  <div className={styles.verifyMid} style={{marginBottom: 8}}>Quick Actions</div>

                  <div class="row" style={{marginLeft: 42}}>
                    <a href="/newfund" class="btn btn-light col-3" style={{height: 100, width: 40, backgroundImage: "url(" + borrow + ")", backgroundPosition: 'center', backgroundSize: "contain",
                    backgroundRepeat: 'no-repeat', resizeMode: 'contain', margin: 6, marginBottom: 6,
                    borderRadius: 10, boxShadow: "0px 0px 5px #D2D3D8"}}>
                    </a>
                    <a href="/apply" class="btn btn-light col-3" style={{height: 100, width: 40, backgroundImage: "url(" + apply + ")", backgroundPosition: 'center', backgroundSize: "contain",
                    backgroundRepeat: 'no-repeat', resizeMode: 'contain', margin: 6,
                    borderRadius: 10, boxShadow: "0px 0px 5px #D2D3D8"}}>
                    </a>
                    <a href="/issue" class="btn btn-light col-3" style={{height: 100, width: 40, backgroundImage: "url(" + requests + ")", backgroundPosition: 'center', backgroundSize: "contain",
                    backgroundRepeat: 'no-repeat', resizeMode: 'contain', margin: 6, marginBottom: 6,
                    borderRadius: 10, boxShadow: "0px 0px 5px #D2D3D8"}}>
                    </a>
                  </div>

                  <div class="row" style={{marginLeft: 42}}>
                    <a href="/browse" class="btn btn-light col-3" style={{height: 100, width: 40, backgroundImage: "url(" + monitor + ")", backgroundPosition: 'center', backgroundSize: "contain",
                    backgroundRepeat: 'no-repeat', resizeMode: 'contain', margin: 6,
                    borderRadius: 10, boxShadow: "0px 0px 5px #D2D3D8"}}>
                    </a>
                    <a href="/about" class="btn btn-outline-success col-3" style={{height: 100, width: 40, backgroundImage: "url(" + help + ")", backgroundPosition: 'center', backgroundSize: "contain",
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
                  style={{paddingTop:80, paddingLeft: 40}}>About</div>

                  <p className={styles.desc}
                  style={{paddingTop:20, paddingLeft: 40, paddingRight: 30}}>
                    GreenFunds utilises transparency, security and accountability of the Ethereum and Polygon blockchains 
                    to render a platform that can be used by companies, investment banks, hedge funds and individuals to
                    pledge cryptocurrency towards their sustainability goals. Activists, NGOs and organisations active in 
                    this space can apply for these funds.
                  </p>
                    
                  <div className="content" style={{marginTop:4, paddingRight: 40, paddingLeft: 40}}>

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

export default About;
