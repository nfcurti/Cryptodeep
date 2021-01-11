import React, { useState, useEffect } from 'react';
import Marquee from 'react-double-marquee';
import ReactStars from "react-rating-stars-component";

import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from 'next/router'
import BasePage from '../components/BasePage';
import ServiceAuth from '../services/ServiceAuth';
import ServiceCookies from '../services/cookies';
import { PaginatedList } from 'react-paginated-list';
export default class Home extends React.Component {


  constructor() {
    super();
    this.state = {
      userid: '',
      item: null,
      reviews: [],
      formController: {
        scoregiven: 3.5,
        message: ''
      }
    }
  }

  componentDidMount() {
    const userCookies = ServiceCookies.getUserCookies();
        if(userCookies['ckuserid'] == null && userCookies['cktoken'] == null) {
            window.location.replace(`/account`)
        }else{
          this.setState({
            userid: userCookies['ckuserid']
          })
          const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);

                if(!urlParams.has('id')) {
                    window.location.replace(`/reviews`)
                    return;
                }
                var _idToFetch = urlParams.get('id'); 
                ServiceAuth.getreviewitems({
                    "token": userCookies['cktoken']
                  }).then(response => {
                    const data = response.data;
                    console.log(data);
                    if(data.data.items != null) {
                        if(data.data.items.filter(i => i._id == _idToFetch).length == 0) {
                            window.location.replace(`/reviews`)
                        }

                        var _itemX = data.data.items.filter(i => i._id == _idToFetch)[0];
                        
                        ServiceAuth.getreviews({
                          "token": userCookies['cktoken'],
                          'reviewid': _itemX._id
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

  doReview = () => {
    if(this.state.formController.message == '') {
      var _a = confirm('Are you sure you want to send the review without a message?');
      if(!_a) { return; }
    }

    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null || userCookies['cktoken'] == null) {
        window.location.replace(`/login`)
    }else{
      
      const _mTSZ = {
        'token': userCookies['cktoken'],
        'reviewid': this.state.item._id,
        'userid': userCookies['ckuserid'],
        'message': this.state.formController.message,
        'scoregiven': this.state.formController.scoregiven
      }
      console.log(_mTSZ);
      ServiceAuth.doreview(_mTSZ).then(response => {
        const data = response.data;
        console.log(data);
        window.location.replace(`/single?id=${this.state.item._id}`);
      }).catch(e => {
        console.log(e);
        alert('You already reviewed this site');
        return;
      })
    }
  }

  render() {
    return this.state.item == null ? null : (
      <BasePage>
      <br/>
        <div className='bp-middle'>
          <div className='bp-middle-over'>
          <div className="bp-reviewbox">
              <div className="review">
                <div className="single-review"> 
                  <div style={{width:"fit-content"}}>
                    <img className='review-logo' src={this.state.item.iconurl}/>
                    <p className='review-score'>{this.state.item.score}<img style={{width:"1em",margin:"auto",marginLeft:"0.2em"}} className='crypto-icon' src={'https://upload.wikimedia.org/wikipedia/commons/a/a3/Orange_star.svg'} /></p>
                  </div>
                  <div style={{padding:"0.1em",maxWidth: '65%',marginLeft:"0.5em",marginTop:"-0.3em"}}>
                    <p style={{fontSize:"0.7em", fontWeight:"bold"}}>{this.state.item.title}</p>
                    <p style={{fontSize:"0.7em"}}>{this.state.item.description.length < 200 ? this.state.item.description : this.state.item.description.substring(0, 200)+'...'}</p>
                    <div style={{display:'flex',width:"fit-content",float:'left',marginTop:'initial'}}>
                    <span style={{marginRight:'0.2em',fontWeight:'bold'}}>{this.state.reviews.filter(r => r.reviewid == this.state.item._id).length} ({this.state.reviews.filter(r => r.reviewid == this.state.item._id).length == 0 ? '-' : this.state.reviews.filter(r => r.reviewid == this.state.item._id).reduce((acc, r) => acc+r.scoregiven, 0) / this.state.reviews.filter(r => r.reviewid == this.state.item._id).length})</span>
                   <ReactStars
                       count={5}
                       size={14}
                       value={this.state.reviews.filter(r => r.reviewid == this.state.item._id).reduce((acc, r) => acc+r.scoregiven, 0) / this.state.reviews.filter(r => r.reviewid == this.state.item._id).length}
                       edit={false}
                       isHalf={true}
                       activeColor="#ffd700"
                     />
                  </div>

                  </div><div className="end-review">
                  
                  <p className='qty_com'>{this.state.reviews.filter(r => r.message != '').length} Messages</p>
                  <br/>
                  
                  <div onClick={() => {
                    const tab = window.open(this.state.item.siteurl, '_blank');
                  }} style={{backgroundColor:"#353535",    borderRadius: '1em',width: '10em'}} className="inside-end-review" >
                    <p style={{textAlign:"right"}}>SITE</p>
                  </div>
                </div>
  
                
                  </div>
              </div>
            </div>

            <div className='bp-middle-all bp-blueshadow'>
            <p className='loginTitle'>{this.state.item.title} </p>
            {
              this.state.item.description == ''
              ? null :
              <div
              dangerouslySetInnerHTML={{
                __html: this.state.item.description
              }}></div>
            }
        </div>

        <div className='bp-middle-all bp-blueshadow' style={{
          textAlign: 'left'
        }}>
            <p className='loginTitle' style={{
              textAlign: 'center'
            }}>Pros </p>
            {
              this.state.item.pros == ''
              ? null :
              <div
              dangerouslySetInnerHTML={{
                __html: this.state.item.pros
              }}></div>
            }
        </div>

        <div className='bp-middle-all bp-blueshadow' style={{
          textAlign: 'left'
        }}>
            <p className='loginTitle' style={{
              textAlign: 'center'
            }}>Cons </p>
            {
              this.state.item.cons == ''
              ? null :
              <div
              dangerouslySetInnerHTML={{
                __html: this.state.item.cons
              }}></div>
            }
        </div>

            <div className='bp-middle-all bp-blueshadow latest_rev'>
            <p className='loginTitle'>Latest reviews </p>
                <p className='loginTitle' style={{fontSize:'1em',marginTop:'-2em'}}>This is what people think of this site </p>
                
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
                      <p style={{marginTop:'1em'}}>By {item.username} - Date: {item.created_at.replace('T', ' ').substring(0, 16)}</p>
                    </div>
                    <div className='inputhold' style={{marginBottom: '-1em'}}>
                      
                      <textarea style={{resize:'none'}} readonly type='text'  value={item.message} name='comment' rows={5}/>
                    </div>
                     <hr style={{backgroundColor: '#f5a500',height: '1px', border:'none'}}/>
                </div>
                 })
               }
                
                   
                </>
              )}
            />  
            </div>

            {
              this.state.reviews.filter(r => r.userid == this.state.userid).length == 0 ?
              <div className='bp-middle-all bp-blueshadow'>
                <p className='loginTitle'>Leave a review </p>
                <p className='loginTitle' style={{fontSize:'1em',marginTop:'-2em'}}>Let us know what you think about this site! </p>
                {/* <form> */}
                <div className='scores'>
                    <label>Your Score</label>
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
                      <label>Your Comment (Optional)</label>
                      <textarea type='text' style={{resize: 'none'}} placeholder="Leave your comment here" name='message' onChange={this.handleInputChange} value={this.state.formController.message} rows={5}/>
                    </div>
                    <input onClick={() => this.doReview()} type='submit' style={{textAlign:"right"}} value="SEND REVIEW" />
                {/* </form> */}
            </div> : 
            <div className='bp-middle-all bp-blueshadow'>
            <p className='loginTitle'>You already reviewed this site! </p>
            <p className='loginTitle' style={{fontSize:'1em',marginTop:'-2em'}}>Look for more sites to review and earn rewards! </p>
            {/* <form> */}
            {/* </form> */}
        </div>
            }
             
            

           
            
            
            <div className='clearfix'/>
          </div>
        </div><br/><br/><br/>
        {/* <p>Hola</p> */}
        <style jsx>{`
        
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
  
                    .bp-middle-over{
                      width:90% !important;
                      margin:0 auto !important;
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
                  color:white;
                  border-radius:3px;
                  border-style:solid;
                  border: none;
                  background-color:#161526;
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
