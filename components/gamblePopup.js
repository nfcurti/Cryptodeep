import React from 'react';
import { PaginatedList } from 'react-paginated-list';
import ServiceCookies from '../services/cookies';
import ServiceAuth from '../services/ServiceAuth';
import Translator from '../services/translator';
export default class WithdrawPopup extends React.Component {
 
  constructor() {
    super();
    this.state = {
      history: [],
      formController: {
          targetprice: ''
      }
    }
  }

  componentDidMount() {
    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['cktoken'] == null) { return; }
    ServiceAuth.getpredictions({
      "token": userCookies['cktoken']
    }).then(response => {
      const dataC = response.data;
      console.log(dataC.data.items);
      this.setState({
        history: dataC.data.items
      })
    }).catch(e => {
      console.log(e);
      alert(e);
      return;
    })
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    const controller = this.state.formController;
    controller[name] = value;
    this.setState({
      formController: controller
    })
  }

  sendPredPressed = () => {
    if(this.state.formController.targetprice == '') {
      return;
    }

    if(this.state.formController.targetprice == 0) {
      return;
    }

    if(isNaN(this.state.formController.targetprice)) {
      return alert('Price should be a number');
    }

    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null || userCookies['cktoken'] == null) {
        window.location.replace(`/login`)
    }else{

        ServiceAuth.playprediction({
            "token": userCookies['cktoken'],
            "targetprice": this.state.formController.targetprice,
          }).then(response => {
            const data = response.data;
            console.log(data);
            alert('Played successfuly! Wait until sunday to see your result');
          }).catch(e => {
            var _content = 'You already played this game! Wait until sunday to see your result';
            console.log(e.message);
            if(e.response.status == 404 || e.response.status == 401) {
              _content = 'Error while playing prediction'
            }
            alert(_content);
            return;
          })
    }
  }
 
    render() {
        return (
            <>
            <h4 className='withdrawTitle'>Gamble your Faucet</h4>
            <p className='withdrawTitle predictRules'>Try your luck and win 2 additional faucets!</p>
            <div className='wheeler' style={{marginBottom:'2em'}}>
                <div style={{float:'left'}} className="withdrawalForm">
                  <select disabled name="currency" id="currency" className='selectCrypto predictShow' >
                      <option value="faucetQty">2 Faucets</option>
                    </select>
                    <img className='wallet-svg' style={{width:'1.2em', padding:'8px 35px', opacity:'1'}} src={'images/cryptodeep_asset_6.png'} />
                    
                    <div className="toggle-container">

                      <input type="checkbox" />
                      <div className="slider round"></div>
                    </div>   
                 <button onClick={() => this.sendPredPressed()} className='crypto-status-btn csb-withdraw withdrawFinal predictionFinal'>Gamble your faucet -></button>
     
                </div>
                <div style={{float:'left'}} className="wheelContainer"></div>
            </div>
            <table className='bp-table wallet-table predictTable gambleT'>
 
              <thead>
              <tr>
                <th style={{textTransform: 'uppercase'}}>DATE</th>
                <th style={{textTransform: 'uppercase'}}>RESULT</th>
              </tr>
              </thead>
              <tbody>
                                <tr>
                  <td className='textCenter ' style={{}}><p>01/01/2021</p></td>
                  <td className='textCenter ' style={{}}><p className='crypto-status-btn victory'>Victory (M)</p></td>
                  </tr>
                                <tr>
                  <td className='textCenter ' style={{}}><p>01/01/2021</p></td>
                  <td className='textCenter ' style={{}}><p className='crypto-status-btn defeat'>Defeat (M)</p></td>
                  </tr>
                                <tr>
                  <td className='textCenter ' style={{}}><p>01/01/2021</p></td>
                  <td className='textCenter ' style={{}}><p className='crypto-status-btn victory'>Victory (H)</p></td>
                  </tr>
              </tbody>
              </table>
          <div className='clearfix'/>
          <style jsx>{`
            .defeat{    width: fit-content;
    padding: 0.5em 1em;
    margin: auto;cursor:default}
    .victory{    width: fit-content;
    padding: 0.5em 1em;
    margin: auto;cursor:default}
            .gambleT{margin-top:1em}
                .wheelContainer{background:#161526;width:15em;height:10em}
.toggle-container {
    position: relative;
    width: 12.8em;
    height: 40px;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin-bottom:1em;
}

.toggle-container input {
  opacity: 0;
  width: 100%;
  height: 100%;
  pointer-events: all;
}

.slider {
      font-size: 0.9em;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #161526;
  transition: 0.4s;
  pointer-events: none;
}

.slider::before {
  position: absolute;
  content: "";
  height: 24px;
  width: 24px;
  left: 8px;
  bottom: 8px;
  background-color: #fff;
  transition: 0.2s;
  pointer-events: none;
}
.slider::after {
  position: absolute;
  content: "Medium Risk";
  height: 24px;
  width: auto;
  right: 1em;
  bottom: 6px;
  transition: 0.2s;
  color: #fff;
  pointer-events: none;
  font-family:"Nunito"
}

input:checked + .slider {
  background-color:red;
}

input:checked + .slider:before {
  transform: translateX(10.5em);
}

input:checked + .slider:after {
  content: "High Risk";
  left: 1em;
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

                label{
                  font-family:Nunito;
                  color:white;
                  font-weight:bold;
                  font-size:0.7em;
                  margin-left:0.4em;
                }
                .withdrawalForm{
                      width: 19em;

                  margin: auto
                }
                .withdrawFinal{
                  display:block;
                  width:17em;
                  padding: 10px;
                  margin-bottom: 2em;
                  color:white;
                  border-radius:3px;

                  background-color:#DC8614 !important;
                  font-weight:bold;
                }
                withdrawFinal:hover{
                  opacity:0.8
                }
                .terms{
                  font-family:'Nunito';
                  color:white;
                  text-align:left;
                  font-size:0.8em;
                  border:1px solid #DC8614;
                  padding:0.6em 1em;
                  border-radius:3px
 
                }
                .minWith{
                  font-family:'Nunito';
                  color:white;
                  text-align:left;
                  font-size:0.7em;
                  margin-top:-2em;
                  margin-left:0.2em;
 
 
 
                }
                .withdrawTitle{
                  font-family:'Nunito';
                  color:white;
                  text-align:center
                }
                .walletSvg{
                  width: 1.5em;
                  margin-left: -3em;
                }
                h2{
                  font-family:"Open-Sans"
                }
                Modal{
                  background-color:black
                }
                .main{
                  height:19em !important
                }
                .loutButton{
                  z-index:99999;
                  filter: invert(99%) sepia(10%) saturate(208%) hue-rotate(106deg) brightness(115%) contrast(100%);
                  margin-top: 3em;
                  /* position: absolute; */
                  right: 17%;
                }
                .loutButton:hover{
                  cursor:pointer
                }
                .security{
                  width:
                }
                .submitSecurity{
                  background-color:transparent;
                  border:1px solid #DC8614 !important;
                  width:100%
                }
                .submitSecurity:hover{
                  background-color:#DC8614;
                  cursor:pointer
                }
                .divider{
                  display:inline-block;
                  width:15%
                }
                .bp-security{
                  display:inline-block;
                }
                img{
                  width:2em;
                  position: absolute;
                  margin-left: -4em;
                  padding: 6px 12px;
                  pointer-events: none;
                  opacity:0.3;
                  }
                .selectCrypto{
                  outline:none;
                  width: 15.2em;
                  padding: 10px;
                  margin-bottom: 2em;
                  color:white;
                  border-radius:3px;
                  background-color:#161526;
                  appearance:none;
                  border:none;
                }
                input{
                  outline:none;
                  width: fill-available;
                  padding: 10px;
                  margin-bottom: 2em;
                  color:white;
                  border-radius:3px;
                  border-style:solid;
                  border: none;
                  background-color:#161526;
                  margin-top:0.3em}
                  input::placeholder{
                  color:gray;
 
                }
                .wallet-table{
                  margin-top:2em
                }
                .csb-withdraw{
                  background-color:transparent;
                  border:1px solid #DC8614 !important;
                }
                .csb-withdraw:hover{
                  background-color:#DC8614;
                  cursor:pointer
                }
                .textCenter p{
                  display:block;
                  text-align:center
                }
                .bp-h-bg {
 
                  background-image: url("/images/texture_a.png");
                  background-size: contain;
                  background-repeat: no-repeat;
                }
                .bp-middle {
                    margin: 0px;
                    width: 100%;
                    height: 400px;
                }
 
                .bp-middle-over {
                  margin: 0% 10%;
                  width: 80%;
                }
                .bp-middle-left p, .bp-middle-all p {
                  margin: 0px;
                }
                .bp-middle-left {
                  text-align: center;
                  margin-right: 12%;
                  margin-top: 30px;
                  margin-bottom: 30px;
                  width: 90%;
                  float: left;
                  height: 440px;
                  padding: 0 14px;
 
                  font-family: 'Nunito';
                  color: #FFFFFF;
                  font-weight: 400;
                  font-size: 12px;
                }
 
                .bp-center-text {
                  text-align: center;
                  margin: 0px auto;
                  width: 92%;
                  float: left;
                  padding: 10px 14px;
 
                  font-family: 'Nunito';
                  color: #FFFFFF;
                  font-weight: 400;
                  font-size: 12px;
                }
 
                .bp-middle-all {
                  text-align: center;
                  margin-bottom: 30px;
                  width: 90%;
                  float: left;
                  padding: 10px 14px;
                  padding-bottom: 30px;
 
                  font-family: 'Nunito';
                  color: #FFFFFF;
                  font-weight: 400;
                  font-size: 12px;
                }
 
                .bp-middle-left-sub {
                  text-align: center;
                  margin-right: 30px;
                  margin-top: 30px;
                  width: 38%;
                  float: left;
                  padding: 10px 14px;
                  padding-bottom: 20px;
 
                  font-family: 'Nunito';
                  color: #FFFFFF;
                  font-weight: 400;
                  font-size: 12px;
                }
 
                .bp-title {
                  padding: 6px 0px;
                  font-weight: 700;
                  font-size: 14px;
                }
 
                @media screen and (max-width: 800px){
                  .wheelContainer{width: 100%;margin:auto}
                  .wheeler{    display: grid;
    margin-bottom: 2em;
    height: 22em;position:relative
}}
                  .predictionFinal{margin:auto;margin-top:2em;margin-bottom:2em}
                  .toggle-container{margin:auto}
                  .selectCrypto{
                    margin-left:0
                  }
                  .withdrawalForm{
                    width: 18em;
                    margin: auto
                  }
                  .terms{
                    text-align: center;
                  }
                  .fiat{
                    display:none
                  }
                  .bp-middle-left, .bp-middle-left-sub {
                    width: 90%;
                  }
                  .security{
                  height:50em !important
                }
 
                .divider{
                  display:none
                }
                .bp-security{
                  display: block;
                }
                .loutButton{
                    margin-top:2em;
                    margin-right:-1em
                  }
                }
                .bp-blueshadow {
 
                  background: #252540;
                  box-shadow: 0px 0px 20px rgba(0,0,0,0.4);
                  border-radius: 4px;
                }
 
                .bp-crypto-price-item {
                  display: inline-block;
                  padding: 0px 30px;
 
                }
 
                .bp-crypto-price-item p {
                  display: flex;
                  align-items: center;
                  margin: 4px 4px;
                }
 
                .bp-crypto-price-avg-span-success {
                  color: green;
                  margin: 8px 8px;
                }
 
                .bp-crypto-price-avg-span-fail {
                  color: red;
                  margin: 8px 8px;
                }
 
                .bp-crypto-pass {
                  content:url('images/arrow_up.png');
                  width: 0.7em;
                  float: left;
                  margin-top: 7px;
                  margin-right: 4px;
                }
 
                .bp-crypto-pasf {
                  content:url('images/arrow_down.png');
                  width: 0.7em;
                  float: left;
                  margin-top: 7px;
                  margin-right: 4px;
                }
 
                .clearfix::after {
                  content: "";
                  clear: both;
                  display: table;
                }
            `}</style>
 
        </>
 
        )
    }
}