import React, { useState, useEffect } from 'react';
import Marquee from 'react-double-marquee';
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from 'next/router'
import BasePage from '../components/BasePage';
export default class Home extends React.Component {
  
  constructor() {
    super();
    this.state = {
      errorForm: null,
      formController: {
        username: '',
        password: ''
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

   onChangeCaptcha = value => {
    console.log(value);
  }

  _loginPressed = () => {
    console.log(this.state.formController);
  }
  
  render() {
    return (
      <BasePage>
      <br/>
        <div className='bp-middle'>
          <div className='bp-middle-over'>
            <div className='bp-middle-all bp-blueshadow'>
                <p className='loginTitle'>Login</p>
              {/* <form autoComplete="off"> */}
  
                <div className='inputhold'>
                  <input  placeholder="Username" name='username' type='text' value={this.state.formController.username} onChange={this.handleInputChange}/>
                  <img  role="img" src="https://cdn.onlinewebfonts.com/svg/img_189000.png" />
                </div>
                <div className='inputhold'>
                  <input type='password' placeholder="Password" name='password' onChange={this.handleInputChange} value={this.state.formController.password}/>
                  <img role="img" src="https://cdn.onlinewebfonts.com/svg/img_398183.png" />
                </div>
                <div className='captchaHolder'>
                  <ReCAPTCHA
                    sitekey="6LfbWw4aAAAAAK0WBoabYDbdNkJyk0MFjap-i8RM"
                    onChange={this.onChangeCaptcha}
                  />
                </div>
                
                 <input
                  value="Login"
                  type='submit'
                  onClick={() => this._loginPressed()}
                  className='loginSubmit '
                />
  
  
              {/* </form> */}
              <p className='loginSignup'>Don't have an account? <a href="/signup">Sign Up</a></p>
              <p className='loginSignup'><a href="/pwdreset">I have forgotten my password</a></p>
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
