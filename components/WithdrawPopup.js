import React from 'react';
import ServiceCookies from '../services/cookies';
import ServiceAuth from '../services/ServiceAuth';
import Translator from '../services/translator';

export default class WithdrawPopup extends React.Component {

    constructor() {
        super();
        this.state = {
            usdperpoint: 0,
            maxpoints: 0,
            minbtc: 1000,
            mineth: 1000,
            minltc: 1000,
            mintrx: 1000,
            formController: {
                currency: 'BTC',
                cryptoaddress: '',
                points: '0'
            },
            cryptoval: null,
            pointValIndex: 0
        }
      }

      handleInputChange = event => {
        const { name, value } = event.target;
        const controller = this.state.formController;
        controller[name] = value;
        this.setState({
          formController: controller
        })
      }

      componentDidMount() {
        const userCookies = ServiceCookies.getUserCookies();
            if(userCookies['ckuserid'] == null && userCookies['cktoken'] == null) {
                return;
            }else{
              ServiceAuth.getprofile({
                "token": userCookies['cktoken']
              }).then(response => {
                const data = response.data;
                console.log(data);
                this.setState({
                    maxpoints: data.user.points
                })

                ServiceAuth.getgeneralsettings({
                    "token": userCookies['cktoken']
                  }).then(response => {
                    const dataB = response.data;
                    console.log(dataB);
                    this.setState({
                        minbtc: dataB.data.settings.minbtcwithdraw,
                        mineth: dataB.data.settings.minethwithdraw,
                        minltc: dataB.data.settings.minltcwithdraw,
                        mintrx: dataB.data.settings.mintrxwithdraw,
                        pointValIndex: dataB.data.cryptoval[this.state.formController.currency].last,
                        cryptoval: dataB.data.cryptoval,
                        usdperpoint: dataB.data.settings.usdperpoint
                    })
                  }).catch(e => {
                    console.log(e);
                    alert(e);
                    return;
                  })
                
              }).catch(e => {
                console.log(e);
                alert(e);
                return;
              })
            }
      }

      _withdrawPressed = () => {
        if(this.state.formController.points.length == 0 ||
            this.state.formController.cryptoaddress.length == 0) {
                alert('One or more fields are empty');
                return;

        }

        if(isNaN(this.state.formController.points)) {
            return alert('Points to withdraw must be a number');
        }

        if(this.state.maxpoints - this.state.formController.points < 0) {
            return alert('Not enough points');
        }

        if(this.state.formController.currency == 'BTC') {
          if((this.state.formController.points * this.state.usdperpoint) < (this.state.minbtc)) {
            return alert(`The minimum amount that can be withdrawn on BTC are ${this.state.minbtc} USD`)
        }
        }else if(this.state.formController.currency == 'ETH') {
          if((this.state.formController.points * this.state.usdperpoint) < (this.state.mineth)) {
            return alert(`The minimum amount that can be withdrawn on ETH are ${this.state.mineth} USD`)
        }
        }else if(this.state.formController.currency == 'LTC') {
          if((this.state.formController.points * this.state.usdperpoint) < (this.state.minltc)) {
            return alert(`The minimum amount that can be withdrawn on LTC are ${this.state.minltc} USD`)
        }
        }else if(this.state.formController.currency == 'TRX') {
          if((this.state.formController.points * this.state.usdperpoint) < (this.state.mintrx)) {
            return alert(`The minimum amount that can be withdrawn on TRX are ${this.state.mintrx} USD`)
        }
        }
        

        const userCookies = ServiceCookies.getUserCookies();
            if(userCookies['ckuserid'] == null && userCookies['cktoken'] == null) {
                return;
            }else{
                ServiceAuth.dowithdraw({
                    "token": userCookies['cktoken'],
                    "currency": this.state.formController.currency,
                    "points": this.state.formController.points,
                    "cryptoaddress": this.state.formController.cryptoaddress,
                    "originalquant": this.state.formController.points * this.state.usdperpoint / this.state.pointValIndex 
                }).then(response => {
                    const data = response.data;
                    console.log(data);
                    window.location.replace('/account');
                }).catch(e => {
                    console.log(e);
                    alert(e);
                    return;
                })
            }

        
      }

