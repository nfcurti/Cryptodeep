import React from 'react';
import ServiceCookies from '../services/cookies';
import ServiceAuth from '../services/ServiceAuth';
import Translator from '../services/translator';

export default class WithdrawTable extends React.Component {

    constructor() {
        super();
        this.state = {
          amount: '',
          fiat: ''
        }
      }

      componentDidMount() {
        const userCookies = ServiceCookies.getUserCookies();
            if(userCookies['ckuserid'] == null && userCookies['cktoken'] == null) {
                return;
            }else{
              ServiceAuth.getgeneralsettings({
                "token": userCookies['cktoken']
              }).then(response => {
                const dataB = response.data;
                console.log(dataB);
                ServiceAuth.getprofile({
                  "token": userCookies['cktoken']
                }).then(response => {
                  const data = response.data;
                  console.log(data);
                  this.setState({
                    amount: data.user.points,
                    fiat: Math.floor(data.user.points * dataB.data.settings.usdperpoint)
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
            };
      }

    render() {
        return (
            <table className='bp-table wallet-table'>

              <tr>
                <th style={{textTransform: 'uppercase'}}>{Translator.getStringTranslated('global_amount', this.props.currentLang, this.props.translatorData)}</th>
                <th className='fiat' style={{ textTransform: 'uppercase' }}>{Translator.getStringTranslated('global_fiat', this.props.currentLang, this.props.translatorData)} </th>
                <th style={{ textTransform: 'uppercase' }}>{Translator.getStringTranslated('global_status', this.props.currentLang, this.props.translatorData)}</th>
              </tr>
              <tr>
                <td className='textCenter' style={{textTransform: 'uppercase'}}><p>{this.state.amount} {Translator.getStringTranslated('global_points', this.props.currentLang, this.props.translatorData)} </p></td>
                <td className='textCenter fiat' style={{}}><p> {this.state.fiat} USD</p></td>
                <td style={{}}><button onClick={this.props.openModal} className='crypto-status-btn csb-withdraw'>{Translator.getStringTranslated('global_withdraw', this.props.currentLang, this.props.translatorData)}</button></td>
              </tr>
              
          
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

                  background-image: url("/cryptodeep/images/texture_a.png");
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
                  content:url('/cryptodeep/images/arrow_up.png');
                  width: 0.7em;
                  float: left;
                  margin-top: 7px;
                  margin-right: 4px;
                }

                .bp-crypto-pasf {
                  content:url('/cryptodeep/images/arrow_down.png');
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
        
        </table>
      
        )
    }
}