import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/router'
import BasePage from '../components/BasePage';
export default function Home() {
  const router = useRouter();
  return (
    <BasePage>

      <div className='bp-middle'>
        <div className='bp-middle-over'>
          <div className='bp-middle-left bp-blueshadow'>
          <br/><p className='bp-title'>My Faucet</p>
          <p>You can roll a faucet every 30 minutes</p>
          </div>
          <div className='bp-middle-left-sub bp-blueshadow'>
          <p>Test B</p>
          </div>
          <div className='bp-middle-left-sub bp-orangeshadow'>
          <p >Test C</p>
          </div>
          <div className='clearfix'/>
        </div>
      </div>
      <br/>
      <p className='his-title'>Faucet History</p>
      <table>
        <tr>
          <th className='c1'>DATE</th>
          <th>AMOUNT</th>
          <th>STATUS</th>
        </tr>
        <tr>
          <td>11/14/2020 - 11:15</td>
          <td>0.97527341<img className='crypto-icon' src={'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png'} /></td>
          <td ><span className='success'>Successful</span></td>
        </tr>
        <tr>
          <td>11/13/2020 - 20:42</td>
          <td>0.44217331<img className='crypto-icon' src={'https://seeklogo.com/images/T/tether-usdt-logo-FA55C7F397-seeklogo.com.png'} /></td>
          <td ><span className='success'>Successful</span></td>
        </tr>
        <tr>
          <td>11/13/2020 - 19:02</td>
          <td>0.18435429<img className='crypto-icon' src={'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png'} /></td>
          <td ><span className='success'>Successful</span></td>
        </tr>
      </table>
      <style jsx>{`
                .bp-middle {
                    margin: 0px;
                    width: 100%;
                    height: 400px;
                    background-image: url("/images/texture_a.png");
        background-size: contain;
        background-repeat: no-repeat;
                }

                .c1{
                  width: 25%;
                }

                .bp-middle-over {
                  margin: 0% 10%;
                  width: 80%;
                }
                .bp-middle-left p {
                  margin: 0px;
                }
                .bp-middle-left {
                  text-align: center;
                  margin-left: 30px;
                  margin-right: 30px;
                  margin-top: 30px;
                  margin-bottom: 30px;
                  width: 44%;
                  float: left;
                  height: 340px;
                  padding: 0 14px;

                  font-family: 'Open Sans';
                  color: #FFFFFF;
                  font-weight: 400;
                  font-size: 12px;
                }

                .bp-middle-left-sub {
                  text-align: center;
                  margin-left: 30px;
                  margin-right: 30px;
                  margin-top: 30px;
                  width: 38%;
                  float: left;
                  height: 100px;
                  padding: 0 14px;

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

                  .his-title{
                    margin-top:2em
                  }
                }

                .bp-blueshadow {

                  background: #252540;
                  box-shadow: 0px 0px 20px rgba(0,0,0,0.4);
                  border-radius: 4px;
                }

                .his-title{
                  text-align:center;
                  font-family: 'Open Sans';
                }

                .bp-orangeshadow {

                  background: #dc8614;
                  box-shadow: 0px 0px 20px rgba(0,0,0,0.4);
                  border-radius: 4px;
                  height: 18em !important;
                  margin-top: 1em;
                }

                .clearfix::after {
                  content: "";
                  clear: both;
                  display: table;
                }

                table {
                  margin: 0 auto;
                  font-family: arial,sans-serif;
                  border-collapse: collapse;
                  width: 85%;
                }

                td, th {
                  text-align: left;
                  padding: 1.5em;
                }
                tr:nth-child(odd) {
                  background-color: #252540;
                }
                tr:nth-child(even) {
                  background-color: #171727;
                }

                .success{
                  padding:0.5em 1em;
                  border-radius:3px;
                  background-color:#32CD32;
                  opacity:0.8;
                  font-size:0.8em;
                }

                .crypto-icon{
                  width:0.7em;
                  margin-left:0.2em
                }
            `}</style>
    </BasePage>
  )
}
