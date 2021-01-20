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
        predictionaward: '',
        questionshoura: '',
        questionshourb: '',
        questionsaward: '',
        findtherobotaward: ''
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
                window.location.replace(`/account`)
            }else{
              if(userCookies['ckpl'] != '999') {
                window.location.replace(`/account`)
              }else{
                ServiceAuth.gamesettings({
                  "token": userCookies['cktoken']
                }).then(response => {
                  const data = response.data;
                  console.log(data);
                  var _formC = this.state.formController;
                  _formC.predictionaward = data.data.gamesettings.predictionaward;
                  _formC.questionshoura = data.data.gamesettings.questionshoura;
                  _formC.questionshourb = data.data.gamesettings.questionshourb;
                  _formC.questionsaward = data.data.gamesettings.questionsaward;
                  _formC.findtherobotaward = data.data.gamesettings.findtherobotaward;

                  this.setState({
                    settings: data.data.gamesettings,
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

    [
      'predictionaward',
      'questionshoura',
      'questionshourb',
      'questionsaward',
      'findtherobotaward'
    ].forEach(i => {
      if(this.state.formController[i].length == 0) {
        return alert(`${i} is empty`);
      }
  
      if(isNaN(this.state.formController[i])) {
        return alert(`${i} should be a number`);
      }
    })

    


    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null || userCookies['cktoken'] == null) {
        window.location.replace(`/login`)
    }else{
      if(userCookies['ckpl'] != '999') { return; }

      ServiceAuth.updategamesettings({
        "token": userCookies['cktoken'],
        "predictionaward": this.state.formController.predictionaward,
        "questionshoura": this.state.formController.questionshoura,
        "questionshourb": this.state.formController.questionshourb,
        "questionsaward": this.state.formController.questionsaward,
        'findtherobotaward': this.state.formController.findtherobotaward
      }).then(response => {
        const data = response.data;
        console.log(data);
        var _a = alert('Changes saved.');
        if(_a) {
            window.location.replace('/admin/game');
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
        <div className='bp-middle-all bp-blueshadow'>
                <p className='loginTitle'>Game Admin</p>
                {
                  this.state.settings == null ?
                  <p>Loading...</p> :
                  <div>
                    <h2>Questions Game Settings</h2>
                  <div className='inputhold'>
                    <p>Today's hour A: At <input  placeholder="0" name='questionshoura' type='number' onChange={this.handleInputChange} value={this.state.formController.questionshoura}/> hours</p>
                  </div>
                  <div className='inputhold'>
                    <p>Today's hour B: At <input  placeholder="0" name='questionshourb' type='number' onChange={this.handleInputChange} value={this.state.formController.questionshourb}/> hours</p>
                  </div>
                  <div className='inputhold'>
                    <p>Award amount (In faucets): <input  placeholder="Faucets" name='questionsaward' type='number' onChange={this.handleInputChange} value={this.state.formController.questionsaward}/> faucets</p>
                  </div>
                  <input
                  value="Save"
                  type='submit'
                  onClick={() => this._editGeneralSettings()}
                  className='loginSubmit '
                />
                <br/><br/>
                <input
                  value="Manage Questions"
                  type='submit'
                  onClick={() => {
                    window.location.replace('/admin/gamequestions')
                  }}
                  className='loginSubmit '
                />
                <br/>
                <hr/>
                <br/>
                <h2>Find The Robot Game Settings</h2>
                <div className='inputhold'>
                    <p>Award amount (In faucets): <input  placeholder="Faucets" name='findtherobotaward' type='number' onChange={this.handleInputChange} value={this.state.formController.findtherobotaward}/> faucets</p>
                  </div>
                  <input
                  value="Save"
                  type='submit'
                  onClick={() => this._editGeneralSettings()}
                  className='loginSubmit '
                />
                <br/>
                  <hr/>
                <br/>
                <h2>Prediction Game Settings</h2>
                  <div className='inputhold'>
                    <p>Award amount (In faucets): <input  placeholder="Faucets" name='predictionaward' type='number' onChange={this.handleInputChange} value={this.state.formController.predictionaward}/> faucets</p>
                  </div>
                  <input
                  value="Save"
                  type='submit'
                  onClick={() => this._editGeneralSettings()}
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
