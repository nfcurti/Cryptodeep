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
      users: []
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
                ServiceAuth.getusers({
                    "token": userCookies['cktoken']
                  }).then(response => {
                    const data = response.data;
                    console.log(data);
                    if(data.data.users != null) {
                        this.setState({
                            users: data.data.users
                        })
                    }
                  }).catch(e => {
                    console.log(e);
                    alert(e);
                    return;
                  })
            }
        };

       
  }

  toggleBlockUser = (user, blocked) => {
    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null && userCookies['cktoken'] == null) {
        window.location.replace(`/cryptodeep/account`)
    }else{
        if(userCookies['ckpl'] != '999') {
        window.location.replace(`/cryptodeep/account`)
        }else{
          var _mTSZ = {
            'token': userCookies['cktoken'],
            'userid': user._id,
            'blocked': blocked ? 'true' : 'false'
          }
          console.log(_mTSZ);
          ServiceAuth.edituserasadmin(_mTSZ).then(response => {
            const data = response.data;
            console.log(data);
            var _a = alert('User updated.');
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
                <p className='loginTitle'>Admin Users</p>

                <PaginatedList
                    list={this.state.users}
                    itemsPerPage={25}
                    renderList={(list) => (
                        <>
                        <table className='admin-table'>
                            <thead>
                                <tr>
                                    <td><p>#</p></td>
                                    <td><p>Username</p></td>
                                    <td><p>Email</p></td>
                                    <td><p>Creation Date</p></td>
                                    <td><p>Points</p></td>
                                    <td><p>Faucet Balance</p></td>
                                    <td><p>Referred </p></td>
                                    <td><p>IP</p></td>
                                    <td><p>Blocked</p></td>
                                    {/* <td><p>Actions</p></td> */}
                                </tr>
                            </thead>
                            <tbody >
                            {list.map((item, id) => {
                                return (
                                        <tr className='admin-bodytr' key={id}>
                                          
                <td style={{width: '5em'}}><p className="numbering">{this.state.users.indexOf(item) + 1}</p></td>
                <td style={{width: '15em', textAlign:'left',letterSpacing:'2px'}}><a href={`/cryptodeep/admin/user?id=${item._id}`}><p style={{color: 'orange'}}>{item.username}</p></a></td>
                <td style={{width: '20em', textAlign:'left',letterSpacing:'2px'}}><p>{item.email}</p></td>
                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}><p>{item.created_at.substring(0, 10)}</p></td>
                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}><p>{item.points}</p></td>
                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}><p>{item.faucetbalance}</p></td>
                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}><p>{item.referredBy == null ? 'No' : item.referredBy.length == 0 ? 'No' : 'Yes'}</p></td>
                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}><p>{item.ip}</p></td>
                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}>
                                {
                                    !item.blocked ? <button className='crypto-status-btn csb-success clickablee' onClick={() => {
                                      this.toggleBlockUser(item, true);
                                    }}>Not Blocked</button> 
                                    : <button className='crypto-status-btn csb-in-process clickablee' onClick={() => {
                                      this.toggleBlockUser(item, false);
                                    }}>Blocked</button>  
                                }
                                </td>
                {/* <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}><p>-</p></td> */}

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
