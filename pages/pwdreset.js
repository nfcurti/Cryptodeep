import React, { useState, useEffect } from 'react';
import Marquee from 'react-double-marquee';

import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from 'next/router'
import BasePage from '../components/BasePage';
import ServiceAuth from '../services/ServiceAuth';
export default class Home extends React.Component {


  constructor() {
    super();
    this.state = {
      errorForm: null,
      formController: {
        email: ''
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

  _resetPasswordPressed = () => {
    console.log(this.state.formController);
    if(this.state.formController.email.length < 3) {
      alert('One or more fields are missing or invalid.');
      return;
    }

    ServiceAuth.resetpassword({
      "email": this.state.formController.email
    }).then(response => {
      const data = response.data;
      // console.log(data);
      const alertAcc = alert('We\'ve sent you an email to recover your password')
      if(alertAcc) {
        window.location.replace(`/`)
      }
    }).catch(e => {
      var _content = 'One or more fields are empty';
      console.log(e);
      if(e.response.status == 404 || e.response.status == 401) {
        _content = 'Invalid email'
      }
      alert(_content);
      return;
    })
  }

  render() {
    return (
      <BasePage>
      <br/>
        <div className='bp-middle'>
          <div className='bp-middle-over'>
            <div className='bp-middle-all bp-blueshadow'>
                <p className='loginTitle'>Reset password</p>
              {/* <form autoComplete="off"> */}
  
                
                <div className='inputhold'>
                  <input  placeholder="Email" name='email' type='email' onChange={this.handleInputChange} value={this.state.formController.email}/>
                  <img  role="img" src="https://upload.wikimedia.org/wikipedia/commons/d/d8/At_Sign_Nimbus.svg" />
                </div>
                
                <input
                  value="Reset password"
                  type='submit'
                  onClick={() => this._resetPasswordPressed()}
                  className='loginSubmit '
                />
  
  
              {/* </form> */}
              <p className='loginSignup'>Don't have an account? <a href="/signup">Sign Up</a></p>
              <p className='loginSignup'><a href="/login">Already have an account</a></p>
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
