import React from 'react';
export default class BasePage extends React.Component {
    
    render() {
        return (
            <div className='basepage'>
                <div className='bp-header'>
                <nav id='menu'>
  <input type='checkbox' id='responsive-menu' onclick='updatemenu()'/><label></label>
  <ul>
  <li><div className='bp-spacer'></div></li>
  <li><div className='bp-menu-item'><div className='bp-logo'></div></div></li>
  <li><div className='bp-spacer'></div></li>
    <li><div className='bp-cbutton'><button href='/'>Faucet</button></div></li>
    <li><div className='bp-cbutton'><button href='/'>Reviews</button></div></li>
    <li><div className='bp-cbutton'><button href='/'>Affiliate</button></div></li>
    <li><div className='bp-cbutton'><button href='/'>My Account</button></div></li>
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