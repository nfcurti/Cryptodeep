import React, { useState, useEffect } from 'react';
import Marquee from 'react-double-marquee';

import Modal from 'react-modal';
import { useRouter } from 'next/router'
import BasePage from '../components/BasePage';

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

  Modal.defaultStyles.overlay.backgroundColor = 'rgba(0, 0, 0, 0.55)';
  const router = useRouter();
  return (
    <BasePage>

      <div className='bp-h-bg'>
        <div className='bp-middle-over'>
          <img alt="Logout" className='loutButton' src={'images/logout.svg'} />
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
 
            <h4 className='withdrawTitle'>Make a Withdrawal</h4>
            <form className="withdrawalForm">
              <select name="currency" id="currency" className='selectCrypto'>
                  <option value="select">Select currency...</option>
                  <option value="btc">Bitcoin (BTC)</option>
                  <option value="eth">Ethereum (ETH)</option>
                  <option value="ltc">Litecoin (LTC)</option>
                  <option value="trx">Tron (TRX)</option>
                </select>
              <div className='inputhold'>
                <input  placeholder="Wallet Address" name='address'/>
                <img className='walletSvg'  role="img" src="https://www.flaticon.com/svg/static/icons/svg/482/482541.svg" />
              </div>
              <div className='inputhold'>
                <input  placeholder="Amount" name='withamount'/>
                <img className='walletSvg'  role="img" src="https://www.flaticon.com/svg/static/icons/svg/810/810378.svg" />
              </div>
              <p className="minWith">Min. Withdrawal: 0.0005 BTC</p>
            </form>
              <p className="terms">All withdrawals are valid from Sunday midnight, within 24 hours maximum</p>
              <button className='crypto-status-btn csb-withdraw withdrawFinal'>Withdraw</button>
          </Modal>
          <div className='clearfix'/>
        </div>
      </div>
      <div className='bp-middle-over security'>
          <div className='bp-middle-left bp-blueshadow security'>
          <br/><p className='bp-title'>Security</p>
          <p>Change your personal data periodically to secure your account</p>
          <br/><br/><br/>
          <div className='bp-security'>
            <form autocomplete="off">
            <div className='inputhold'>
                  <input  placeholder="Current email" name='email' type='email'/>
                  <img  role="img" src="https://upload.wikimedia.org/wikipedia/commons/d/d8/At_Sign_Nimbus.svg" />
                </div>
                
                <div className='inputhold'>
                  <input  placeholder="New email" name='email' type='email'/>
                  <img  role="img" src="https://upload.wikimedia.org/wikipedia/commons/d/d8/At_Sign_Nimbus.svg" />
                </div>
                <div className='inputhold'>
                <input type='password' placeholder="Password" name='pwd'/>
                <img role="img" src="https://cdn.onlinewebfonts.com/svg/img_398183.png" />
              </div>
                <input
                  value="Save Email"
                  type='submit'
                  className='loginSubmit submitSecurity'
                />
            </form>
          </div>
          <div className='divider'></div>
            <div className='bp-security'>
            <form autocomplete="off">

                
                <div className='inputhold'>
                <input type='password' placeholder="Old Password" name='pwd'/>
                <img role="img" src="https://cdn.onlinewebfonts.com/svg/img_398183.png" />
              </div>
              <div className='inputhold'>
                <input type='password' placeholder="New Password" name='pwd'/>
                <img role="img" src="https://cdn.onlinewebfonts.com/svg/img_398183.png" />
              </div>
              <div className='inputhold'>
                <input type='password' placeholder="Repeat Password" name='pwd'/>
                <img role="img" src="https://cdn.onlinewebfonts.com/svg/img_398183.png" />
              </div>
                
                <input
                  value="Save Password"
                  type='submit'
                  className='loginSubmit submitSecurity'
                />
            </form>
          </div>
          </div>
          
          <div className='clearfix'/>
        </div>
      <div className='bp-center-text'>
      <p style={{fontWeight: 700, fontSize: 16}}>Withdrawal history</p>
      </div>
          
      <div className='bp-middle'>
        <div className='bp-middle-over'>
          <div className='bp-middle-all bp-blueshadow'>
            <table className='bp-table'>
              <tr>
                <th style={{width: '20%'}}>DATE</th>
                <th style={{}}>AMOUNT</th>
                <th style={{}}>CURRENCY</th>
                <th style={{}}>ACTION</th>
              </tr>
              <tr>
                <td style={{width: '20%'}}>11/14/2020 - 11:15</td>
                <td className='textCenter' style={{}}><p>0.0012594 </p></td>
                <td className='textCenter' style={{}}><p> BTC</p></td>
                <td style={{width: '40%'}}><button className='crypto-status-btn csb-success'>Validated</button></td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>11/17/2020 - 11:15</td>
                <td className='textCenter' style={{}}><p>0.4638294 </p></td>
                <td className='textCenter' style={{}}><p> LTC</p></td>
                <td style={{}}><button className='crypto-status-btn csb-success'>Validated</button></td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>11/11/2020 - 11:15</td>
                <td className='textCenter' style={{}}><p>1.1842937 </p></td>
                <td className='textCenter' style={{}}><p> ETH</p></td>
                <td style={{}}><button className='crypto-status-btn csb-in-process'>Pending</button></td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>11/14/2020 - 11:15</td>
                <td className='textCenter' style={{}}><p>0.9574212 </p></td>
                <td className='textCenter' style={{}}><p> BTC</p></td>
                <td style={{}}><button className='crypto-status-btn csb-success'>Validated</button></td>
              </tr>
            </table>
          </div>
          <div className='clearfix'/>
        </div>
      </div><br/>
      {/* <p>Hola</p> */}
      <style jsx>{`
                .withdrawalForm{
                  width: fit-content;
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
                }
                .terms{
                  font-family:'Open Sans';
                  color:white;
                  text-align:left;
                  font-size:0.8em;

                }
                .minWith{
                  font-family:'Open Sans';
                  color:white;
                  text-align:left;
                  font-size:0.5em;
                  margin-top:-3em;
                  margin-left:0.1em
                }
                .withdrawTitle{
                  font-family:'Open Sans';
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
                  width: 17em;
                  padding: 10px;
                  margin-bottom: 2em;
                  color:white;
                  border-radius:3px;
                  border-style:solid;
                  border: 1px solid white;
                  background-color:transparent;
                  appearance:none
                }
                input{
                  outline:none;
                  width: 15.5em;
                  padding: 10px;
                  margin-bottom: 2em;
                  color:white;
                  border-radius:3px;
                  border-style:solid;
                  border: 1px solid white;
                  background-color:transparent}
                input::placeholder{
                  color:white
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
                  height: 390px;
                  padding: 0 14px;

                  font-family: 'Open Sans';
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

                  font-family: 'Open Sans';
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

                  font-family: 'Open Sans';
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

                  font-family: 'Open Sans';
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
