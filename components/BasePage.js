import React from 'react';
export default class BasePage extends React.Component {
    
    render() {
        return (
            <div className='basepage'>
                <div className='bp-header'>
                <div className='bp-logo'></div>
                <nav id='menu'>
  <input type='checkbox' id='responsive-menu'/><label></label>
  <ul>
  <li><div className='bp-spacer'></div></li>
    <li><div className='bp-cbutton'><a href='/account'>My Account</a></div></li>
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