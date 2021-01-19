import React from 'react';
import ServiceCookies from '../services/cookies';
import ServiceAuth from '../services/ServiceAuth';
export default class WithdrawPopup extends React.Component {
 
 
    render() {
        return (
            <>
            <h4 className='withdrawTitle'>Predict Bitcoin Price!</h4>
            <p className='withdrawTitle predictRules'>Every monday we will give the chance of having 2 more faucets to the person that gets the closer to the price of Bitcoin for the next Sunday at 00:00</p>
            <form className="withdrawalForm">
              <select disabled name="currency" id="currency" className='selectCrypto predictShow' >
                  <option value="btc">43546.23 (EUR)</option>
                </select>
                <img className='wallet-svg' style={{width:'1.2em', padding:'8px 35px', opacity:'1'}} src={'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png'} />
 
              <div className='inputhold'>
                <label>Bitcoin Target Price</label>
                <input   name='points' placeholder='Your Prediction' onChange={this.handleInputChange}/>
              </div>
              <p className="minWith" style={{color:'#ffffff90'}}>Min. 5000 USD
             </p>
             <button  className='crypto-status-btn csb-withdraw withdrawFinal predictionFinal'>Send Prediction</button>
 
            </form>
            <table className='bp-table wallet-table predictTable'>
 
              <tr>
                <th style={{}}>DATE</th>
                <th className='fiat' style={{}}>TARGET PRICE </th>
                <th style={{}}>RESULT</th>
              </tr>
              <tr>
                <td className='textCenter' style={{}}><p>01/01/2021 12:31</p></td>
                <td className='textCenter fiat' style={{}}><p> 34565</p></td>
                <td style={{}}><span className='crypto-status-btn  defeat'>DEFEAT</span></td>
              </tr>
              <tr>
                <td className='textCenter' style={{}}><p>01/01/2021 12:31</p></td>
                <td className='textCenter fiat' style={{}}><p> 34565</p></td>
                <td style={{}}><span className='crypto-status-btn  defeat'>DEFEAT</span></td>
              </tr>
              <tr>
                <td className='textCenter' style={{}}><p>01/01/2021 12:31</p></td>
                <td className='textCenter fiat' style={{}}><p> 34565</p></td>
                <td style={{}}><span className='crypto-status-btn  defeat'>DEFEAT</span></td>
              </tr>
              <tr>
                <td className='textCenter' style={{}}><p>01/01/2021 12:31</p></td>
                <td className='textCenter fiat' style={{}}><p> 34565</p></td>
                <td style={{}}><span className='crypto-status-btn  defeat'>DEFEAT</span></td>
              </tr>
              <tr>
                <td className='textCenter' style={{}}><p>01/01/2021 12:31</p></td>
                <td className='textCenter fiat' style={{}}><p> 34565</p></td>
                <td style={{}}><span className='crypto-status-btn  defeat'>DEFEAT</span></td>
              </tr>
              </table>
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