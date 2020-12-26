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
        <img onClick={logout} style={{"pointer-events": "all"}} alt="Logout" className='loutButton' src={'images/logout.svg'} />
             
          <div className='bp-middle-left bp-blueshadow main'>
          <br/><p className='bp-title'>Wallet</p>
          <p>This is your balance and cash equivalents</p>
          <table className='bp-table wallet-table'>
              <tr>
                <th style={{}}>AMOUNT</th>
                <th className='fiat' style={{}}>FIAT </th>
                <th style={{}}>STATUS</th>
              </tr>
              <tr>
                <td className='textCenter' style={{}}><p>12594 POINTS </p></td>
                <td className='textCenter fiat' style={{}}><p> 5000 USD</p></td>
                <td style={{}}><button onClick={openModal} className='crypto-status-btn csb-withdraw'>Withdraw</button></td>
              </tr>
              
            </table>
          </div>
          <Modal  isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal" >
 
            <h4 className='withdrawTitle'>Withdrawal</h4>
            <form className="withdrawalForm">
              <select name="currency" id="currency" className='selectCrypto'>
                  <option value="btc">Bitcoin (BTC)</option>
                  <option value="eth">Ethereum (ETH)</option>
                  <option value="ltc">Litecoin (LTC)</option>
                  <option value="trx">Tron (TRX)</option>
                </select>
                <img className='wallet-svg' style={{width:'1.2em', padding:'8px 35px', opacity:'1'}} src={'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png'} />
              <div className='inputhold' style={{marginBottom: '-1em'}}>
                <label>Your Withdrawal Address</label>
                <input  placeholder="Your BTC Address" name='address'/>
                <img className='walletSvg'  role="img" src="https://www.flaticon.com/svg/static/icons/svg/482/482541.svg" />
              </div>
              <div className='inputhold'>
                <label>Amount</label>
                <input  value="0.00000000" name='withamount'/>
                <img className='wallet-svg' style={{width:'1.2em', padding:'11px 35px', opacity:'1'}} src={'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png'} />
              </div>
              <p className="minWith" style={{color:'#ffffff90'}}>Min. 0.0005 <img className='wallet-svg' style={{width:'1.2em', padding:'2px 50px', opacity:'1'}} src={'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png'} />
             </p>
            </form>
              <p className="terms">Your withdrawal will be made from: <span style={{fontWeight:'bold'}}>next sunday</span></p>
              <button className='crypto-status-btn csb-withdraw withdrawFinal'>Withdraw</button>
          </Modal>
          <div className='clearfix'/>
        </div>
      </div>
      <AccountSecurity />
      <div className='bp-center-text'>
      <p style={{fontWeight: 700, fontSize: 16}}>Withdrawal history</p>
      </div>
          
      <div className='bp-middle'>
        <div className='bp-middle-over'>
          <div className='bp-middle-all bp-blueshadow' style={{overflowX: 'auto'}}>
            <table className='bp-table'>
              <tr>
                <th style={{width: '20%'}}>DATE</th>
                <th style={{}}>AMOUNT</th>
                <th style={{}}>CURRENCY</th>
                <th style={{}}>POINTS</th>
                <th style={{}}>ACTION</th>
              </tr>
              <tr>
                <td style={{width: '20%'}}>11/14/2020 - 11:15</td>
                <td className='textCenter' style={{}}><p>0.0012594 </p></td>
                <td className='textCenter' style={{}}><p> BTC</p></td>
                <td className='textCenter' style={{}}><p> 0</p></td>
                <td style={{width: '40%'}}><button className='crypto-status-btn csb-success'>Validated</button></td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>11/17/2020 - 11:15</td>
                <td className='textCenter' style={{}}><p>0.4638294 </p></td>
                <td className='textCenter' style={{}}><p> LTC</p></td>
                <td className='textCenter' style={{}}><p> 0</p></td>
                <td style={{}}><button className='crypto-status-btn csb-success'>Validated</button></td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>11/11/2020 - 11:15</td>
                <td className='textCenter' style={{}}><p>1.1842937 </p></td>
                <td className='textCenter' style={{}}><p> ETH</p></td>
                <td className='textCenter' style={{}}><p> 0</p></td>
                <td style={{}}><button className='crypto-status-btn csb-in-process'>Pending</button></td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>11/14/2020 - 11:15</td>
                <td className='textCenter' style={{}}><p>0.9574212 </p></td>
                <td className='textCenter' style={{}}><p> BTC</p></td>
                <td className='textCenter' style={{}}><p> 0</p></td>
                <td style={{}}><button className='crypto-status-btn csb-success'>Validated</button></td>
              </tr>
            </table>
          </div>
          <div className='clearfix'/>
        </div>
      </div><br/>
      {/* <p>Hola</p> */}
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
    </BasePage>
  )
}
