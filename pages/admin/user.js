import React, { useState, useEffect } from 'react';
import Marquee from 'react-double-marquee';

import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from 'next/router'
import BaseAdminPage from '../../components/BaseAdminPage';
import ServiceAuth from '../../services/ServiceAuth';
import ServiceCookies from '../../services/cookies';
import { PaginatedList } from 'react-paginated-list';
export default class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      user: null,
      formController: {
        username: '',
        email: '',
        points: '',
        faucetbalance: '',
        firstgen: '',
        secondgen: '',
        privilegeLevel: ''
      },
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
            window.location.replace(`/account`)
        }else{
            if(userCookies['ckpl'] != '999') {
            window.location.replace(`/account`)
            }else{
                ServiceAuth.getusers({
                    "token": userCookies['cktoken']
                  }).then(response => {
                    const data = response.data;
                    console.log(data);
                    const queryString = window.location.search;
                    const urlParams = new URLSearchParams(queryString);

                    if(!urlParams.has('id')) {
                      return;
                    }
                    var _idToFetch = urlParams.get('id'); 
                    if(data.data.users != null) {
                        if(data.data.users.filter(u => u._id == _idToFetch).length > 0) {
                          console.log(data.data.users.filter(u => u._id == _idToFetch)[0]);

                          var _tUser = data.data.users.filter(u => u._id == _idToFetch)[0];
                          
                          var _fC = this.state.formController;
                          _fC.username = _tUser.username;
                          _fC.email = _tUser.email;
                          _fC.points = _tUser.points;
                          _fC.faucetbalance = _tUser.faucetbalance ?? 0;
                          _fC.firstgen = _tUser.firstgen ?? 20;
                          _fC.secondgen = _tUser.secondgen ?? 2;
                          _fC.privilegeLevel = _tUser.privilegeLevel;

                          this.setState({
                            user: _tUser,
                            formController: _fC
                        })
                        }else{
                          window.location.replace(`/admin/users`)
                        }
                        
                    }
                  }).catch(e => {
                    console.log(e);
                    alert(e);
                    return;
                  })
            }
        };

       
  }

  _editPressed = () => {
    var error = false;
    [
      'username', 'email', 'points', 'firstgen', 'secondgen', 'faucetbalance'
    ].forEach(mtc => {
      if(this.state.formController[mtc] == '' && !error) {
        error = true;
        alert('Missing field: '+mtc);
        return;
      }
    })

    if(error) { return; }

    if(isNaN(this.state.formController.points)) {
      return alert('Points should be a number');
    }

    //
    if(isNaN(this.state.formController.faucetbalance)) {
      return alert('Faucet Balance should be a number');
    }

    if(isNaN(this.state.formController.firstgen)) {
      return alert('First gen should be a number');
    }

    if(isNaN(this.state.formController.secondgen)) {
      return alert('Second gen should be a number');
    }


    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null || userCookies['cktoken'] == null) {
        window.location.replace(`/login`)
    }else{
      if(userCookies['ckpl'] != '999') { return; }
      var _mTSZ = {
        'token': userCookies['cktoken'],
        'userid': this.state.user._id,
        'username': this.state.formController.username,
        'email': this.state.formController.email,
        'points': this.state.formController.points,
        'faucetbalance': this.state.formController.faucetbalance,
        'firstgen': this.state.formController.firstgen,
        'secondgen': this.state.formController.secondgen,
        'privilegeLevel': this.state.formController.privilegeLevel
      }
      console.log(_mTSZ);
      ServiceAuth.edituserasadmin(_mTSZ).then(response => {
        const data = response.data;
        console.log(data);
        var _a = alert('Changes saved.');
        if(_a) {
            window.location.reload();
        }
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
       {
         this.state.user == null ? null :  <div className='bp-middle-all bp-blueshadow'>
            <p className='loginTitle'>Manage user: {this.state.user.username}</p>
            <div className='eucont'>
              <div
              style={{
                textAlign: 'center'
              }}
              className='euconta'>
                 <div className='inputhold'>
                    <p style={{fontSize: '18px'}}>Username: <input name='username' style={{height: '10px'}} type='text' onChange={this.handleInputChange} value={this.state.formController.username}/></p>
                  </div>
                  <div className='inputhold'>
                    <p style={{fontSize: '18px'}}>Email: <input name='email' style={{height: '10px'}} type='email' onChange={this.handleInputChange} value={this.state.formController.email}/></p>
                  </div>
                  <div className='inputhold'>
                    <p style={{fontSize: '18px'}}>Points: <input name='points' style={{height: '10px'}} type='number' onChange={this.handleInputChange} value={this.state.formController.points}/></p>
                  </div>
                  <div className='inputhold'>
                    <p style={{fontSize: '18px'}}>Balance Faucet: <input name='faucetbalance' style={{height: '10px'}} type='number' onChange={this.handleInputChange} value={this.state.formController.faucetbalance}/></p>
                  </div>
                  <div className='inputhold'>
                    <p style={{fontSize: '18px'}}>1st Gen %: <input name='firstgen' style={{height: '10px'}} type='number' onChange={this.handleInputChange} value={this.state.formController.firstgen}/></p>
                  </div>
                  <div className='inputhold'>
                    <p style={{fontSize: '18px'}}>2nd Gen %: <input name='secondgen' style={{height: '10px'}} type='number' onChange={this.handleInputChange} value={this.state.formController.secondgen}/></p>
                  </div>
                  {
                    this.state.formController.privilegeLevel == '999' ?
                    <input
                  value="Remove admin"
                  type='submit'
                  onClick={() => {
                    var _fC = this.state.formController;
                    _fC.privilegeLevel = 0;
                    this.setState({
                      formController: _fC
                    }, () => {
                      this._editPressed()
                    })
                  }}
                  className='loginSubmit '
                /> :  <input
                value="Make admin"
                type='submit'
                onClick={() => {
                  var _fC = this.state.formController;
                    _fC.privilegeLevel = 999;
                    this.setState({
                      formController: _fC
                    }, () => {
                      this._editPressed()
                    })
                }}
                className='loginSubmit '
              />
                  } <br/><br/>
                  <input
                  value="Save"
                  type='submit'
                  onClick={() => this._editPressed()}
                  className='loginSubmit '
                />
              </div>
            </div>
            <div className='clearfix'/>
        </div>
       }
          <div className='clearfix'/>
        </div>


      <style jsx>{`
      .euconta {
        width: 100%;
        float: left;
      }

      @media screen and (max-width: 800px){
        .euconta,  {
          width: 100%;
        }
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
