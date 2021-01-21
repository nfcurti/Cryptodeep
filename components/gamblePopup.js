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
      },
      mediumRisk: true,
      playing: false,
      won: false,
      done: false
    }
  }

  componentDidMount() {
    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['cktoken'] == null) { return; }
    ServiceAuth.historygamblefaucet({
      "token": userCookies['cktoken']
    }).then(response => {
      const dataC = response.data;
      console.log(dataC.data.history);
      this.setState({
        history: dataC.data.history
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
    if(this.props.userfaucetbalance == 0) {
      alert('Insufficient faucets');
      return;
    }

    var _resultGamble = false;
    var _gambleFactor = this.state.mediumRisk ? Math.floor(Math.random() * 2) + 1 : Math.floor(Math.random() * 4) + 1;
    _resultGamble = this.state.mediumRisk ? _gambleFactor % 2 == 0 : _gambleFactor == 2;
    // alert(_resultGamble);
    this.setState({
      playing: true,
      won: _resultGamble
    })
    setTimeout(() => {
      this.setState({
        playing: false,
        done: true
      })

      setTimeout(async () => {
        const userCookies = ServiceCookies.getUserCookies();
        if(userCookies['ckuserid'] == null || userCookies['cktoken'] == null) {
            alert('You need to be logged to play this game');
        }else{
            ServiceAuth.playgamblefaucet({
                "token": userCookies['cktoken'],
                'userid': userCookies['ckuserid'],
                'mediumrisk': this.state.mediumRisk ? 'true' : 'false',
                'won': _resultGamble == true ? 'true' : 'false'
              }).then(response => {
                const data = response.data;
                console.log(data);
                alert(data.message);
                window.location.reload();
              }).catch(e => {
                var _content = 'No faucets available';
                console.log(e.message);
                if(e.response.status == 404 || e.response.status == 401) {
                  _content = 'Error while playing gambling'
                }
                alert(_content);
                return;
              })
        }
      }, 1000)
    }, 7000)

    
  }
 
    render() {
        return (
            <>
            <h4 className='withdrawTitle'>{Translator.getStringTranslated('gmbl_title', this.props.currentLang, this.props.translatorData)}</h4>
            <p className='withdrawTitle predictRules'>{Translator.getStringTranslated('gmbl_messagea', this.props.currentLang, this.props.translatorData)}</p>
             <p className='withdrawTitle predictRules' style={{fontWeight:'bold', color:"#DC8614"}}>{Translator.getStringTranslated('gmbl_messageb', this.props.currentLang, this.props.translatorData)}</p>
            <div className='wheeler' style={{marginBottom:'2em'}}>
                <div style={{float:'left'}} className="withdrawalForm">
                  <select disabled name="currency" id="currency" className='selectCrypto predictShow' >
                      <option value="faucetQty">{this.props.userfaucetbalance} {Translator.getStringTranslated('global_faucetscount', this.props.currentLang, this.props.translatorData)}</option>
                    </select>
                    <img className='wallet-svg ximg' style={{width:'1.2em', padding:'8px 35px', opacity:'1'}} src={'images/cryptodeep_asset_6.png'} />
                    
                    <div className="toggle-container">

                      <input type="checkbox" onChange={(val) => {
                        this.setState({
                          mediumRisk: !val.target.checked
                        })
                      }} />
                      <div className="slider round"></div>
                    </div>   
                 <button onClick={() => this.sendPredPressed()} className='crypto-status-btn csb-withdraw withdrawFinal predictionFinal'>{Translator.getStringTranslated('global_gamble', this.props.currentLang, this.props.translatorData)}</button>
     
                </div>
                <div style={{float:'left'}} className="wheelContainer">
                  <img src='images/gamble_layer0.png' className='wheel-base'/>
                  {
                    this.state.mediumRisk ?
                    <img src={`images/gamble_layer1_medium.png`} className={`wheel-medium ${this.state.done ? (this.state.won ? 'wheelWin' : 'wheelLose') : ''}  ${this.state.playing ? 'shouldspin' : ''}`}/>
                    :
                    <img src={`images/gamble_layer1_hard.png`} className={`wheel-medium ${this.state.done ? (this.state.won ? 'wheelWin' : 'wheelLose') : ''} ${this.state.playing ? 'shouldspin' : ''}`}/>
                  }
                  <img src='images/gamble_layer2.png' className='wheel-top'/>
                </div>
            </div>
            <PaginatedList
              list={this.state.history}
              itemsPerPage={5}
              renderList={(list) => (
                <table className='bp-table wallet-table predictTable gambleT'>
 
              <thead>
              <tr>
                <th style={{textTransform: 'uppercase'}}>{Translator.getStringTranslated('global_date', this.props.currentLang, this.props.translatorData)}</th>
                <th style={{textTransform: 'uppercase'}}>{Translator.getStringTranslated('prdct_result', this.props.currentLang, this.props.translatorData)}</th>
              </tr>
              </thead>
              <tbody>
                {
                  list.map((item, id) => {
                    return (
                      <tr>
                      <td className='textCenter ' style={{}}><p>{item.created_at.split('T').join(' ').substring(0, 16)}</p></td>
                      <td className='textCenter ' style={{}}><p className={`crypto-status-btn ${item.won ? 'victory' : 'defeat'}`}>{item.won ? Translator.getStringTranslated('prdct_status_3', this.props.currentLang, this.props.translatorData) : Translator.getStringTranslated('prdct_status_2', this.props.currentLang, this.props.translatorData)} ({item.mediumRisk ? Translator.getStringTranslated('gmbl_medium', this.props.currentLang, this.props.translatorData) : Translator.getStringTranslated('gmbl_high', this.props.currentLang, this.props.translatorData) })</p></td>
                      </tr>
                    )
                  })
                }  
              </tbody>
              </table>
              )}
            />
            
          <div className='clearfix'/>
          <style jsx>{`
            .defeat{    width: fit-content;
                padding: 0.5em 1em;
                margin: auto;cursor:default}
                .victory{    width: fit-content;
                padding: 0.5em 1em;
                margin: auto;cursor:default}
                        .gambleT{margin-top:1em}
                            .wheelContainer{background:#161526;width:24em;height:16em;
    margin-bottom: 2em;}
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
                .ximg{
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
                  margin-top:7em
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
                  }
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