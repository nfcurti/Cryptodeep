import React, { useState, useEffect } from 'react';
import Marquee from 'react-double-marquee';

import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from 'next/router'
import BasePage from '../components/BasePage';
import ServiceAuth from '../services/ServiceAuth';
import ServiceCookies from '../services/cookies';
import Translator from '../services/translator';
export default class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      errorForm: null,
      formController: {
        username: '',
        password: '',
        repeatPassword: '',
        email: ''
      },
      //Lang
      translatorData: [],
      currentLang: 'en',
      refBy: ''
    }
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

  componentDidMount() {
    this._loadLang();
    const userCookies = ServiceCookies.getUserCookies();
            if(userCookies['ckuserid'] != null && userCookies['cktoken'] != null) {
                window.location.replace(`/cryptodeep/account`)
            };

            const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(urlParams.has('ref')) { 
      ServiceCookies.saveRefCookies({
        'ckref': urlParams.get('ref')
      });
      this.setState({
        refBy: urlParams.get('ref')
      })
    }else{
      const refCo = ServiceCookies.getRefCookies();
            if(refCo['ckref'] != null) {
              console.log(refCo['ckref']);
              this.setState({
                refBy: refCo['ckref']
              })
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

  _regiserPressed = () => {
    console.log(this.state.formController);
    if(this.state.formController.username.length < 3 || this.state.formController.password.length < 3 ||
        this.state.formController.repeatPassword.length < 3 || this.state.formController.email.length < 3) {
      alert('One or more fields are missing or invalid.');
      return;
    }

    if(this.state.formController.password != this.state.formController.repeatPassword) {
      alert('Password doesn\'t match');
      return;
    }

    ServiceAuth.signup({
      "username": this.state.formController.username,
      "password": this.state.formController.password,
      "repeatpassword": this.state.formController.repeatPassword,
      "email": this.state.formController.email,
      "ref": this.state.refBy
    }).then(response => {
      const data = response.data;
      // console.log(data);
      const saveCookie = ServiceCookies.saveUserCookies({
        ckuserid: data.data.user._id,
        cktoken: data.data.token,
        ckprivilege: data.data.user.privilegeLevel
      })
      if(saveCookie) {
        window.location.replace(`/cryptodeep/account`)
      }
    }).catch(e => {
      var _content = 'One or more fields are empty';
      console.log(e);
      if(e.response.status == 404 || e.response.status == 401) {
        _content = 'Username or email already taken'
      }
      alert(_content);
      return;
    })
  }
  render() {

  return (
    <BasePage
        currentLang={this.state.currentLang}
        translatorData={this.state.translatorData}
      >
    <br/>
      <div className='bp-middle'>
        <div className='bp-middle-over'>
          <div className='bp-middle-all bp-blueshadow'>
              <p className='loginTitle'>{Translator.getStringTranslated('register_title', this.state.currentLang, this.state.translatorData)}</p>
            {/* <form autoComplete="off"> */}

              <div className='inputhold'>
                <input  placeholder={Translator.getStringTranslated('login_username', this.state.currentLang, this.state.translatorData)} name='username' type='text' onChange={this.handleInputChange} value={this.state.formController.username}/>
                <img  role="img" src="https://cdn.onlinewebfonts.com/svg/img_189000.png" />
              </div>

              <div className='inputhold'>
                <input type='password' placeholder={Translator.getStringTranslated('acc_currentpassword', this.state.currentLang, this.state.translatorData)} name='password' onChange={this.handleInputChange} value={this.state.formController.password}/>
                <img role="img" src="https://cdn.onlinewebfonts.com/svg/img_398183.png" />
              </div>

              <div className='inputhold'>
                <input type='password' placeholder={Translator.getStringTranslated('acc_repeatpass', this.state.currentLang, this.state.translatorData)} name='repeatPassword' onChange={this.handleInputChange} value={this.state.formController.repeatPassword}/>
                <img role="img" src="https://cdn.onlinewebfonts.com/svg/img_398183.png" />
              </div>

              <div className='inputhold'>
                <input  placeholder={Translator.getStringTranslated('login_email', this.state.currentLang, this.state.translatorData)} name='email' type='email' onChange={this.handleInputChange} value={this.state.formController.email} />
                <img  role="img" src="https://upload.wikimedia.org/wikipedia/commons/d/d8/At_Sign_Nimbus.svg" />
              </div>
              
              <div className='inputhold terms'>
                <input  type="checkbox" id="agree" />
                <label className="loginTerms" htmlFor="agree">
                  <a href="">{Translator.getStringTranslated('register_acceptterms', this.state.currentLang, this.state.translatorData)}</a>
                </label>
              </div>
              <input
                value={Translator.getStringTranslated('register_button', this.state.currentLang, this.state.translatorData)}
                type='submit'
                onClick={() => this._regiserPressed()}
                className='loginSubmit '
              />


            {/* </form> */}
            <p className='loginSignup'><a href="/cryptodeep/login">{Translator.getStringTranslated('login_loginlink', this.state.currentLang, this.state.translatorData)}</a></p>
          </div>
          <div className='clearfix'/>
        </div>
      </div><br/><br/><br/>
      {/* <p>Hola</p> */}
      <style jsx>{`
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
                    width:50% !important;
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
    </BasePage>
  );
  }
}
