import React from 'react';
import ServiceCookies from '../services/cookies';
import ServiceAuth from '../services/ServiceAuth';
import Translator from '../services/translator';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import QuestionPopup from '../components/QuestionPopup';
import * as Cookies from "js-cookie";
export default class BasePage extends React.Component {
    
    constructor() {
        super();
        this.state = {
            displayFTR: false,
            ftrPosition: 0,
            displayQuizPopup: false,
            questionGameShow: false,
            currentLang: 'en',
            langmenuOpen: false,
            logged: false
        }
    }

    componentDidMount() {
        this._checkCookies();
        this._shouldDisplayQuiz();
        this._shouldDisplayFTR();
    }

    _checkCookies = async () => {
        const langCookies = ServiceCookies.getLangCookies();
        this.setState({
            currentLang: langCookies['cklang']
        })
        const userCookies = ServiceCookies.getUserCookies();
        if(userCookies['ckuserid'] == null || userCookies['cktoken'] == null) {
            console.log('Not logged in');
            this.setState({logged: false});
        }else{
            console.log(userCookies);
            this.setState({logged: true});
        }
    }

    _changeLang = data => {
        if(data == this.state.currentLang) { return; }
        ServiceCookies.saveLangCookies({cklang: data});
        this.setState({
            currentLang: data
        })
        window.location.reload();
    }

