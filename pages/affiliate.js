import React, { useState, useEffect } from 'react';
import Marquee from 'react-double-marquee';

import Modal from 'react-modal';
import { useRouter } from 'next/router'
import BasePage from '../components/BasePage';
import ServiceCookies from '../services/cookies';
import AccountSecurity from '../components/AccountSecurity';
import AffiliateTable from '../components/AffiliateTable';
import AffiliateSubTable from '../components/AffiliateSubTable';
import ServiceAuth from '../services/ServiceAuth';
import Translator from '../services/translator';
import Countdown from 'react-countdown';
import { PaginatedList } from 'react-paginated-list';
import Footer from '../components/Footer';

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      date: null,
      thisweek: true,
      isOpen: false,
      items: [],
      originalitems: [],
      //Lang
      translatorData: [],
      currentLang: 'en',
      usdperpoint: 0,
      userfaucetbalance: 0,
    }
  }

  componentDidMount() {
    this._loadLang();
    const userCookies = ServiceCookies.getUserCookies();
    var r = new Date();
    var d = new Date();
    d.setDate(d.getDate() + (1 + 7 - d.getDay()) % 7);
    var ms = (d.getTime() - r.getTime());
    this.setState({
      date: d
    })

    var _tmpMap = userCookies['cktoken'] == null ? {} : {
      "token": userCookies['cktoken']
    }
    ServiceAuth.getgeneralsettings(_tmpMap).then(response => {
      const dataB = response.data;
      
      console.log(dataB);
      this.setState({
        userfaucetbalance: dataB.data.userfaucetbalance,
        usdperpoint: dataB.data.settings.usdperpoint
      })
    
    })

    ServiceAuth.getaffcontesthistory({
      "token": userCookies['cktoken']
    }).then(response => {
      const data = response.data;
      console.log(data);
      var _now = new Date();
        Date.prototype.getWeekNumber = function () {
          var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
          var dayNum = d.getUTCDay() || 7;
          d.setUTCDate(d.getUTCDate() + 4 - dayNum );
          var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
          return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
      };
      if(data.data.items != null) {
          this.setState({
              originalitems: data.data.items
          })

          var _val = false;
          var _now = new Date();
          Date.prototype.getWeekNumber = function () {
            var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
            var dayNum = d.getUTCDay() || 7;
            d.setUTCDate(d.getUTCDate() + 4 - dayNum );
            var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
            return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        };
          this.setState({
            items: !_val ? this.state.originalitems.filter(i => i.weeknum == _now.getWeekNumber()) : this.state.originalitems.filter(i => i.weeknum == (_now.getWeekNumber() - 1))
          })
      }
    }).catch(e => {
      console.log(e);
      alert(e);
      return;
    })
  }

  _loadLang = () => {
    const langCookies = ServiceCookies.getLangCookies();
    ServiceAuth.getlanguagedataset({
      
    }).then(response => {
      const data = response.data;
      console.log(data);
      if(data.data.items != null) {
          this.setState({
            currentLang: langCookies['cklang'],
              translatorData: data.data.items
          })
      }
    }).catch(e => {
      console.log(e);
      alert(e);
      return;
    })
  }

  logout = () => {
    ServiceCookies.removeUserCookies();
    window.location.replace('/cryptodeep/');
  }

  

  // Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.55)';
  // const router = useRouter();
  render() {
    return (
      <BasePage
        ftr={3}
        currentLang={this.state.currentLang}
        translatorData={this.state.translatorData}
      >
  
        <div className='bp-h-bg'>
        <div className='bp-middle-over'>

        <div className='bp-middle-left-sub bp-blueshadow' style={{
              width: '97%',
              marginBottom: '40px'
            }}>
              <img className='crypto-icon crownSvg' src='/cryptodeep/images/cryptodeep_asset_6.png' style={{
                marginTop: '0px'
              }} />
              <p style={{marginTop:-2, textTransform: 'uppercase'}}>{Translator.getStringTranslated('global_faucetbalance', this.state.currentLang, this.state.translatorData)}</p>
              
    <h1 style={{marginBottom:-10,marginTop:-8, color:'#FFBF00'}}>{this.state.userfaucetbalance} {Translator.getStringTranslated('global_faucetscount', this.state.currentLang, this.state.translatorData)}</h1>
            </div>

            <div className='bp-middle-left-sub bp-blueshadow' style={{
              width: '97%',
              marginBottom: '40px'
            }}>
            <p className='withdrawTitle ' style={{fontSize:'1.5em'}}>{Translator.getStringTranslated('affc_title', this.state.currentLang, this.state.translatorData)} </p>
            
            <h4 className='withdrawTitle' style={{fontSize:'2em'}}>{Translator.getStringTranslated('affc_leaderboard', this.state.currentLang, this.state.translatorData)}</h4>
            <div className='countdown' >
              {
                this.state.date == null ? null : <Countdown className='countdown' date={this.state.date} />
              }
              
            </div>
            <div className="toggle-container">

                      <input type="checkbox" onChange={(val) => {
                        var _val = val.target.checked;
                        var _now = new Date();
                        Date.prototype.getWeekNumber = function () {
                          var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
                          var dayNum = d.getUTCDay() || 7;
                          d.setUTCDate(d.getUTCDate() + 4 - dayNum );
                          var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
                          return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
                      };
                        this.setState({
                          items: !_val ? this.state.originalitems.filter(i => i.weeknum == _now.getWeekNumber()) : this.state.originalitems.filter(i => i.weeknum == (_now.getWeekNumber() - 1))
                        })
                      }} />
                      <div className="slider round"></div>
                    </div> 
                    <div className='contestContainer'>
                      <PaginatedList 
                        list={this.state.items}
                        itemsPerPage={10}
                        renderList={(list) => (
                          <>
                            <table className='bp-table'>

<div className='over_robot_b'/>
<thead>
<tr>
    <th style={{textTransform: 'uppercase'}}>{Translator.getStringTranslated('affc_player', this.state.currentLang, this.state.translatorData)}</th>
    <th style={{textTransform: 'uppercase'}}> {Translator.getStringTranslated('global_points', this.state.currentLang, this.state.translatorData)}</th>
    <th style={{textTransform: 'uppercase'}}>{Translator.getStringTranslated('affc_earnings', this.state.currentLang, this.state.translatorData)} </th>
</tr>
</thead>
<tbody style={{overflowY:'scroll'}}>
  {
    list.map((item, id) => {
      return (
        <tr key={id}>
                <td style={{width: '20%'}}>{item.username}</td>
                <td className='textCenter' style={{}}><p>{item.totalpoints} </p></td>
        <td className='textCenter' style={{}}><p> {this.state.usdperpoint * item.totalpoints}  USD</p></td>
            </tr>
      )
    })
  }
        
</tbody>
<div className='clearfix'/>
</table>
                          </>
                        )}
                      />
                      
                    </div>
               </div>

<div className='clearfix'/>

            <AffiliateTable 
              currentLang={this.state.currentLang}
              translatorData={this.state.translatorData}
            />
          </div>
        <div className='bp-center-text'>
          <p style={{fontWeight: 700, fontSize: 32}}>{Translator.getStringTranslated('aff_programtitle', this.state.currentLang, this.state.translatorData)}</p>
          <img className='affimagevv' src='/cryptodeep/images/aff_img.png' />
        </div>
            
        <div className='bp-middle'>
          <div className='bp-middle-over'>

            <div className='bp-middle-all bp-blueshadow affiliateProgram' style={{padding:"3em"}}>
              <p style={{textAlign:'initial',width:'80%',marginTop:"1em",fontSize:"1.2em"}}>{Translator.getStringTranslated('aff_offer', this.state.currentLang, this.state.translatorData)}</p>
              
               <div style={{width:'80%'}}>
                <div style={{float:'left', textAlign:'left',fontSize:"1.1em",marginTop:"3em"}}>
                <h1 className='withdrawTitle' style={{color: 'orange', textTransform: 'uppercase'}}>{Translator.getStringTranslated('aff_howitworks', this.state.currentLang, this.state.translatorData)}</h1>
                  <p>{Translator.getStringTranslated('aff_hiw_intro', this.state.currentLang, this.state.translatorData)}</p>
                  <br />
                  <p>{Translator.getStringTranslated('aff_hiw_1', this.state.currentLang, this.state.translatorData)}</p><br />
                  <p>{Translator.getStringTranslated('aff_hiw_2', this.state.currentLang, this.state.translatorData)}</p><br />
                  <p>{Translator.getStringTranslated('aff_hiw_3', this.state.currentLang, this.state.translatorData)}</p><br />
                </div>
              </div>
              <div className='withdrawalForm' style={{float:'left', textAlign:'left',fontSize:"1.1em"}}>
                  <h1 className='withdrawTitle' style={{color: 'orange', textTransform: 'uppercase'}}>{Translator.getStringTranslated('aff_rules', this.state.currentLang, this.state.translatorData)}</h1>
                  <p>{Translator.getStringTranslated('aff_rule_1', this.state.currentLang, this.state.translatorData)}</p>
                  <br />
                  <p>{Translator.getStringTranslated('aff_rule_2', this.state.currentLang, this.state.translatorData)}</p><br />
                  <p>{Translator.getStringTranslated('aff_rule_3', this.state.currentLang, this.state.translatorData)}</p><br />
                  
                </div>
            </div>
            <div className='clearfix'/>
          </div>
        </div>
  
              <AffiliateSubTable
                currentLang={this.state.currentLang}
                translatorData={this.state.translatorData}
              />
          
          <div className='clearfix'/>
        <Footer/>
        </div>
        <br/>
        {/* <p>Hola</p> */}
        <style jsx>{`
          .countdown{    font-weight: 900;
    font-size: 2em;
    color: #DC8614;
    letter-spacing: 5px;margin-top:-0.5em;margin-bottom:1em}
          .contestContainer{height: 27em;
    overflow: auto;}
          .toggle-container {
    position: relative;
    width: 12.8em;
    height: 40px;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    margin:auto;
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
  content: "This Week";
  height: 24px;
  width: auto;
  right: 1em;
  bottom: 4px;
  transition: 0.2s;
  color: #fff;
  pointer-events: none;
  font-family:"Nunito";
  font-weight:bold
}

input:checked + .slider {
  background-color:#fff;
  color:#161526 
}

input:checked + .slider:before {
  transform: translateX(10.5em);
  background-color: #161526
}

input:checked + .slider:after {
  content: "Last Week";
  left: -6em;
  color:#161526;
  font-weight:bold
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
                  .bp-title span:hover{border-bottom:1px solid #DC8614;cursor:default}
                  .rules:hover{background-color:transparent}
                  label{
                    font-family:Nunito;
                    color:white;
                    font-weight:bold;
                    font-size:0.7em;
                    margin-left:0.4em;
                  }
                  .withdrawalForm{
                    width: 80%;
                    margin: auto;
                  }
                  .withdrawalForm p{
                    color:white;
                    margin: auto;
                    font-family: 'Nunito';
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
                  .withdrawFinal:hover{
                    opacity:0.8
                  }
                  .withdrawFinal:active{
                    outline:none
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
                  table{    margin-bottom: 2em;
  }
                  .main{
                    height:fit-content !important
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
                    width: 85.7%;
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
                    .banner{width: 85% !important}
                    .affiliateProgram{width: 73%!important;}
                    .affiliateProgram p{}
                    .rightEarning{width: fit-content;float: inherit!important;margin-right: 0em!important;}
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
      </BasePage>
    )
  }
}
