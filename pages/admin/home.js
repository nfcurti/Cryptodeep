import React, { useState, useEffect } from 'react';
import Marquee from 'react-double-marquee';

import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from 'next/router'
import BaseAdminPage from '../../components/BaseAdminPage';
import ServiceAuth from '../../services/ServiceAuth';
import ServiceCookies from '../../services/cookies';
export default class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      settings: null,
      errorUpdateGeneralSettings: null,
      formController: {
        gs_usdperpoint: '',
        gs_faucetdelay: '',
        gs_minbtcwithdraw: '',
        gs_minethwithdraw: '',
        gs_minltcwithdraw: '',
        gs_mintrxwithdraw: '',
        gs_roll_a: '',
        gs_roll_b: '',
        gs_roll_c: '',
        gs_roll_d: '',
        gs_roll_e: '',
        gs_jackpot: ''
      }
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
                window.location.replace(`/cryptodeep/account`)
            }else{
              if(userCookies['ckpl'] != '999') {
                window.location.replace(`/cryptodeep/account`)
              }else{
                ServiceAuth.getgeneralsettings({
                  "token": userCookies['cktoken']
                }).then(response => {
                  const data = response.data;
                  console.log(data);
                  var _formC = this.state.formController;
                  _formC.gs_usdperpoint = data.data.settings.usdperpoint;
                  _formC.gs_faucetdelay = data.data.settings.faucetdelay;
                  _formC.gs_minbtcwithdraw = data.data.settings.minbtcwithdraw;
                  _formC.gs_minethwithdraw = data.data.settings.minethwithdraw;
                  _formC.gs_minltcwithdraw = data.data.settings.minltcwithdraw;
                  _formC.gs_mintrxwithdraw = data.data.settings.mintrxwithdraw;
                  _formC.gs_roll_a = data.data.settings.roll_a;
                  _formC.gs_roll_b = data.data.settings.roll_b;
                  _formC.gs_roll_c = data.data.settings.roll_c;
                  _formC.gs_roll_d = data.data.settings.roll_d;
                  _formC.gs_roll_e = data.data.settings.roll_e;
                  _formC.gs_jackpot = data.data.settings.jackpot;

                  this.setState({
                    settings: data.data.settings,
                    formController: _formC
                  })
                }).catch(e => {
                  console.log(e);
                  alert(e);
                  return;
                })
              }
            };
  }

  _editGeneralSettings = () => {
    if(this.state.formController.gs_usdperpoint.length == 0) {
      return alert('USD Per Points is empty');
    }

    if(isNaN(this.state.formController.gs_usdperpoint)) {
      return alert('USD Per Points should be a number');
    }

    if(this.state.formController.gs_faucetdelay.length == 0) {
      return alert('Faucet Delay is empty');
    }

    if(isNaN(this.state.formController.gs_faucetdelay)) {
      return alert('Faucet Delay should be a number');
    }

    if(this.state.formController.gs_minbtcwithdraw.length == 0) {
      return alert('Min BTC Withdraw is empty');
    }

    if(isNaN(this.state.formController.gs_minbtcwithdraw)) {
      return alert('Min BTC Withdraw should be a number');
    }

    if(this.state.formController.gs_minethwithdraw.length == 0) {
      return alert('Min ETH Withdraw is empty');
    }

    if(isNaN(this.state.formController.gs_minethwithdraw)) {
      return alert('Min ETH Withdraw should be a number');
    }

    if(this.state.formController.gs_minltcwithdraw.length == 0) {
      return alert('Min LTC Withdraw is empty');
    }

    if(isNaN(this.state.formController.gs_minltcwithdraw)) {
      return alert('Min LTC Withdraw should be a number');
    }

    if(this.state.formController.gs_mintrxwithdraw.length == 0) {
      return alert('Min TRX Withdraw is empty');
    }

    if(isNaN(this.state.formController.gs_mintrxwithdraw)) {
      return alert('Min TRX Withdraw should be a number');
    }

    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null || userCookies['cktoken'] == null) {
        window.location.replace(`/cryptodeep/login`)
    }else{
      if(userCookies['ckpl'] != '999') { return; }

      ServiceAuth.updategeneralsettings({
        "token": userCookies['cktoken'],
        "usdperpoint": this.state.formController.gs_usdperpoint,
        "faucetdelay": this.state.formController.gs_faucetdelay,
        "minbtcwithdraw": this.state.formController.gs_minbtcwithdraw,
        "minethwithdraw": this.state.formController.gs_minethwithdraw,
        "minltcwithdraw": this.state.formController.gs_minltcwithdraw,
        "mintrxwithdraw": this.state.formController.gs_mintrxwithdraw,
      }).then(response => {
        const data = response.data;
        console.log(data);
        var _a = alert('Changes saved.');
        if(_a) {
            window.location.replace('/cryptodeep/admin/home');
        }
      }).catch(e => {
        console.log(e);
        alert(e);
        return;
      })
    }
  }

  _editFaucetRewardSettings = () => {
    if(this.state.formController.gs_roll_a.length == 0) {
      return alert('Roll A is empty');
    }

    if(isNaN(this.state.formController.gs_roll_a)) {
      return alert('Roll A should be a number');
    }

    if(this.state.formController.gs_roll_b.length == 0) {
      return alert('Roll B is empty');
    }

    if(isNaN(this.state.formController.gs_roll_b)) {
      return alert('Roll B should be a number');
    }

    if(this.state.formController.gs_roll_c.length == 0) {
      return alert('Roll C is empty');
    }

    if(isNaN(this.state.formController.gs_roll_c)) {
      return alert('Roll C should be a number');
    }

    if(this.state.formController.gs_roll_d.length == 0) {
      return alert('Roll D is empty');
    }

    if(isNaN(this.state.formController.gs_roll_d)) {
      return alert('Roll D should be a number');
    }

    if(this.state.formController.gs_roll_e.length == 0) {
      return alert('Roll E is empty');
    }

    if(isNaN(this.state.formController.gs_roll_e)) {
      return alert('Roll E should be a number');
    }


    if(this.state.formController.gs_jackpot.length == 0) {
      return alert('Jackpot is empty');
    }

    if(isNaN(this.state.formController.gs_jackpot)) {
      return alert('Jackpot should be a number');
    }

    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null || userCookies['cktoken'] == null) {
        window.location.replace(`/cryptodeep/login`)
    }else{
      if(userCookies['ckpl'] != '999') { return; }

      ServiceAuth.updategeneralsettings({
        "token": userCookies['cktoken'],
        "roll_a": this.state.formController.gs_roll_a,
        "roll_b": this.state.formController.gs_roll_b,
        "roll_c": this.state.formController.gs_roll_c,
        "roll_d": this.state.formController.gs_roll_d,
        "roll_e": this.state.formController.gs_roll_e,
        "jackpot": this.state.formController.gs_jackpot
      }).then(response => {
        if(response.data == null) { return; }
        const data = response.data;
        console.log(data);
        var _a = alert('Changes saved.');
        if(_a) {
            window.location.replace('/cryptodeep/admin/home');
        }
      }).catch(e => {
        console.log(e);
        alert(e);
        return;
      })
    }
  }

  modifyCryptocurreny = (key, newval) => {
    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null || userCookies['cktoken'] == null) {
        window.location.replace(`/cryptodeep/login`)
    }else{
      if(userCookies['ckpl'] != '999') { return; }

      var _mmap = {
        "token": userCookies['cktoken']
      }

      if(key == 'BTC') {
        _mmap['btcenabled'] = newval;
      }else if(key == 'ETH') {
        _mmap['ethenabled'] = newval;
      }else if(key == 'LTC') {
        _mmap['ltcenabled'] = newval;
      }else if(key == 'TRX') {
        _mmap['trxenabled'] = newval;
      }

      ServiceAuth.updategeneralsettings(_mmap).then(response => {
        if(response.data == null) { return; }
        const data = response.data;
        window.location.replace('/cryptodeep/admin/home');
      }).catch(e => {
        console.log(e);
        alert(e);
        return;
      })
    }
  }
  
  render() {

  return (
          <BaseAdminPage>
          <div className='bp-middle'>
            <br/>
        <div className='bp-middle-over'>
        <div className='bp-middle-all bp-blueshadow'>
                <p className='loginTitle'>Admin</p>
                {
                  this.state.settings == null ?
                  <p>Loading...</p> :
                  <div>
                    <h2>General Settings</h2>
                  <div className='inputhold'>
                    <p>USD Per Point: <input  placeholder="USD Per Point" name='gs_usdperpoint' type='text' onChange={this.handleInputChange} value={this.state.formController.gs_usdperpoint}/> usd per Point</p>
                  </div>
                  <div className='inputhold'>
                    <p>Faucet delay: <input  placeholder="Faucet delay" name='gs_faucetdelay' type='text' onChange={this.handleInputChange} value={this.state.formController.gs_faucetdelay}/> min</p>
                  </div>
                  <div className='inputhold'>
                    <p>Min BTC withdraw: <input  placeholder="Min BTC Withdraw" name='gs_minbtcwithdraw' type='text' onChange={this.handleInputChange} value={this.state.formController.gs_minbtcwithdraw}/> USD</p>
                  </div>
                  <div className='inputhold'>
                    <p>Min ETH withdraw: <input  placeholder="Min ETH Withdraw" name='gs_minethwithdraw' type='text' onChange={this.handleInputChange} value={this.state.formController.gs_minethwithdraw}/> USD</p>
                  </div>
                  <div className='inputhold'>
                    <p>Min LTC withdraw: <input  placeholder="Min LTC Withdraw" name='gs_minltcwithdraw' type='text' onChange={this.handleInputChange} value={this.state.formController.gs_minltcwithdraw}/> USD</p>
                  </div>
                  <div className='inputhold'>
                    <p>Min TRX withdraw: <input  placeholder="Min TRX Withdraw" name='gs_mintrxwithdraw' type='text' onChange={this.handleInputChange} value={this.state.formController.gs_mintrxwithdraw}/> USD</p>
                  </div>
                  <input
                  value="Save"
                  type='submit'
                  onClick={() => this._editGeneralSettings()}
                  className='loginSubmit '
                />
                <br/>
                  <br/>
                  <hr/>
                  <h2>Manage currencies</h2>
                  {
                    this.state.settings.btcenabled ? 
                    <input
                      style={{
                        color: 'green',
                        width: '300px'
                      }}
                      value="BTC is enabled. Click to disable"
                      type='submit'
                      onClick={() => this.modifyCryptocurreny('BTC', false)}
                      className='loginSubmit '
                    /> 
                    :
                    <input
                      style={{
                        color: 'red',
                        width: '300px'
                      }}
                      value="BTC is disabled. Click to enable"
                      type='submit'
                      onClick={() => this.modifyCryptocurreny('BTC', true)}
                      className='loginSubmit '
                    />
                  }
                  <br/>
                  <br/>
                  {
                    this.state.settings.ethenabled ? 
                    <input
                      style={{
                        color: 'green',
                        width: '300px'
                      }}
                      value="ETH is enabled. Click to disable"
                      type='submit'
                      onClick={() => this.modifyCryptocurreny('ETH', false)}
                      className='loginSubmit '
                    /> 
                    :
                    <input
                      style={{
                        color: 'red',
                        width: '300px'
                      }}
                      value="ETH is disabled. Click to enable"
                      type='submit'
                      onClick={() => this.modifyCryptocurreny('ETH', true)}
                      className='loginSubmit '
                    />
                  }
                  <br/>
                  <br/>
                  {
                    this.state.settings.ltcenabled ? 
                    <input
                      style={{
                        color: 'green',
                        width: '300px'
                      }}
                      value="LTC is enabled. Click to disable"
                      type='submit'
                      onClick={() => this.modifyCryptocurreny('LTC', false)}
                      className='loginSubmit '
                    /> 
                    :
                    <input
                      style={{
                        color: 'red',
                        width: '300px'
                      }}
                      value="LTC is disabled. Click to enable"
                      type='submit'
                      onClick={() => this.modifyCryptocurreny('LTC', true)}
                      className='loginSubmit '
                    />
                  }
                  <br/>
                  <br/>
                  {
                    this.state.settings.trxenabled ? 
                    <input
                      style={{
                        color: 'green',
                        width: '300px'
                      }}
                      value="TRX is enabled. Click to disable"
                      type='submit'
                      onClick={() => this.modifyCryptocurreny('TRX', false)}
                      className='loginSubmit '
                    /> 
                    :
                    <input
                      style={{
                        color: 'red',
                        width: '300px'
                      }}
                      value="TRX is disabled. Click to enable"
                      type='submit'
                      onClick={() => this.modifyCryptocurreny('TRX', true)}
                      className='loginSubmit '
                    />
                  }
                  <br/>
                  <hr/>
                  <br/>
                  <h2>Faucet Reward Settings</h2>
                  <div className='inputhold'>
                    <p>Roll 0 - 999,500: <input  placeholder="X Points" name='gs_roll_a' type='text' onChange={this.handleInputChange} value={this.state.formController.gs_roll_a}/> points</p>
                  </div>
                  <div className='inputhold'>
                    <p>Roll 999,501 - 999,700: <input  placeholder="X Points" name='gs_roll_b' type='text' onChange={this.handleInputChange} value={this.state.formController.gs_roll_b}/> points</p>
                  </div>
                  <div className='inputhold'>
                    <p>Roll 999,701 - 999,850: <input  placeholder="X Points" name='gs_roll_c' type='text' onChange={this.handleInputChange} value={this.state.formController.gs_roll_c}/> points</p>
                  </div>
                  <div className='inputhold'>
                    <p>Roll 999,851 - 999,920: <input  placeholder="X Points" name='gs_roll_d' type='text' onChange={this.handleInputChange} value={this.state.formController.gs_roll_d}/> points</p>
                  </div>
                  <div className='inputhold'>
                    <p>Roll 999,921 - 999,998: <input  placeholder="X Points" name='gs_roll_e' type='text' onChange={this.handleInputChange} value={this.state.formController.gs_roll_e}/> points</p>
                  </div>
                  <div className='inputhold'>
                    <p>Jackpot: <input  placeholder="X Points" name='gs_jackpot' type='text' onChange={this.handleInputChange} value={this.state.formController.gs_jackpot}/> points</p>
                  </div>
                  <input
                  value="Save"
                  type='submit'
                  onClick={() => this._editFaucetRewardSettings()}
                  className='loginSubmit '
                />
                <br/>
                </div>
                }
            </div>
          <div className='clearfix'/>
        </div>


      <style jsx>{`
                .inputhold p {
                  font-size: 16px;
                }

                .inputhold p input {
                  margin-left: 20px;
                }
                  .captchaHolder{
                              margin:0 auto;
                                  width: 40%;
                                margin-bottom: 2em;
                            }
                  input[type="checkbox"]{
                    width:1em;margin-top:1%
                  }
                  .loginTerms label{
                    display:inline; float:left
                  }
                  .terms{
                        margin-bottom: 2em
                  }

                  a{
                    text-decoration:none
                  }
                  .loginSignup {font-size:1em;margin-top:2em!important;font-weight:600;color:white;}
                  .loginSignup a{font-size:1em;margin-top:2em!important;font-weight:600;color:white;}

                  .bp-middle-over{
                    width:100% !important;
                    margin:0 auto !important;
                  }

                  inputhold{
                    position:relative
                  }

                  img{
                    width:2em;
                    position: absolute;
                    margin-left: -4em;
                    padding: 12px 12px;
                    pointer-events: none;
                  opacity:0.3;
                  }

                 form{
                  width:87%;
                  margin:0 auto;
                 }

                 input{
                      width: 15.5em;
                  padding: 15px;
                  margin-bottom: 2em;
                    color:white;
                  border-radius:3px;
                  border-style:solid;
                  border: 1px solid white;
                  background-color:transparent}

                  input:focus{
                    color:white;
                    outline:none;
                  }

                  .loginSubmit{
                    margin:0 auto;
                    text-decoration: none;
                    text-transform: uppercase;
                    color: #DC8614;
                    font-weight: 700;
                    font-size: 14px;
                    background-color:#353535;
                    border:none;
                    box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    -webkit-box-sizing: border-box;
  
                  }

                  .loginSubmit:hover{
                    border-left: 1px  solid #DC8614 !important;
                    border-right: 1px  solid #DC8614 !important;
                    cursor:pointer;
                  }

                  .loginTitle{
                    font-size:3em;
                    margin-bottom:1em !important;
                    opacity:0.85
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
                  width: 100%;
                }
                .bp-middle-left p, .bp-middle-all p {
                  margin: 0px;
                }
                .bp-middle-left {
                  text-align: center;
                  margin-top: 30px;
                  margin-bottom: 30px;
                  width: 38%;
                  float: left;
                  height: 340px;
                  padding: 0 14px;

                  font-family: 'Nunito';
                  color: #FFFFFF;
                  font-weight: 400;
                  font-size: 12px;
                }

                .bp-center-text {
                  text-align: center;
                  margin: 0px auto;
                  width: 100%;
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
                  margin-left: 5%;
                  margin-right: 5%;
                  margin-top: 10px;
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
                  .bp-middle-left, .bp-middle-left-sub {
                    width: 90%;
                  }
                }

                .bp-blueshadow {

                  background: #252540;
                  box-shadow: 0px 0px 20px rgba(0,0,0,0.4);
                  border-radius: 4px;
                }

                .clearfix::after {
                  content: "";
  clear: both;
  display: table;
                }

                @media screen and (max-width: 800px){

                  .bp-middle{
                    margin-top:5em
                  }

                  input{
                    width:87%
                  }

                  .inputhold img{
                    display:none
                  }

                  .bp-middle-over{
                    width:85% !important
                  }

                }
            `}</style>
      </div></BaseAdminPage>
  );
  }
}
