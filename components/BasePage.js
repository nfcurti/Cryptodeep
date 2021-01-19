import React from 'react';
import ServiceCookies from '../services/cookies';
import Translator from '../services/translator';
export default class BasePage extends React.Component {
    
    constructor() {
        super();
        this.state = {
            currentLang: 'en',
            langmenuOpen: false,
            logged: false
        }
    }

    componentDidMount() {
        this._checkCookies();
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