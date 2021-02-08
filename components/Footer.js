import React from 'react';
export default class Footer extends React.Component {
 
    render() {
        return (
           <>
           <div className='clearfix'/>
            <a href='https://twitter.com/CryptoDeep2'><p style={{
                textAlign: 'center'
            }}><img className='footerimg' role="img" src='/images/Twitter-icon.png' />
            </p></a>
          <div className='clearfix'/>
          <style jsx>{`
            p {
                font-family:"Nunito";
            }

            .footerimg {
                width: 30px;
                height: 30px;
                margin-right: 4px;
                margin-top: -10px;
            }

            .spanimg {
                padding-bottom: -10px;
            }
            `}</style>
 
        </>
 
        )
    }
}