    render() {
        return (
            <>
            <h4 className='withdrawTitle'>{Translator.getStringTranslated('global_withdraw', this.props.currentLang, this.props.translatorData)}</h4>
            <form className="withdrawalForm">
              <select name="currency" id="currency" className='selectCrypto' onChange={(val) => {
                  console.log(val.target.value);
                  var _fC = this.state.formController;
                  _fC.currency = val.target.value.toUpperCase();

                  var _newPVI = 0;

                  if(this.state.cryptoval != null) {
                    _newPVI = this.state.cryptoval[_fC.currency].last
                  }

                  this.setState({
                      formController: _fC,
                      pointValIndex: _newPVI
                  })
              }}>
                  <option value="btc">Bitcoin (BTC)</option>
                  <option value="eth">Ethereum (ETH)</option>
                  <option value="ltc">Litecoin (LTC)</option>
                  <option value="trx">Tron (TRX)</option>
                </select>
                {
                    this.state.formController.currency == 'BTC' ? 
                    <img className='wallet-svg' style={{width:'1.2em', padding:'8px 35px', opacity:'1'}} src={'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png'} />
                    : null
                }
                {
                    this.state.formController.currency == 'ETH' ? 
                    <img className='wallet-svg' style={{width:'1.2em', padding:'8px 35px', opacity:'1'}} src={'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png'} />
                    : null
                }
                {
                    this.state.formController.currency == 'LTC' ? 
                    <img className='wallet-svg' style={{width:'1.2em', padding:'8px 35px', opacity:'1'}} src={'https://en.bitcoinwiki.org/upload/en/images/thumb/c/c5/Litecoin-news.png/900px-Litecoin-news.png'} />
                    : null
                }
                {
                    this.state.formController.currency == 'TRX' ? 
                    <img className='wallet-svg' style={{width:'1.2em', padding:'8px 35px', opacity:'1'}} src={'https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/tron_trn_coin-512.png'} />
                    : null
                }
                
              <div className='inputhold' style={{marginBottom: '-1em'}}>
                <label>{Translator.getStringTranslated('acc_address', this.props.currentLang, this.props.translatorData)}</label>
                <input type='text'  placeholder={Translator.getStringTranslated('acc_youraddress', this.props.currentLang, this.props.translatorData)} name='cryptoaddress' value={this.state.formController.cryptoaddress} onChange={this.handleInputChange}/>
                <img className='walletSvg'  role="img" src="https://www.flaticon.com/svg/static/icons/svg/482/482541.svg" />
              </div>
              <div className='inputhold'>
                <label>{Translator.getStringTranslated('acc_ptw', this.props.currentLang, this.props.translatorData)}</label>
                <input type='number' value="0" name='points' value={this.state.formController.points} onChange={this.handleInputChange}/>
              </div>
              {
                    this.state.formController.currency == 'BTC' ? 
                    
                    <p className="minWith" style={{color:'#ffffff90'}}>{Translator.getStringTranslated('acc_minpoints', this.props.currentLang, this.props.translatorData).replace('%val%', this.state.minbtc)}</p>: null
                }
                {
                    this.state.formController.currency == 'ETH' ? 
                    
                    <p className="minWith" style={{color:'#ffffff90'}}>{Translator.getStringTranslated('acc_minpoints', this.props.currentLang, this.props.translatorData).replace('%val%', this.state.mineth)} </p>: null
                }
                {
                    this.state.formController.currency == 'LTC' ? 
                    
                    <p className="minWith" style={{color:'#ffffff90'}}>{Translator.getStringTranslated('acc_minpoints', this.props.currentLang, this.props.translatorData).replace('%val%', this.state.minltc)} </p>: null
                }
                {
                    this.state.formController.currency == 'TRX' ? 
                    
                    <p className="minWith" style={{color:'#ffffff90'}}>{Translator.getStringTranslated('acc_minpoints', this.props.currentLang, this.props.translatorData).replace('%val%', this.state.mintrx)} </p>: null
                }
              <p className='terms' style={{opacity: '0.5'}}>{this.state.formController.currency}: { this.state.formController.points * this.state.usdperpoint / this.state.pointValIndex }</p>
            </form>
              <p className="terms">{Translator.getStringTranslated('acc_withnext', this.props.currentLang, this.props.translatorData)} <span style={{fontWeight:'bold'}}>next sunday</span></p>
              <button onClick={() => this._withdrawPressed()} className='crypto-status-btn csb-withdraw withdrawFinal'>{Translator.getStringTranslated('global_withdraw', this.props.currentLang, this.props.translatorData)}</button>
          
          <div className='clearfix'/>
          <style jsx>{`
                label{
                  font-family:Nunito;
                  color:white;
                  font-weight:bold;
                  font-size:0.7em;
                  margin-left:0.4em;
                }
                .withdrawalForm{
                  width: 30em;
                  margin: auto
                }
                .withdrawFinal{
                  display:block;
                  width:17em;
                  padding: 10px;
                  margin-bottom: 2em;
                  color:white;
                  border-radius:3px;
                  margin:0 auto;
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
                  width: 15em;
                  padding: 10px;
                  margin-bottom: 2em;
                  color:white;
                  border-radius:3px;
                  background-color:#161526;
                  appearance:none;
                  border:none;
                  margin-left:10.5em
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