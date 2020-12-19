import React, { useState, useEffect } from 'react';
import Marquee from 'react-double-marquee';

import { useRouter } from 'next/router'
import BasePage from '../components/BasePage';
export default function Home() {
  const router = useRouter();
  return (
    <BasePage>

      <div className='bp-middle bp-h-bg'>
        <div className='bp-middle-over'>
          <div className='bp-middle-left bp-blueshadow'>
          <br/><p className='bp-title'>My Faucet</p>
          <p>You can roll a faucet every 30 minutes</p>
          </div>
          <div className='bp-middle-left-sub bp-blueshadow'>
          <p>Test B</p>
          </div>
          <div className='bp-middle-left-sub bp-blueshadow'>
          <p>Test C</p>
          </div>
          <div className='clearfix'/>
        </div>
      </div>
      <div className='bp-center-text'>
      <div
      style={{
        width: '100%',
        whiteSpace: 'nowrap',
      }}
    >
      <Marquee>
      <div className='bp-crypto-price-item'>
          <p style={{fontWeight: 400, fontSize: 12}}><img className='crypto-icon' src={'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png'} /> $12,541<span className='bp-crypto-price-avg-span-success'><div className='bp-crypto-pass'></div>+0.23%</span></p>
        </div>
        <div className='bp-crypto-price-item'>
          <p style={{fontWeight: 400, fontSize: 12}}><img className='crypto-icon' src={'https://seeklogo.com/images/T/tether-usdt-logo-FA55C7F397-seeklogo.com.png'} />$12,541<span className='bp-crypto-price-avg-span-fail'><div className='bp-crypto-pasf'></div>-0.13%</span></p>
        </div>
        <div className='bp-crypto-price-item'>
          <p style={{fontWeight: 400, fontSize: 12}}><img className='crypto-icon' src={'https://www.blockchain.com/static/img/home/hero-eth.svg'} />$12,541<span className='bp-crypto-price-avg-span-fail'><div className='bp-crypto-pasf'></div>-2.13%</span></p>
        </div>
        <div className='bp-crypto-price-item'>
          <p style={{fontWeight: 400, fontSize: 12}}><img className='crypto-icon' src={'https://www.blockchain.com/static/img/home/hero-xrp.svg'} />$12,541<span className='bp-crypto-price-avg-span-success'><div className='bp-crypto-pass'></div>+0.23%</span></p>
        </div>
        <div className='bp-crypto-price-item'>
          <p style={{fontWeight: 400, fontSize: 12}}><img className='crypto-icon' src={'https://dynamic-assets.coinbase.com/3d0b1dc2a70acb73379c2d35a1e641f4438702ce8e4a4855b5514ad2758e3f520797d3ae7a9aa675d683188302e4d09c801a5195d89382d4296933dd72217717/asset_icons/1597d628dd19b7885433a2ac2d7de6ad196c519aeab4bfe679706aacbf1df78a.png'} />$12,541<span className='bp-crypto-price-avg-span-fail'><div className='bp-crypto-pasf'></div>-3.04%</span></p>
        </div>
        <div className='bp-crypto-price-item'>
          <p style={{fontWeight: 400, fontSize: 12}}><img className='crypto-icon' src={'https://dynamic-assets.coinbase.com/93a4303d1b0410b79bb1feac01020e4e7bdf8e6ece68282d0af2c7d0b481c5f5c44c0cec1d7071ae8f84674dbd139e290d50a038a6a4c1bbc856ec0871b5f3e2/asset_icons/3af4b33bde3012fd29dd1366b0ad737660f24acc91750ee30a034a0679256d0b.png'} />$12,541<span className='bp-crypto-price-avg-span-success'><div className='bp-crypto-pass'></div>+7.10%</span></p>
        </div>
        <div className='bp-crypto-price-item'>
          <p style={{fontWeight: 400, fontSize: 12}}><img className='crypto-icon' src={'https://dynamic-assets.coinbase.com/a353373ccecedb0e8b6f51ed78db22fbe0167d63d129b15963407f71392c052ae5f2ffd5fbaa6e976da86b73987a335462022f5f54ec559360683ddb8da3da96/asset_icons/a6f13081ab7468290003b49b78fc383614e113700a151a4f9794c556f5c3ca9a.png'} />$12,541<span className='bp-crypto-price-avg-span-fail'><div className='bp-crypto-pasf'></div>-7.00%</span></p>
        </div>
        <div className='bp-crypto-price-item'>
          <p style={{fontWeight: 400, fontSize: 12}}><img className='crypto-icon' src={'https://dynamic-assets.coinbase.com/49567ec5f7c7a1ccb3ce247297c443b3dd32072ee5b91902abc0f6789654e14fd3b9ed8851580b93b4daf7da13324bc61e143a2d391d9e6d8b98f8d69923e4b4/asset_icons/3c5b36c70a05bad40eee4f711aeefbb1809169a17db047bf91f1ef45828349e5.png'} />$12,541<span className='bp-crypto-price-avg-span-success'><div className='bp-crypto-pass'></div>+4.23%</span></p>
        </div>
      </Marquee>
    </div>
        
      </div>
      <div className='bp-center-text'>
      <p style={{fontWeight: 700, fontSize: 16}}>Faucet history</p>
      </div>
          
      <div className='bp-middle'>
        <div className='bp-middle-over'>
          <div className='bp-middle-all bp-blueshadow'>
            <table className='bp-table'>
              <tr>
                <th style={{width: '20%'}}>DATE</th>
                <th style={{width: '30%'}}>AMOUNT</th>
                <th style={{width: '30%'}}>STATUS</th>
              </tr>
              <tr>
                <td style={{width: '20%'}}>11/14/2020 - 11:15</td>
                <td style={{width: '30%'}}><p>200 Points</p></td>
                <td style={{width: '30%'}}><button className='crypto-status-btn csb-success'>Successful</button></td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>11/17/2020 - 11:15</td>
                <td style={{width: '30%'}}><p>315 Points</p></td>
                <td style={{width: '30%'}}><button className='crypto-status-btn csb-success'>Successful</button></td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>11/11/2020 - 11:15</td>
                <td style={{width: '30%'}}><p>275 Points</p></td>
                <td style={{width: '30%'}}><button className='crypto-status-btn csb-in-process'>In Process</button></td>
              </tr>
              <tr>
                <td style={{width: '20%'}}>11/14/2020 - 11:15</td>
                <td style={{width: '30%'}}><p>250 Points</p></td>
                <td style={{width: '30%'}}><button className='crypto-status-btn csb-success'>Successful</button></td>
              </tr>
            </table>
          </div>
          <div className='clearfix'/>
        </div>
      </div><br/><br/><br/>
      {/* <p>Hola</p> */}
      <style jsx>{`

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

                  font-family: 'Open Sans';
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

                  font-family: 'Open Sans';
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

                  font-family: 'Open Sans';
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

                  font-family: 'Open Sans';
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
    </BasePage>
  )
}
