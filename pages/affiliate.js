import React, { useState, useEffect } from 'react';
import Marquee from 'react-double-marquee';

import Modal from 'react-modal';
import { useRouter } from 'next/router'
import BasePage from '../components/BasePage';
import ServiceCookies from '../services/cookies';
import AccountSecurity from '../components/AccountSecurity';

export default function Home() {
  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      backgroundColor       : '#252540'
    }
  };
  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
 
  function afterOpenModal() {
  }
 
  function closeModal(){
    setIsOpen(false);
  }

  function logout() {
    ServiceCookies.removeUserCookies();
    window.location.replace('/');
  }

  

  Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.55)';
  const router = useRouter();
  return (
    <BasePage>

      <div className='bp-h-bg'>
      <div className='bp-middle-over'>
          <div className='bp-middle-left bp-blueshadow main'>
          <br/><p className='bp-title' style={{textAlign:'start',padding:'1em',color:'#DC8614', fontWeight:"bold"}}>Your Referral Link: <span style={{color:'#ffffff80',fontWeight:"500"}}>https://cryptodeep.com/?ref=A8670FGb5D</span></p>
          <div style={{width:'fit-content',float:"left"}}>
            <p style={{textAlign:'start',paddingLeft:'1.2em'}}>Total Referrals Lifetime: 15 (5 second gen.)</p>
            <p style={{textAlign:'start',padding:'1.2em'}}>Total Referrals This Week: 0 (0 second gen.)</p>
          </div>
          <div className='rightEarning' style={{width:'fit-content',float:"right",marginRight:"15em"}}>
            <p style={{textAlign:'start',paddingLeft:'1.2em'}}>Total Earnings: 150 POINTS</p>
            <p style={{textAlign:'start',padding:'1.2em'}}>Total Earnings Today: 0 POINTS</p>
          </div>
          <table className='bp-table wallet-table'>
              <tr>
                <th style={{}}>USERNAME</th>
                <th className='fiat' style={{}}>EARNINGS </th>
                <th style={{}}>REGISTRATION DATE</th>
              </tr>
              <tr>
                <td className='textCenter' style={{}}><p>CRYPTOCOOL2 </p></td>
                <td className='textCenter fiat' style={{}}><p> 5000 POINTS</p></td>
                <td style={{}}>12/20/2020 11:34</td>
              </tr>
              <tr>
                <td className='textCenter' style={{}}><p>CRYPTOCOOL2 </p></td>
                <td className='textCenter fiat' style={{}}><p> 5000 POINTS</p></td>
                <td style={{}}>12/20/2020 11:34</td>
              </tr>
              
            </table>
          </div>
          <Modal  isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal" >
 
            <div className='withdrawalForm' style={{float:'left', textAlign:'left',fontSize:"1.1em"}}>
                <h1 className='withdrawTitle'>RULES</h1>
                <p>- Self affiliation is forbidden as well as using multiple accounts that share the same computer/phone or IP address.</p>
                <br />
                <p>- If our security system detects any abuse your funds will be frozen and your account suspended.</p><br />
                <p>- For any questions related to our affiliate offer or if you want to become a partner of CRYPTODEEP you can contact us here: info@cryptodeep.com</p><br />
                <button onClick={closeModal} className='crypto-status-btn csb-withdraw withdrawFinal'>Close</button>
         
              </div>
          </Modal>
          <div className='clearfix'/>
        </div>
      <div className='bp-center-text'>
        <p style={{fontWeight: 700, fontSize: 16}}>Affiliate Program</p>
      </div>
          
      <div className='bp-middle'>
        <div className='bp-middle-over'>
          <div className='bp-middle-all bp-blueshadow affiliateProgram' style={{padding:"3em"}}>
            <p style={{textAlign:'initial',width:'80%',marginTop:"1em",fontSize:"1.2em"}}>CRYPTODEEP offers you an exclusive two-generation affiliate program that gives you the opportunity to earn money every time one of your affiliates uses our site or one of your affiliates invites a user.</p>
            <button onClick={openModal} style={{marginTop:"2em"}} className='crypto-status-btn csb-withdraw withdrawFinal rules'>See Rules</button>
            <div style={{width:'80%'}}>
              <div style={{float:'left', textAlign:'left',fontSize:"1.1em",marginTop:"3em"}}>
                <h1>HOW IT WORKS?</h1>
                <p>You just need to invite users via your affiliate link, if one of your affiliates invites a user you also earn money.</p>
                <br />
                <p>- You earn 20% of each cash claimed by your affiliates (if one of your affiliates win JACKPOT of $1000 for example, you will earn $200).</p><br />
                <p>- You earn 2% every time a user, invited by one of your affiliates, claims a faucet (If a user invited by one of your affiliates wins the JACKPOT of $1000 you win $20 and your affiliate will win $200).</p><br />
                <p>- There are no affiliate limits, you can invite as many users as you want.</p><br />
              </div>
            </div>
          </div>
          <div className='clearfix'/>
        </div>
      </div>
        
      </div>
      <br/>
      {/* <p>Hola</p> */}
      <style jsx>{`

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
                  width: 30em;
                  margin: auto;
                }
                .withdrawalForm p{
                  color:white;
                  margin: auto;
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
                  .affiliateProgram{width: 73%!important;}
                  .affiliateProgram p{}
                  .rightEarning{width: fit-content;
    float: inherit!important;
    margin-right: 0em!important;}
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
    </BasePage>
  )
}