    _pressFTR = () => {
    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null && userCookies['cktoken'] == null) {
      window.location.replace('/account');  
    }else{
        ServiceAuth.playfindtherobot({
            "token": userCookies['cktoken']
          }).then(async response => {
            var _d = new Date();
            await Cookies.set('lastftrplayed', _d);
            const data = response.data;
            console.log(data);
            alert(data.message);
            window.location.reload();
          });
    }
    }

    _shouldDisplayFTR = () => {
        var _now = new Date();
        const _lastQcook = Cookies.get('lastftrplayed');
        var _lastQcooki = new Date(_lastQcook);

        var _sawToday = (_lastQcooki.getDate() == _now.getDate()) &&
                        (_lastQcooki.getMonth() == _now.getMonth()) &&
                        (_lastQcooki.getFullYear() == _now.getFullYear()); 
        
        this.setState({
            displayFTR: !_sawToday
        })
    }

    _shouldDisplayQuiz = () => {
        const userCookies = ServiceCookies.getUserCookies();
        if(userCookies['ckuserid'] == null && userCookies['cktoken'] == null) {
            
        }else{
            const _lastQcook = Cookies.get('lastquestionplayed');
            var _lastQcooki = new Date(_lastQcook);

            ServiceAuth.gamesettings({
                "token": userCookies['cktoken']
              }).then(response => {
                const data = response.data.data;
                console.log(data);
                this.setState({
                    ftrPosition: data.gamesettings.findtherobotposition
                })
                Date.prototype.addHours = function(h) {
                    this.setTime(this.getTime() + (h*60*60*1000));
                    return this;
                }

                Date.prototype.addMinutes = function(minutes) {
                    this.setMinutes(this.getMinutes() + minutes);
                    return this;
                };


                var _now = new Date();
                var _dateA = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate(), data.gamesettings.questionshoura, 0, 0, 0);
                var _dateB = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate(), data.gamesettings.questionshourb, 0, 0, 0);
                var _dateAfin = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate(), data.gamesettings.questionshoura, 0, 0, 0);
                var _dateBfin = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate(), data.gamesettings.questionshourb, 0, 0, 0);
                _dateAfin = _dateAfin.addMinutes(15)
                _dateBfin = _dateBfin.addMinutes(15)

                var _cookiedVal = _lastQcooki.addMinutes(15);
                if(_now < _cookiedVal) {
                    return false;
                }

                if((_now > _dateA && _now < _dateAfin) || (_now > _dateB && _now < _dateBfin)) {
                    this.setState({
                        displayQuizPopup: true
                    })
                    return true;
                }else{
                    return false;
                }
                
                
              }).catch(e => {
                console.log(e)
                return false;
              })
        }
    }

    render() {
        return (
            <div className='basepage'>
                <div className='bp-header'>
               <a href='/'><div style={{cursor: 'pointer'}} className='bp-logo'></div></a> 
                <nav id='menu'>
  <input type='checkbox' id='responsive-menu'/><label></label>
  <ul>
  <li><div className='bp-spacer'></div></li>


  <li><div className='bp-spacer' style={{
      width: '60px'
  }}></div></li>
  <li>
<div class="main-menu">
  <div class="lang-select" onClick={() => {
      this.setState({
        langmenuOpen: !this.state.langmenuOpen
      })
  }}>
      {/* lang-selected */}
  <a href="#" onClick={() => this._changeLang('en')}>
  <img src="https://cdn.countryflags.com/thumbs/united-kingdom/flag-round-250.png"
       class={`flag-img ${this.state.currentLang == 'en' ? 'lang-selected' : ''} ${this.state.langmenuOpen ? 'lang-show' : ''}`}/>
  </a>
  <a href="#" onClick={() => this._changeLang('es')}>
    <img src="https://cdn.countryflags.com/thumbs/spain/flag-round-250.png"
       class={`flag-img ${this.state.currentLang == 'es' ? 'lang-selected' : ''} ${this.state.langmenuOpen ? 'lang-show' : ''}`}/>
  </a>
  <a href="#" onClick={() => this._changeLang('it')}>
  <img src="https://cdn.countryflags.com/thumbs/italy/flag-round-250.png"
       class={`flag-img ${this.state.currentLang == 'it' ? 'lang-selected' : ''} ${this.state.langmenuOpen ? 'lang-show' : ''}`}/>
  </a>
  <a href="#" onClick={() => this._changeLang('ru')}> 
  <img src="https://cdn.countryflags.com/thumbs/russia/flag-round-250.png"
       class={`flag-img ${this.state.currentLang == 'ru' ? 'lang-selected' : ''} ${this.state.langmenuOpen ? 'lang-show' : ''}`}/>
  </a>
  <a href="#" onClick={() => this._changeLang('hi')}>
  <img src="https://cdn.countryflags.com/thumbs/india/flag-round-250.png"
       class={`flag-img ${this.state.currentLang == 'hi' ? 'lang-selected' : ''} ${this.state.langmenuOpen ? 'lang-show' : ''}`}/>
  </a>
  <a href="#" onClick={() => this._changeLang('pt')}> 
  <img src="https://cdn.countryflags.com/thumbs/portugal/flag-round-250.png"
       class={`flag-img ${this.state.currentLang == 'pt' ? 'lang-selected' : ''} ${this.state.langmenuOpen ? 'lang-show' : ''}`}/>
  </a>
  <a href="#" onClick={() => this._changeLang('fr')}>
  <img src="https://cdn.countryflags.com/thumbs/france/flag-round-250.png"
       class={`flag-img ${this.state.currentLang == 'fr' ? 'lang-selected' : ''} ${this.state.langmenuOpen ? 'lang-show' : ''}`}/>
  </a>
  </div>
</div>
</li>
    {
        this.state.logged ? <li><div className='bp-cbutton'><a href='/account'>{Translator.getStringTranslated('menu_myaccount', this.props.currentLang, this.props.translatorData)}</a></div></li> :
        <li><div className='bp-cbutton'><a href='/login'>{Translator.getStringTranslated('menu_getstarted', this.props.currentLang, this.props.translatorData)}</a></div></li>
    }
    
    
    <li><div className='bp-cbutton'><a href='/faq'>{Translator.getStringTranslated('menu_faq', this.props.currentLang, this.props.translatorData)}</a></div></li>
    <li><div className='bp-cbutton'><a href='/affiliate'>{Translator.getStringTranslated('menu_affiliate', this.props.currentLang, this.props.translatorData)}</a></div></li>
    <li><div className='bp-cbutton'><a href='/reviews'>{Translator.getStringTranslated('menu_reviews', this.props.currentLang, this.props.translatorData)}</a></div></li>
    <li><div className='bp-cbutton'><a href='/'>{Translator.getStringTranslated('menu_faucet', this.props.currentLang, this.props.translatorData)}</a></div></li>
  <li><div className='bp-spacer'></div></li>
  {/* <li><div className='bp-menu-item'></div></li> */}
  </ul>
</nav>
{
    this.state.displayQuizPopup ? 
    <div onClick={() =>{
        this.setState({
            questionGameShow: true
        })
    }} className="questions-pu">
    <img src="images/robot_faq.png" width='100'/>
    <h4 className='withdrawTitle'>{Translator.getStringTranslated('qst_popup', this.props.currentLang, this.props.translatorData)}</h4>
    
    </div>
    : null
}
{
    this.state.displayFTR ? <div onClick={() => {
        this._pressFTR();
    }} className={`findtherobot-pos-${this.state.ftrPosition}`}>
    <img src="images/robot_findtherobot.png" width='100'/>
    </div> : null
}

<Modal  open={this.state.questionGameShow} onClose={() => {
    this.setState({
        questionGameShow: false
    })
}} classNames={{
          overlay: 'customOverlay',
          modal: 'customModal',
        }}>
          <QuestionPopup
            currentLang={this.props.currentLang}
            translatorData={this.props.translatorData}
          style="background-color:#252540"></QuestionPopup>
        </Modal>
                </div>
                {this.props.children}
            <style jsx>{`
                .basepage {
                    margin: 0px;
                    width: 100%;
                    height: 100%;
                    color: white;
                }

                .bp-header {
                    margin: 0px;
                    width: 100%;
                    height: 60px;
                    background: #1E1D32;
                }

                .bp-spacer {
                    width: 40px;
                    height: 10px;
                }

                .bp-cbutton p{
                    background-color: yellow;
                }
            `}</style>
            </div>
        )
    }
}