import React, { useState, useEffect } from 'react';
import Marquee from 'react-double-marquee';
import ReactStars from "react-rating-stars-component";

import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from 'next/router'
import BasePage from '../components/BasePage';
import ServiceAuth from '../services/ServiceAuth';
import ServiceCookies from '../services/cookies';
import Translator from '../services/translator';
import { PaginatedList } from 'react-paginated-list';
export default class Home extends React.Component {


  constructor() {
    super();
    this.state = {
      showingpros: true,
      userid: '',
      item: null,
      reviews: [],
      formController: {
        scoregiven: 3.5,
        message: ''
      },
      //Lang
      translatorData: [],
      currentLang: 'en'
    }
  }

  _loadLang = () => {
    const langCookies = ServiceCookies.getLangCookies();
    this.setState({
        currentLang: langCookies['cklang']
    })
    ServiceAuth.getlanguagedataset({
      
    }).then(response => {
      const data = response.data;
      console.log(data);
      if(data.data.items != null) {
          this.setState({
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
    // const userCookies = ServiceCookies.getUserCookies();
        // if(userCookies['ckuserid'] == null && userCookies['cktoken'] == null) {
        //     window.location.replace(`/account`)
        // }else{
          // this.setState({
          //   userid: userCookies['ckuserid']
          // })
          const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);

                if(!urlParams.has('id')) {
                    window.location.replace(`/cryptodeep/reviews`)
                    return;
                }
                var _idToFetch = urlParams.get('id'); 
                ServiceAuth.getreviewitems({
                    // "token": userCookies['cktoken']
                  }).then(response => {
                    const data = response.data;
                    console.log(data);
                    if(data.data.items != null) {
                        if(data.data.items.filter(i => i._id == _idToFetch).length == 0) {
                            window.location.replace(`/cryptodeep/reviews`)
                        }

                        var _itemX = data.data.items.filter(i => i._id == _idToFetch)[0];
                        var _temp = _itemX.description
                        if(_temp.charAt(0) == "\"") {
                          _temp = _temp.substring(1, _temp.length);
                      }
                      if(_temp.charAt(_temp.length - 1) == "\"") {
                          _temp = _temp.substring(0, _temp.length - 1);
                      }
                      _itemX.description = _temp
                        
                        ServiceAuth.getreviews({
                          // "token": userCookies['cktoken'],
                          'reviewid': _itemX.uniqueid
                        }).then(response => {
                          const dataz = response.data;
                          console.log(dataz);
                          this.setState({
                            item: _itemX,
                            reviews: dataz.data.items
                        })
                        })
                        
                    }
                  }).catch(e => {
                    console.log(e);
                    alert(e);
                    return;
                  })
        // };

       
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    const controller = this.state.formController;
    controller[name] = value;
    this.setState({
      formController: controller
    })
  }

  doReview = () => {
    if(this.state.formController.message == '') {
      var _a = confirm('Are you sure you want to send the review without a message?');
      if(!_a) { return; }
    }

    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null || userCookies['cktoken'] == null) {
        window.location.replace(`/cryptodeep/login`)
    }else{
      
      const _mTSZ = {
        'token': userCookies['cktoken'],
        'reviewid': this.state.item.uniqueid,
        'userid': userCookies['ckuserid'],
        'message': this.state.formController.message,
        'scoregiven': this.state.formController.scoregiven
      }
      console.log(_mTSZ);
      ServiceAuth.doreview(_mTSZ).then(response => {
        const data = response.data;
        console.log(data);
        window.location.replace(`/cryptodeep/single?id=${this.state.item._id}`);
      }).catch(e => {
        console.log(e);
        alert(Translator.getStringTranslated('sng_already', this.state.currentLang, this.state.translatorData));
        return;
      })
    }
  }

  render() {
    return (
      <BasePage
        currentLang={this.state.currentLang}
        translatorData={this.state.translatorData}
        bgc={'#34334E'}
      >
        {
          this.state.item == null ? null :
          <>
            <div 
        style={{
          width: '100%',
          height: '170px',
          backgroundColor: '#1E1D32'
        }}
      />
      <div 
        style={{
          width: '100%',
          height: '60px',
          backgroundColor: '#34334E'
        }}
      />
      <div
        style={{
          height: '150px',
          border: '3px solid orange',
          position: 'absolute',
          width: '300px',
          top: '120px',
          left: '100px',
          backgroundColor: 'white',
        }}
      >
        <img style={{
          textAlign: 'center',
          margin: 'auto',
          marginTop: '5%',
          height: '80%',
          display: 'block',
        }} src={`data:image/png;base64,${this.state.item.iconurl}`}/>
        
      </div>
      <p style={{
        fontWeight: 'bold',
        color: 'orange',
        margin: '0px',
        marginLeft: '10%',
        marginBottom: '20px',
        fontSize: '36px',
        fontFamily: 'Nunito'
      }}>
        {this.state.item.title} ({this.state.item.score}<img style={{height:"30px", marginTop: '2px'}}src={'https://upload.wikimedia.org/wikipedia/commons/a/a3/Orange_star.svg'} />)
      </p>
      <div style={{display:'flex',width:"fit-content",float:'left',marginTop:'-40px', fontFamily: 'Nunito', marginLeft: '10%'}}>
          <span style={{marginTop: '20px',fontSize: '30px', marginRight:'0.2em',fontWeight:'bold', color: 'white'}}>{this.state.reviews.filter(r => r.reviewid == this.state.item.uniqueid).length} ({this.state.reviews.filter(r => r.reviewid == this.state.item.uniqueid).length == 0 ? '-' : this.state.reviews.filter(r => r.reviewid == this.state.item.uniqueid).reduce((acc, r) => acc+r.scoregiven, 0) / this.state.reviews.filter(r => r.reviewid == this.state.item.uniqueid).length})</span>
          <ReactStars
              count={5}
              size={50}
              value={this.state.reviews.filter(r => r.reviewid == this.state.item.uniqueid).reduce((acc, r) => acc+r.scoregiven, 0) / this.state.reviews.filter(r => r.reviewid == this.state.item.uniqueid).length}
              edit={false}
              isHalf={true}
              activeColor="#ffd700"
            />
        </div>
        <div className='clearfix'/>
      <div style={{
        color: '#1E1D32',
        marginLeft: '5%',
        marginRight: '5%',
        fontFamily: 'Nunito',
        fontSize: '16px'
      }}>
         <a href={this.state.item.siteurl}><input onClick={() => {

         }} type='submit' style={{textAlign:"right", textTransform: 'uppercase', backgroundColor: 'purple', color: '#61E667', fontWeight: '800', borderRadius: '4px', fontSize: '14px'}} value={Translator.getStringTranslated('sng_visit', this.state.currentLang, this.state.translatorData)} /></a>
          <input onClick={() => {
            window.scrollTo(0,document.body.scrollHeight);
}} type='submit' style={{marginLeft: '20px', textAlign:"right", textTransform: 'uppercase', backgroundColor: 'purple', color: 'white', fontWeight: '700', borderRadius: '4px'}} value={Translator.getStringTranslated('sng_leavereview', this.state.currentLang, this.state.translatorData)} />

      
      <h2 style={{
        fontSize: '36px',
        color: '#61E667'
      }}>{Translator.getStringTranslated('global_description', this.state.currentLang, this.state.translatorData)}</h2>
      {
              this.state.item.description == ''
              ? null :
              <div
              className='innerhtmlx'
              dangerouslySetInnerHTML={{
                __html: this.state.item.description
              }}></div>
            }
            <br/>
            <div
            className='clickablee'
            onClick={() => {
              this.setState({
                showingpros: true
              })
            }}
              style={{
                float: 'left',
                width: '200px',
                border: '2px solid #252540',
                // paddingLeft: '20px',
                lineHeight: 'null',
                paddingTop: '10px',
                paddingBottom: '4px',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
                backgroundColor: !this.state.showingpros ? 'purple' : 'white',
                color: !this.state.showingpros ? '#61E667' : 'purple'
              }}
            >
            <h2 style={{
        fontSize: '30px',
        textTransform: 'uppercase',
        margin: '0px',
        textAlign: 'center',
      }}>{Translator.getStringTranslated('sng_pros', this.state.currentLang, this.state.translatorData)}</h2>
      
            </div>
            <div
            className='clickablee'
            onClick={() => {
              this.setState({
                showingpros: false
              })
            }}
              style={{
                float: 'left',
                width: '200px',
                border: '2px solid #252540',
                // paddingLeft: '20px',
                lineHeight: 'null',
                paddingTop: '10px',
                paddingBottom: '4px',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
                backgroundColor: this.state.showingpros ? 'purple' : 'white',
                color: this.state.showingpros ? '#61E667' : 'purple'
              }}
            >
            <h2 style={{
        fontSize: '30px',
        textTransform: 'uppercase',
        margin: '0px',
        textAlign: 'center'
      }}>{Translator.getStringTranslated('sng_cons', this.state.currentLang, this.state.translatorData)}</h2>
      
            </div>
            <div className='clearfix'/>
            <div
              style={{
                width: '100%',
                borderRadius: '4px',
                paddingLeft: '20px',
              }}
            >
              {
                this.state.showingpros ?
                this.state.item.pros == ''
              ? null :
              <div
              className='innerhtmlxpros'
              style={{
                backgroundImage: 'url("images/bg_green.png")',
                backgroundSize: '3px 85%',
                backgroundPositionX: '9px',
                backgroundPositionY: '20px',
                backgroundRepeat: 'no-repeat'
              }}
              dangerouslySetInnerHTML={{
                __html: this.state.item.pros
              }}></div>
              : 
              this.state.item.cons == ''
              ? null :
              <div
              className='innerhtmlxcons'
              style={{

                backgroundImage: 'url("images/bg_red.png")',
                backgroundSize: '3px 85%',
                backgroundPositionX: '9px',
                backgroundPositionY: '20px',
                backgroundRepeat: 'no-repeat'
              }}
              dangerouslySetInnerHTML={{
                __html: this.state.item.cons
              }}></div>
              }
            </div>
            <br/>
            <div className='clearfix'/>
     
            <br/>
      </div>
          </>
        }
      
      <br/>
      
        { this.state.item == null ? null : <div className='bp-middle'>
          
        <div className='bp-middle-over bgc'>
        <h2 style={{
        fontSize: '36px',
        color: '#61E667',
        textAlign: 'left',
        fontFamily: 'Nunito',
        marginLeft: '5%'
      }}>{Translator.getStringTranslated('sng_latestreviews', this.state.currentLang, this.state.translatorData)}</h2>
       
            <div className='bp-middle-all bp-blueshadow latest_rev bgc' style={{
              backgroundColor: '#1E1D32',
              margin: '0px',
              width: '90%',
              paddingLeft: '5%',
              paddingRight: '5%'
            }}>
         <p className='loginTitle' style={{color: 'white', fontSize:'17px', textAlign: 'left', marginTop: '20px'}}>{Translator.getStringTranslated('sng_latestreviewssub', this.state.currentLang, this.state.translatorData)} </p>
                
            <PaginatedList
              list={this.state.reviews.filter(r => r.message != "")}
              itemsPerPage={25}
              renderList={(listx) => (
                <>
                  
               {
                 listx.map((item, id) => {
                  return <div>
                <div key={id} className='scores'>
                <ReactStars
                          count={5}
                      edit={false}
                          size={18}
                          value={item.scoregiven}
                          isHalf={true}
                          activeColor="#ffd700"
                        />
                      <p style={{marginTop:'1.3em', fontSize: '14px',  color: 'white'}}>{Translator.getStringTranslated('sng_by', this.state.currentLang, this.state.translatorData)} {item.username} - {Translator.getStringTranslated('global_date', this.state.currentLang, this.state.translatorData)}: {item.created_at.replace('T', ' ').substring(0, 16)}</p>
                    </div>
                 <p style={{marginTop:'1.3em', fontSize: '20px',  color: '#61E667', textAlign: 'left'}}>{item.message}</p>
                    {/* <div className='inputhold' style={{marginBottom: '-1em'}}>
                      <textarea style={{resize:'none'}} readonly type='text'  value={item.message} name='comment' rows={5}/>
                    </div> */}
                     <hr style={{backgroundColor: '#f5a500',height: '1px', border:'none'}}/>
                </div>
                 })
               }
                
                   
                </>
              )}
            />  
            </div>
            <br/>
            <h2 style={{
        fontSize: '36px',
        color: '#61E667',
        textAlign: 'left',
        fontFamily: 'Nunito',
        marginLeft: '5%',
        lineHeight: '80px'
      }}>
      <br/>{Translator.getStringTranslated('sng_leavereview', this.state.currentLang, this.state.translatorData)}</h2>
            {
              this.state.reviews.filter(r => r.userid == this.state.userid).length == 0 ?
              <div className='bp-middle-all bp-blueshadow' style={{
                backgroundColor: '#1E1D32',
              margin: '0px',
              width: '90%',
              paddingLeft: '5%',
              paddingRight: '5%'
              }}>
                <p className='loginTitle' style={{color: '#61E667', fontSize:'17px', textAlign: 'left'}}>{Translator.getStringTranslated('sng_leavereviewsub', this.state.currentLang, this.state.translatorData)} </p>
                {/* <form> */}
                <div className='scores'>
                    <label style={{
                      color: 'white',
                      fontSize: '14px'
                    }}>{Translator.getStringTranslated('sng_score', this.state.currentLang, this.state.translatorData)}</label>
                    <ReactStars
                          onChange={(val) => {
                            var _fC = this.state.formController;
                            _fC.scoregiven = val;
                            this.setState({
                              formController: _fC
                            })
                          }}
                          count={5}
                          size={30}
                          value={3.8}
                          isHalf={true}
                          activeColor="#ffd700"
                        />
                    </div>
                    {/* <div className='inputhold' style={{marginBottom: '-1em'}}>
                      <label>Email Address</label>
                      <input type='text'  placeholder="info@cryptodeep.com" name='email' />
                    </div> */}
                    <div className='inputhold' style={{marginBottom: '-1em'}}>
                      <label style={{
                        fontSize: '14px',
                        color: 'white'
                      }}>{Translator.getStringTranslated('sng_comm', this.state.currentLang, this.state.translatorData)}</label>
                      <textarea type='text' style={{resize: 'none'}} placeholder={Translator.getStringTranslated('sng_comm_place', this.state.currentLang, this.state.translatorData)} name='message' onChange={this.handleInputChange} value={this.state.formController.message} rows={5}/>
                    </div>
                    <input onClick={() => this.doReview()} type='submit' style={{textAlign:"right", textTransform: 'uppercase'}} value={Translator.getStringTranslated('sng_send_rev', this.state.currentLang, this.state.translatorData)} />
                {/* </form> */}
            </div> : 
            <div className='bp-middle-all bp-blueshadow'>
            <p className='loginTitle'>{Translator.getStringTranslated('sng_already', this.state.currentLang, this.state.translatorData)} </p>
            <p className='loginTitle' style={{fontSize:'1em',marginTop:'-2em'}}>{Translator.getStringTranslated('sng_alreadysub', this.state.currentLang, this.state.translatorData)} </p>
            {/* <form> */}
            {/* </form> */}
        </div>
            }
             
            

           
            
            
            <div className='clearfix'/>
          </div>
        </div> }
        
        <br/><br/><br/>
        {/* <p>Hola</p> */}
        <style jsx>{`

  html {
    background-color: white;
  }
        
          input[type="submit"]:hover{opacity:0.8}
          input[type="submit"]{text-align:center !important;cursor: pointer;
    width: 18em;
    text-align: center;
    background: #f5a500;
    border-radius: 2em;}
          .scores{    text-align: initial;
    margin-left: 0.2em;margin-bottom:1em}
          .inputhold label{margin-left: 0.2em;
    float: left;}
                    .qty_com{
                          font-size: 1em;
                    position: absolute;
                    font-family: 'Nunito';
                    padding: 1em;
                    background: #00000050;
                    border-radius: 2em;
                    margin-top: -4.7em;
                    margin-left: 8.8em; 
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
                    right: 10%;
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

                height: 6em;
                background-color:#252540;
                border-radius:3px;
                margin:0.5em;
                padding:0.5em;
                display:flex;
                font-family:"Nunito"
              }
              .bp-reviewbox{
                display: flex;
                width:100%;
                height:10.5em;
                border-top:none;
                margin:auto;
                margin-bottom:-2em
              }
                    .imgbox{padding:1em}
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
                          width: 40%;
                        margin-bottom: 2em;
                    }
                    .loginSignup {font-size:1em;margin-top:2em!important;font-weight:600;color:white;}
                    .loginSignup a{font-size:1em;margin-top:2em!important;font-weight:600;color:white;}
  
                    .bp-middle-over {
                      padding: 0% 0%;
                      width: 100%;
                    }
  
                    inputhold{
                      position:relative
                    }
                    .imgsm{
                          width: 4em;
                    }
  
                   form{
                    width:87%;
                    margin:0 auto;
                   }
  
                   input, textarea{
                    font-family:'nunito';
                  outline:none;
                  width: fill-available;
                  padding: 10px;
                  margin-bottom: 2em;
                  color:#161526;
                  border-radius:3px;
                  border-style:solid;
                  border: 1px solid #161526;
                  margin-top:0.3em}
                  input::placeholder{
                  color:gray;

                }
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
                    // margin: 0% 10%;
                    margin: 0px;
                    width: 100%;
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

                  .latest_rev{
                    margin-left: 5%;
                  }
  
                  @media screen and (max-width: 800px){
                    .latest_rev{margin-top: 15em !important; margin-left: 3% !important;}
                    .bp-blueshadow{    margin-top: 3em; margin-left: 3%;}
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
                      margin-left: 1.4em;}
                    .imgsm_box{display: inherit !important;}
                    .bp-middle-left, .bp-middle-left-sub {
                      width: 90%;
                    }
                  }
  
                  .bp-blueshadow {
                    margin-left: 5%;
                    background: #252540;
                    // box-shadow: 0px 0px 20px rgba(0,0,0,0.4);
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
  
                  }

                  
              `}</style>
      </BasePage>
    );
  }
}
