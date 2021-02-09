import React, { useState, useEffect } from 'react';
import Marquee from 'react-double-marquee';
import ReactStars from "react-rating-stars-component";
 
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from 'next/router'
import BasePage from '../components/BasePage';
import ServiceAuth from '../services/ServiceAuth';
import ServiceCookies from '../services/cookies';
import FeaturedReviews from '../components/FeaturedReviews';
import GamblePopup from '../components/gamblePopup';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Translator from '../services/translator';
import { PaginatedList } from 'react-paginated-list';
import Footer from '../components/Footer';
 
 
export default class Home extends React.Component {

  constructor(){
    super();
    this.state = {
      items: [],

      //Lang
      translatorData: [],
      currentLang: 'en'
    }
  }
 
  componentDidMount() {
    this._loadLang();

    ServiceAuth.getfaqitems({
      
    }).then(response => {
      const data = response.data;
      console.log(data);
      if(data.data.items != null) {
          this.setState({
              items: data.data.items
          })
      }
    }).catch(e => {
      console.log(e);
      alert(e);
      return;
    })

    const items = document.querySelectorAll(".accordion-button");
    var i;
    function toggleAccordion() {
      const itemToggle = this.getAttribute('aria-expanded');
 
      for (i = 0; i < items.length; i++) {
        items[i].setAttribute('aria-expanded', 'false');
      }
 
      if (itemToggle == 'false') {
        this.setAttribute('aria-expanded', 'true');
      }
    }
 
    items.forEach(item => item.addEventListener('click', toggleAccordion));
 
    
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
 
  render() {
    return (
      <BasePage 
      ftr={4}
      currentLang={this.state.currentLang}
      translatorData={this.state.translatorData}>
 
     
        <div className='bp-middle'>
             <div className='bp-middle-over'>
            <div className='bp-middle-all bp-blueshadow' style={{marginTop:'2em'}}>
                <div class="container">
                  <h2 className='faq-header'>Frequently Asked Questions</h2>
                 
                  

                  <div class="faq-content">
                   {
                    this.state.items.sort(function(a, b) {
                        return parseFloat(b.importance) - parseFloat(a.importance);
                    }).map(i => {
                      return <div className='faqx'>
                        <h2>{i.question ?? ""}</h2>
                    <p>{i.answer ?? ""}</p>
                    {
                      i.image == '' ? null :
                      <img  src={`data:image/png;base64,${i.image}`}/>
                    }
                    <br/>
                        </div>
                    })
                  }
                  </div>
                  
                  
                </div>
            </div>
 
            <div className='clearfix'/>
          </div>
        </div><br/><br/><br/>
        {/* <p>Hola</p> */}
          <div className='clearfix'/>
        <Footer/>
        <style jsx>{`
                    .customOverlay {
                      background: rgba(36, 123, 160, 0.7);
                    }
                    .customModal {
                      background: #b2dbbf;
                      max-width: 500px;
                      width: 100%;
                    }
                    .qty_com{
                          font-size: 0.6em;
                    position: absolute;
                    font-family: 'Nunito';
                    padding: 1em;
                    background: #00000050;
                    border-radius: 2em;
                    margin-top: -4.7em;
                    margin-left: 8.6em; 
                    }
                  .stars-review{
                    width:8em;
                    height:3em;
                    position:absolute;
                    margin-top: 5.5em;
                    display:flex;
 
                  }
                  .end-review{
                    height: 2em;
                    margin-top: 2.8em;
                    width: 10em;
                    position: absolute;
                    right: 8%;
                    display: -webkit-box;
                    display: -webkit-flex;
                    display: -ms-flexbox;
                    display: flex;
                                }
                  .inside-end-review{
                    width: 50%;
                    cursor:pointer
                  }
                  .inside-end-review p{
                    margin-top: 0.7em;
                    height: max-content;
                    font-size:0.7em;
                    font-weight:bold;
                    cursor:pointer;
                    text-align:center !important;
                        }
                  .review{
                    display:contents
                  }
                  .review-score{
                    background-color:#151524;
                    font-size:0.7em;
                    text-align:center;
                    padding:0.3em;
                    border-radius:3px;
                    margin-top:0em
                  }
                  .review-logo{
                    width:5em;
                  }
                  .single-review{
                        width: 100%;
 
                    height: 6.5em;
                    background-color:#252540;
                    border-radius:3px;
                    margin:0.5em;
                    padding:0.5em;
                    display:flex;
                    font-family:"Nunito";
                    margin-left: 4%;
                  }
                  .bp-reviewbox{
                    display: flex;
                    width:95%;
                    height:10.5em;
                    border-top:none;
                    margin: 0 auto;
                  }
                    .imgbox{padding:1em}
                    .imgboxsel {
                      background-color: #DC8614;
                    }
                    .imgbox:hover {cursor:pointer;
                          background-color: #DC8614;
                          -webkit-transition: background-color 1000ms linear;
                          -ms-transition: background-color 1000ms linear;
                          transition: background-color 1000ms linear;
                      }
                    .imgsm_box{width: fit-content;
                        display: flex;
                        margin: auto;}
                    .imgsm_box div{margin-right:2em;margin-left:2em;font-family='Nunito'}
                    .captchaHolder{
                      margin:0 auto;
                          width: 100%;
                        margin-bottom: 2em;
                    }
                    .loginSignup {font-size:1em;margin-top:2em!important;font-weight:600;color:white;}
                    .loginSignup a{font-size:1em;margin-top:2em!important;font-weight:600;color:white;}
 
                    .bp-middle-over {
                      margin: 0% 10%;
                      width: 80%;
                    }
 
                    inputhold{
                      position:relative
                    }
                    .imgsm{
                          width: 4em;
                          height: 4em;
                    }
 
                   form{
                    width:100%;
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
                    width: 100%;
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
                    .single-review div{margin: auto}
                    .end-review{height: 2em;
                      margin-top: 1.7em;
                      width: 10em;
                      display: flex;
                      margin: auto;
                      margin-top: 2.5em !important;}
                    .single-review{width: 95%;
                      height: 15em;
                      background-color: #252540;
                      border-radius: 3px;
                      margin: 0.5em;
                      padding: 0.5em;
                      display: -webkit-box;
                      display: -webkit-flex;
                      display: -ms-flexbox;
                      display: flow-root;
                      font-family: "Nunito";
                      margin-left: 2em;}
                    .imgsm_box{display: inherit !important;}
                    .bp-middle-left, .bp-middle-left-sub {
                      width: 100%;
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
                      width: 73% !important;
                    }
                  }

                  
body {
  color: #333;
  background: #fcfcfc;
  font-family: 'Raleway', sans-serif;
  overflow-x: hidden;
}

.faq-header{
  font-size: 42px;
  border-bottom: 1px dotted #ccc;
  padding: 24px;
}

.faq-content {
  margin: 0 auto;
}

.faq-question {
  padding: 20px 0;
  border-bottom: 1px dotted #ccc;
}

.panel-title {
  font-size: 24px;
  width: 100%;
  position: relative;
  margin: 0;
  padding: 10px 10px 0 48px;
  display: block;
  cursor: pointer;
}

.panel-content {
  font-size: 20px;
  padding: 0px 14px;
  margin: 0 40px;
  height: 0;
  overflow: hidden;
  z-index: -1;
  position: relative;
  opacity: 0;
  -webkit-transition: .4s ease;
  -moz-transition: .4s ease;
  -o-transition: .4s ease;
  transition: .4s ease;
}

.panel:checked ~ .panel-content{
  height: auto;
  opacity: 1;
  padding: 14px;
}

.plus {
  position: absolute;
  margin-left: 20px;
  margin-top: 4px;
  z-index: 5;
  font-size: 42px;
  line-height: 100%;
  -webkit-user-select: none;    
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  -webkit-transition: .2s ease;
  -moz-transition: .2s ease;
  -o-transition: .2s ease;
  transition: .2s ease;
}

.panel:checked ~ .plus {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}

.panel {
  display: none;
}
              `}</style>
      </BasePage>
    );
  }
}