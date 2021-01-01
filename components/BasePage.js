import React from 'react';
import ServiceCookies from '../services/cookies';
export default class BasePage extends React.Component {
    
    constructor() {
        super();
        this.state = {
            logged: false
        }
    }

    componentDidMount() {
        this._checkCookies();
    }

    _checkCookies = async () => {
        const userCookies = ServiceCookies.getUserCookies();
        if(userCookies['ckuserid'] == null || userCookies['cktoken'] == null) {
            console.log('Not logged in');
            this.setState({logged: false});
        }else{
            console.log(userCookies);
            this.setState({logged: true});
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
  
    {
        this.state.logged ? <li><div className='bp-cbutton'><a href='/account'>My Account</a></div></li> :
        <li><div className='bp-cbutton'><a href='/login'>Get started</a></div></li>
    }
    
    
    <li><div className='bp-cbutton'><a href='/affiliate'>Affiliate</a></div></li>
    <li><div className='bp-cbutton'><a href='/reviews'>Reviews</a></div></li>
    <li><div className='bp-cbutton'><a href='/'>Faucet</a></div></li>
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