import React from 'react';
import ServiceCookies from '../services/cookies';
import ServiceAuth from '../services/ServiceAuth';
export default class AccountSecurity extends React.Component {

    constructor() {
        super();
        this.state = {
          errorForm: null,
          formController: {
            oldPassword: '',
            newPassword: '',
            repeatPassword: '',
            email: '',
            newEmail: '',
            password: ''
          }
        }
      }

      componentDidMount() {
        const userCookies = ServiceCookies.getUserCookies();
            if(userCookies['ckuserid'] == null && userCookies['cktoken'] == null) {
                window.location.replace(`/login`)
            }else{
              ServiceAuth.getprofile({
                "token": userCookies['cktoken']
              }).then(response => {
                const data = response.data;
                console.log(data);
                var _fCon = this.state.formController;
                _fCon.email = data.user.email;
                this.setState({
                  formController: _fCon
                })

              }).catch(e => {
                console.log(e);
                alert(e);
                return;
              })
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
    
     logout = () => {
        ServiceCookies.removeUserCookies();
        window.location.replace('/');
      }

      changeEmailPressed = () => {
        if(this.state.formController.email.length < 3 ||
            this.state.formController.newEmail.length < 3 || this.state.formController.password.length < 3) {
          alert('One or more fields are missing or invalid.');
          return;
        }
    
        if(this.state.formController.email == this.state.formController.newEmail) {
          alert('The email accounts are the same');
          return;
        }
    
        const userCookies = ServiceCookies.getUserCookies();
            if(userCookies['ckuserid'] == null || userCookies['cktoken'] == null) {
                window.location.replace(`/login`)
            }else{
                this.setState({logged: true});
    
                ServiceAuth.changeemail({
                    "token": userCookies['cktoken'],
                    "email": this.state.formController.email,
                    "newEmail": this.state.formController.newEmail,
                    "password": this.state.formController.password
                  }).then(response => {
                    const data = response.data;
                    console.log(data);
                    var _a = alert('Email changed.');
                    if(_a) {
                        window.location.replace(`/account`);
                    }
                  }).catch(e => {
                    var _content = 'One or more fields are empty';
                    console.log(e);
                    if(e.response.status == 404 || e.response.status == 401) {
                      _content = 'Invalid password or email'
                    }
                    alert(_content);
                    return;
                  })
            }
      }

      changePasswordPressed = () => {
        console.log(this.state.formController);
    if(this.state.formController.oldPassword.length < 3 ||
        this.state.formController.newPassword.length < 3 || this.state.formController.repeatPassword.length < 3) {
      alert('One or more fields are missing or invalid.');
      return;
    }

    if(this.state.formController.newPassword != this.state.formController.repeatPassword) {
      alert('Password doesn\'t match');
      return;
    }

    const userCookies = ServiceCookies.getUserCookies();
        if(userCookies['ckuserid'] == null || userCookies['cktoken'] == null) {
            window.location.replace(`/login`)
        }else{
            console.log({
                "token": userCookies['cktoken'],
                "oldPassword": this.state.formController.oldPassword,
                "newPassword": this.state.formController.newPassword,
                "repeatPassword": this.state.formController.repeatPassword
              });
            this.setState({logged: true});

            ServiceAuth.changepassword({
                "token": userCookies['cktoken'],
                "oldPassword": this.state.formController.oldPassword,
                "newPassword": this.state.formController.newPassword,
                "repeatPassword": this.state.formController.repeatPassword
              }).then(response => {
                const data = response.data;
                // console.log(data);
                alert('Password changed.')
              }).catch(e => {
                var _content = 'One or more fields are empty';
                console.log(e);
                if(e.response.status == 404 || e.response.status == 401) {
                  _content = 'Invalid password'
                }
                alert(_content);
                return;
              })
        }
      }

    render() {
        return (
            <div className='bp-middle-over security'>
          <div className='bp-middle-left bp-blueshadow security'>
          <br/><p className='bp-title'>Security</p>
          <p>Change your personal data periodically to secure your account</p>
          <br/><br/><br/>
          <div className='bp-security'>
            {/* <form autoComplete="off"> */}
            <div className='inputhold'>
                  <input  placeholder="Current email" name='email' type='email' onChange={this.handleInputChange} value={this.state.formController.email}/>
                  <img  role="img" src="https://upload.wikimedia.org/wikipedia/commons/d/d8/At_Sign_Nimbus.svg" />
                </div>
                
                <div className='inputhold'>
                  <input  placeholder="New email" name='newEmail' type='email' onChange={this.handleInputChange} value={this.state.formController.newEmail}/>
                  <img  role="img" src="https://upload.wikimedia.org/wikipedia/commons/d/d8/At_Sign_Nimbus.svg" />
                </div>
                <div className='inputhold'>
                <input type='password' placeholder="Password" name='password' onChange={this.handleInputChange} value={this.state.formController.password}/>
                <img role="img" src="https://cdn.onlinewebfonts.com/svg/img_398183.png" />
              </div>
                <input
                  value="Save Email"
                  onClick={() => this.changeEmailPressed()}
                  type='submit'
                  className='loginSubmit submitSecurity'
                />
                <input
                  style={{opacity: '0'}}
                  value="Settings"
                  type='submit'
                  className='loginSubmit submitSecurity'
                />
            {/* </form> */}
            
          </div>
          <div className='divider'></div>
            <div className='bp-security'>
            {/* <form autoComplete="off"> */}

                
                <div className='inputhold'>
                <input type='password' placeholder="Old Password" name='oldPassword' onChange={this.handleInputChange} value={this.state.formController.oldPassword}/>
                <img role="img" src="https://cdn.onlinewebfonts.com/svg/img_398183.png" />
              </div>
              <div className='inputhold'>
                <input type='password' placeholder="New Password" name='newPassword'  onChange={this.handleInputChange} value={this.state.formController.newPassword}/>
                <img role="img" src="https://cdn.onlinewebfonts.com/svg/img_398183.png" />
              </div>
              <div className='inputhold'>
                <input type='password' placeholder="Repeat Password" name='repeatPassword'  onChange={this.handleInputChange} value={this.state.formController.repeatPassword}/>
                <img role="img" src="https://cdn.onlinewebfonts.com/svg/img_398183.png" />
              </div>
                
                <input
                  value="Save Password"
                  type='submit'
                  onClick={() => this.changePasswordPressed()}
                  className='loginSubmit submitSecurity'
                />
                <input
                  value="Logout"
                  onClick={() => this.logout()}
                  type='submit'
                  className='loginSubmit submitSecurity'
                />
            {/* </form> */}
          </div>
          </div>
          
          <div className='clearfix'/>
          <style jsx>{`
                .withdrawalForm{
                  width: fit-content;
                  margin: auto
                }
                .withdrawFinal{
                  display:block;
                  width:17em;
                  padding: 10px;
                  margin-bottom: 2em;
                  color:white;
                  border-radius:3px;
                  margin:0 auto;
                }
                .terms{
                  font-family:'Nunito';
                  color:white;
                  text-align:left;
                  font-size:0.8em;

                }
                .minWith{
                  font-family:'Nunito';
                  color:white;
                  text-align:left;
                  font-size:0.5em;
                  margin-top:-2em;
                  margin-left:0.1em
                }
                .withdrawTitle{
                  font-family:'Nunito';
                  color:white;
                  text-align:center
                }
                .walletSvg{
                  width: 1.5em;
                  margin-left: -3em;
                }
                h2{
                  font-family:"Open-Sans"
                }
                Modal{
                  background-color:black
                }
                .main{
                  height:19em !important
                }
                .loutButton{
                  z-index:99999;
                  filter: invert(99%) sepia(10%) saturate(208%) hue-rotate(106deg) brightness(115%) contrast(100%);
                  margin-top: 3em;
                  /* position: absolute; */
                  right: 17%;
                }
                .loutButton:hover{
                  cursor:pointer
                }
                .security{
                  width:
                }
                .submitSecurity{
                  background-color:transparent;
                  border:1px solid #DC8614 !important;
                  width:100%
                }
                .submitSecurity:hover{
                  background-color:#DC8614;
                  cursor:pointer
                }
                .divider{
                  display:inline-block;
                  width:15%
                }
                .bp-security{
                  display:inline-block;
                }
                img{
                  width:2em;
                  position: absolute;
                  margin-left: -4em;
                  padding: 6px 12px;
                  pointer-events: none;
                  opacity:0.3;
                  }
                .selectCrypto{
                  outline:none;
                  width: 17em;
                  padding: 10px;
                  margin-bottom: 2em;
                  color:white;
                  border-radius:3px;
                  border-style:solid;
                  border: 1px solid white;
                  background-color:transparent;
                  appearance:none
                }
                input{
                  outline:none;
                  width: 15.5em;
                  padding: 10px;
                  margin-bottom: 2em;
                  color:white;
                  border-radius:3px;
                  border-style:solid;
                  border: 1px solid white;
                  background-color:transparent}
                input::placeholder{
                  color:white
                }
                .wallet-table{
                  margin-top:2em
                }
                .csb-withdraw{
                  background-color:transparent;
                  border:1px solid #DC8614 !important;
                }
                .csb-withdraw:hover{
                  background-color:#DC8614;
                  cursor:pointer
                }
                .textCenter p{
                  display:block;
                  text-align:center
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
                  width: 90%;
                  float: left;
                  height: 440px;
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
                  .terms{
                    text-align: center;
                  }
                  .fiat{
                    display:none
                  }
                  .bp-middle-left, .bp-middle-left-sub {
                    width: 90%;
                  }
                  .security{
                  height:63em !important;
                      margin-bottom: -14em;
                }

                .divider{
                  display:none
                }
                .bp-security{
                  display: block;
                }
                .loutButton{
                    margin-top:2em;
                    margin-right:-1em
                  }
                }
                .bp-blueshadow {

                  background: #252540;
                  box-shadow: 0px 0px 20px rgba(0,0,0,0.4);
                  border-radius: 4px;
                }

                .bp-crypto-price-item {
                  display: inline-block;
                  padding: 0px 30px;
                  
                }

                .bp-crypto-price-item p {
                  display: flex;
                  align-items: center;
                  margin: 4px 4px;
                }

                .bp-crypto-price-avg-span-success {
                  color: green;
                  margin: 8px 8px;
                }

                .bp-crypto-price-avg-span-fail {
                  color: red;
                  margin: 8px 8px;
                }

                .bp-crypto-pass {
                  content:url('images/arrow_up.png');
                  width: 0.7em;
                  float: left;
                  margin-top: 7px;
                  margin-right: 4px;
                }

                .bp-crypto-pasf {
                  content:url('images/arrow_down.png');
                  width: 0.7em;
                  float: left;
                  margin-top: 7px;
                  margin-right: 4px;
                }

                .clearfix::after {
                  content: "";
                  clear: both;
                  display: table;
                }
            `}</style>
        </div>
      
        )
    }
}