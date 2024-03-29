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
    usdperpoint: 0,
      withdraws: []
    }
  }

  componentDidMount() {
    const userCookies = ServiceCookies.getUserCookies();
        if(userCookies['ckuserid'] == null && userCookies['cktoken'] == null) {
            window.location.replace(`/cryptodeep/account`)
        }else{
            if(userCookies['ckpl'] != '999') {
            window.location.replace(`/cryptodeep/account`)
            }else{
              const queryString = window.location.search;
                const urlParams = new URLSearchParams(queryString);

                if(urlParams.has('accept')) {
                    this._acceptWithdraw(urlParams.get('accept'))
                }
                ServiceAuth.getglobalwithdraws({
                    "token": userCookies['cktoken']
                  }).then(response => {
                    const data = response.data;
                    console.log(data);
                    if(data.data.withdrawals != null) {
                        this.setState({
                            withdraws: data.data.withdrawals
                        })
                    }
                    ServiceAuth.getgeneralsettings({
                        "token": userCookies['cktoken']
                      }).then(response => {
                        const dataB = response.data;
                        
                        this.setState({
                            usdperpoint: dataB.data.settings.usdperpoint
                        })
                      }).catch(e => {
                        console.log(e);
                        alert(e);
                        return;
                      })
                  }).catch(e => {
                    console.log(e);
                    alert(e);
                    return;
                  })
            }
        };

       
  }

  _acceptWithdraw = (id) => {
    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null && userCookies['cktoken'] == null) {
        window.location.replace(`/cryptodeep/account`)
    }else{
        if(userCookies['ckpl'] != '999') {
        window.location.replace(`/cryptodeep/account`)
        }else{
            ServiceAuth.acceptwithdraw({
                "token": userCookies['cktoken'],
                "withdrawId": id
            }).then(response => {
                const data = response.data;
                console.log(data);
                alert('Withdraw validated!');
                
              }).catch(e => {
                console.log(e);
                alert(e);
                return;
              })
        }
    }
  }

  _validateWithdraw = (id) => {
    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null && userCookies['cktoken'] == null) {
        window.location.replace(`/cryptodeep/account`)
    }else{
        if(userCookies['ckpl'] != '999') {
        window.location.replace(`/cryptodeep/account`)
        }else{
            ServiceAuth.validatewithdraw({
                "token": userCookies['cktoken'],
                "withdrawId": id
            }).then(response => {
                const data = response.data;
                console.log(data);
                if(data.infoerror != null) {
                  alert(data.infoerror)
                }else{
                  // window.location.reload();
                  if(data.info.checkout_url != null) {
                    window.open(data.info.checkout_url, "_blank") || window.location.replace(data.info.checkout_url);
                  }
                }
                
              }).catch(e => {
                console.log(e);
                alert(e);
                return;
              })
        }
    }
    
}

_rejectWithdraw = (id) => {
    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null && userCookies['cktoken'] == null) {
        window.location.replace(`/cryptodeep/account`)
    }else{
        if(userCookies['ckpl'] != '999') {
        window.location.replace(`/cryptodeep/account`)
        }else{
            ServiceAuth.rejectwithdraw({
                "token": userCookies['cktoken'],
                "withdrawId": id
            }).then(response => {
                const data = response.data;
                console.log(data);
                window.location.reload();
              }).catch(e => {
                console.log(e);
                alert(e);
                return;
              })
        }
    }
    
}
  
  render() {

  return (
          <BaseAdminPage>
          <div className='bp-middle'>
            <br/>
        <div className='bp-middle-over'>
        <div className='bp-middle-all bp-blueshadow'>
                <p className='loginTitle'>Admin Withdrawals</p>

                <PaginatedList
                    list={this.state.withdraws}
                    itemsPerPage={25}
                    renderList={(list) => (
                        <>
                        <table className='admin-table'>
                            <thead>
                                <tr>
                                    <td><p>#</p></td>
                                    <td><p>Date</p></td>
                                    <td><p>Amount</p></td>
                                    <td><p>Cryptocurrency</p></td>
                                    <td><p>Original Amount<br/> of Crypto</p></td>
                                    <td><p>Address</p></td>
                                    <td><p>Points </p></td>
                                    <td><p>Status </p></td>
                                    <td><p>Actions</p></td>
                                </tr>
                            </thead>
                            <tbody >
                            {list.map((item, id) => {
                                return (
                                        <tr className='admin-bodytr' key={id}>
                <td style={{width: '5em'}}><p className="numbering">{this.state.withdraws.indexOf(item) + 1}</p></td>
                <td style={{width: '15em', textAlign:'left',letterSpacing:'2px'}}><p>{item.created_at.substring(0, 10)}</p></td>
                <td style={{width: '20em', textAlign:'left',letterSpacing:'2px'}}><p>${this.state.usdperpoint * item.points}</p></td>
                                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}><p>{item.currency}</p></td>
                                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}><p>{item.originalquant}</p></td>
                                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}><p>{item.cryptoaddress}</p></td>
                                
                                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}><p>{item.points}</p></td>
                                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}>
                                {
                                                item.status == 2 ? <button className='crypto-status-btn csb-success'>Validated</button> : null
                                            }
                                        
                                            {
                                                item.status == 0 ? <button className='crypto-status-btn csb-in-process'>Pending</button> : null
                                            }

                                            {
                                                item.status == 1 ? <button className='crypto-status-btn csb-rejected'>Rejected</button> : null
                                            }
                                </td>
                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}><button onClick={() => {
                    if(item.status != 0) {
                        alert('An action was already taken for this event')
                    }else{
                        this._validateWithdraw(item._id);
                    }
                }} className='admin-actiob admin-actiob-validate'><p>Validate</p></button><br/><button onClick={() => {
                    
                    if(item.status != 0) {
                        alert('An action was already taken for this event')
                    }else{
                        this._rejectWithdraw(item._id)
                    }
                }} className='admin-actiob admin-actiob-reject'><p>Reject</p></button></td>


              </tr>
                                )
                            })}
                            </tbody>
                            </table>
                        </>
                    )}
                />
            </div>
          <div className='clearfix'/>
        </div>


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
