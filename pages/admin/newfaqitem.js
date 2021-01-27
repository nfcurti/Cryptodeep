import React, { useState, useEffect } from 'react';
import Marquee from 'react-double-marquee';

import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from 'next/router'
import BaseAdminPage from '../../components/BaseAdminPage';
import ServiceAuth from '../../services/ServiceAuth';
import ServiceCookies from '../../services/cookies';
import { PaginatedList } from 'react-paginated-list';
import ReactStars from "react-rating-stars-component";
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';

export default class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      formController: {
          question: '',
          answer: '',
          importance: ''
      }
    }
  }

  componentDidMount() {
    const userCookies = ServiceCookies.getUserCookies();
        if(userCookies['ckuserid'] == null && userCookies['cktoken'] == null) {
            window.location.replace(`/account`)
        }else{
            if(userCookies['ckpl'] != '999') {
            window.location.replace(`/account`)
            }else{
                
            }
        };

       
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    const controller = this.state.formController;
    controller[name] = value;
    this.setState({
      formController: controller
    })
  }

  addReviewPressed = () => {
    

    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null || userCookies['cktoken'] == null) {
        window.location.replace(`/login`)
    }else{
      if(userCookies['ckpl'] != '999') { return; }

      var _mTSZ = {
        'token': userCookies['cktoken'],
      }
      if(this.state.formController.question.length > 0) {
          _mTSZ.question = this.state.formController.question;
      }
      if(this.state.formController.answer.length > 0) {
          _mTSZ.answer = this.state.formController.answer;
      }
      if(this.state.formController.importance.length > 0) {
          _mTSZ.importance = this.state.formController.importance;
      }
      console.log(_mTSZ);
      ServiceAuth.addfaqitem(_mTSZ).then(response => {
        const data = response.data;
        console.log(data);
        window.location.replace('/admin/faqs');
      }).catch(e => {
        console.log(e);
        alert('There was an error with the request.');
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
                <p className='loginTitle'>New FAQ Item</p>
                <div className='eucont'>
              <div
              style={{
                textAlign: 'center'
              }}
              className='euconta'>

        <div className='inputhold'>
            <p style={{fontSize: '18px'}}>Question: <br/><input name='question' style={{height: '10px',
            width: '90%'
        }} type='text' onChange={this.handleInputChange} value={this.state.formController.question}/></p>
        </div>
        <div className='inputhold'>
            <p style={{fontSize: '18px'}}>Answer: <br/><input name='answer' style={{height: '10px',
            width: '90%'
        }} type='text' onChange={this.handleInputChange} value={this.state.formController.answer}/></p>
        </div>
        <div className='inputhold'>
            <p style={{fontSize: '18px'}}>Importance: <br/><input name='importance' style={{height: '10px',
            width: '90%'
        }} type='text' onChange={this.handleInputChange} value={this.state.formController.importance}/></p>
        </div>

                  </div>
                  </div>
                <input
                style={{
                  marginTop: '140px'
                }}
                  value="Save"
                  type='submit'
                  onClick={() => this.addReviewPressed()}
                  className='loginSubmit '
                />
                <br/>
                <br/>
                <input
                  value="Back"
                  type='submit'
                  onClick={() => {
                    window.location.replace('/admin/faqs');
                  }}
                  className='loginSubmit '
                />
            </div>
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
                              }
            
                             form{
                              width:87%;
                              margin:0 auto;
                             }
            
                             input, textarea{
                                  width: 15.5em;
                              padding: 15px;
                              margin-bottom: 2em;
                                color:white;
                              border-radius:3px;
                              border-style:solid;
                              border: 1px solid white;
                              background-color:transparent}
            
                              input:focus, textarea:focus{
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
            
                              input, textarea{
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
