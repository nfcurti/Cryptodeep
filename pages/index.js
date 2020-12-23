import React, { useState, useEffect } from 'react';
import Marquee from 'react-double-marquee';
import { RandomReveal } from "react-random-reveal";
import ReactStars from "react-rating-stars-component";

import { useRouter } from 'next/router'
import BasePage from '../components/BasePage';
export default function Home() {
    const router = useRouter();
    var result = '000000'
    var resultPoints = 0
    const [isPlaying, setIsPlaying] = React.useState(true);
    React.useEffect(() => {
      document.getElementById("roll").onclick = function(){
        setIsPlaying(playing => !playing);
        result = (document.getElementById("rdm").innerHTML).replace(/\s/g, '')
        
        switch(true) {
          case Number(result)<=999500:
            resultPoints = 5
            break;
          case Number(result)>999500 && Number(result)<=999700:
            resultPoints = 10
            break;
          case Number(result)>999701 && Number(result)<=999850:
            resultPoints = 100
            break;
          case Number(result)>999851 && Number(result)<=999920:
            resultPoints = 200
            break;
          case Number(result)>999921 && Number(result)<=999999:
            resultPoints = 500
            break;
          default:
            // code block
        }
        document.getElementById("resultDisplay").innerHTML = "You won: <span style=color:green>+"+resultPoints+" Points</span> "
        console.log(resultPoints)
      };

    }, []);
  return (
    <BasePage>

      <div className='bp-middle bp-h-bg'>
        <div className='bp-middle-over'>
          <div className="bp-reviewbox">
            
            <div className="review">
              <div className="single-review"> 
                <div style={{width:"fit-content"}}>
                  <img className='review-logo' src={'https://www.logo.wine/a/logo/Binance/Binance-Icon-Logo.wine.svg'}/>
                  <p className='review-score'>3.8<img style={{width:"1em",margin:"auto",marginLeft:"0.2em"}} className='crypto-icon' src={'https://upload.wikimedia.org/wikipedia/commons/a/a3/Orange_star.svg'} /></p>
                </div>
                <div style={{padding:"0.1em",marginLeft:"0.5em",marginTop:"-0.3em"}}>
                  <p style={{fontSize:"0.7em", fontWeight:"bold"}}>Binance</p>
                  <p style={{fontSize:"0.5em"}}>Leading crypto  site for beginners</p>
                </div>

              <div className="stars-review">
              <div style={{display:'flex',width:"fit-content",margin:'auto',marginTop:'initial'}}>
                <span style={{marginRight:'0.2em',fontWeight:'bold'}}>20</span>
                <ReactStars
                    count={5}
                    size={14}
                    value={3.8}
                    edit={false}
                    isHalf={true}
                    activeColor="#ffd700"
                  />
                </div>
              </div>
              <div className="end-review">
                
                <div style={{backgroundColor:"#fc89ac"}} className="inside-end-review"><p>REVIEW</p></div><div style={{backgroundColor:"#8A2BE2"}} className="inside-end-review" ><p style={{textAlign:"right"}}>SITE</p></div>
                </div>
                </div>
            </div>
            <div className="review">
              <div className="single-review"> 
                <div style={{width:"fit-content"}}>
                  <img className='review-logo' src={'https://www.logo.wine/a/logo/Binance/Binance-Icon-Logo.wine.svg'}/>
                  <p className='review-score'>3.8<img style={{width:"1em",margin:"auto",marginLeft:"0.2em"}} className='crypto-icon' src={'https://upload.wikimedia.org/wikipedia/commons/a/a3/Orange_star.svg'} /></p>
                </div>
                <div style={{padding:"0.1em",marginLeft:"0.5em",marginTop:"-0.3em"}}>
                  <p style={{fontSize:"0.7em", fontWeight:"bold"}}>Binance</p>
                  <p style={{fontSize:"0.5em"}}>Leading crypto  site for beginners</p>
                </div>

              <div className="stars-review">
              <div style={{display:'flex',width:"fit-content",margin:'auto',marginTop:'initial'}}>
                <span style={{marginRight:'0.2em',fontWeight:'bold'}}>20</span>
                <ReactStars
                    count={5}
                    size={14}
                    value={3.8}
                    edit={false}
                    isHalf={true}
                    activeColor="#ffd700"
                  />
                </div>
              </div>
              <div className="end-review">
                
                <div style={{backgroundColor:"#fc89ac"}} className="inside-end-review"><p>REVIEW</p></div><div style={{backgroundColor:"#8A2BE2"}} className="inside-end-review" ><p style={{textAlign:"right"}}>SITE</p></div>
                </div>
                </div>
            </div>
            <div className="review">
              <div className="single-review"> 
                <div style={{width:"fit-content"}}>
                  <img className='review-logo' src={'https://www.logo.wine/a/logo/Binance/Binance-Icon-Logo.wine.svg'}/>
                  <p className='review-score'>3.8<img style={{width:"1em",margin:"auto",marginLeft:"0.2em"}} className='crypto-icon' src={'https://upload.wikimedia.org/wikipedia/commons/a/a3/Orange_star.svg'} /></p>
                </div>
                <div style={{padding:"0.1em",marginLeft:"0.5em",marginTop:"-0.3em"}}>
                  <p style={{fontSize:"0.7em", fontWeight:"bold"}}>Binance</p>
                  <p style={{fontSize:"0.5em"}}>Leading crypto  site for beginners</p>
                </div>

              <div className="stars-review">
              <div style={{display:'flex',width:"fit-content",margin:'auto',marginTop:'initial'}}>
                <span style={{marginRight:'0.2em',fontWeight:'bold'}}>20</span>
                <ReactStars
                    count={5}
                    size={14}
                    value={3.8}
                    edit={false}
                    isHalf={true}
                    activeColor="#ffd700"
                  />
                </div>
              </div>
              <div className="end-review">
                
                <div style={{backgroundColor:"#fc89ac"}} className="inside-end-review"><p>REVIEW</p></div><div style={{backgroundColor:"#8A2BE2"}} className="inside-end-review" ><p style={{textAlign:"right"}}>SITE</p></div>
                </div>
                </div>
            </div>
            <div className="review">
              <div className="single-review"> 
                <div style={{width:"fit-content"}}>
                  <img className='review-logo' src={'https://www.logo.wine/a/logo/Binance/Binance-Icon-Logo.wine.svg'}/>
                  <p className='review-score'>3.8<img style={{width:"1em",margin:"auto",marginLeft:"0.2em"}} className='crypto-icon' src={'https://upload.wikimedia.org/wikipedia/commons/a/a3/Orange_star.svg'} /></p>
                </div>
                <div style={{padding:"0.1em",marginLeft:"0.5em",marginTop:"-0.3em"}}>
                  <p style={{fontSize:"0.7em", fontWeight:"bold"}}>Binance</p>
                  <p style={{fontSize:"0.5em"}}>Leading crypto  site for beginners</p>
                </div>

              <div className="stars-review">
              <div style={{display:'flex',width:"fit-content",margin:'auto',marginTop:'initial'}}>
                <span style={{marginRight:'0.2em',fontWeight:'bold'}}>20</span>
                <ReactStars
                    count={5}
                    size={14}
                    value={3.8}
                    edit={false}
                    isHalf={true}
                    activeColor="#ffd700"
                  />
                </div>
              </div>
              <div className="end-review">
                
                <div style={{backgroundColor:"#fc89ac"}} className="inside-end-review"><p>REVIEW</p></div><div style={{backgroundColor:"#8A2BE2"}} className="inside-end-review" ><p style={{textAlign:"right"}}>SITE</p></div>
                </div>
                </div>
            </div>
            <div className="review">
              <div className="single-review"> 
                <div style={{width:"fit-content"}}>
                  <img className='review-logo' src={'https://www.logo.wine/a/logo/Binance/Binance-Icon-Logo.wine.svg'}/>
                  <p className='review-score'>3.8<img style={{width:"1em",margin:"auto",marginLeft:"0.2em"}} className='crypto-icon' src={'https://upload.wikimedia.org/wikipedia/commons/a/a3/Orange_star.svg'} /></p>
                </div>
                <div style={{padding:"0.1em",marginLeft:"0.5em",marginTop:"-0.3em"}}>
                  <p style={{fontSize:"0.7em", fontWeight:"bold"}}>Binance</p>
                  <p style={{fontSize:"0.5em"}}>Leading crypto  site for beginners</p>
                </div>

              <div className="stars-review">
              <div style={{display:'flex',width:"fit-content",margin:'auto',marginTop:'initial'}}>
                <span style={{marginRight:'0.2em',fontWeight:'bold'}}>20</span>
                <ReactStars
                    count={5}
                    size={14}
                    value={3.8}
                    edit={false}
                    isHalf={true}
                    activeColor="#ffd700"
                  />
                </div>
              </div>
              <div className="end-review">
                
                <div style={{backgroundColor:"#fc89ac"}} className="inside-end-review"><p>REVIEW</p></div><div style={{backgroundColor:"#8A2BE2"}} className="inside-end-review" ><p style={{textAlign:"right"}}>SITE</p></div>
                </div>
                </div>
            </div>
          </div>
          <div className='bp-middle-left bp-blueshadow'>
          <br/><p className='bp-title'>My Faucet</p>
          <p>You can roll a faucet every 30 minutes</p>
          <div 
          id='rdm'
            className = "randomNumber">
          <RandomReveal
            isPlaying={isPlaying}
            duration={Infinity}
            revealDuration={0.7}
            characterSet={["0 ","1 ","2 ","3 ","4 ","5 ","6 ","7 ","8 ","9 "]}
            characters="000000"
            onComplete={() => [false,3000]}
          />
          </div>
          
          <div style={{height:'2em'}} className='bp-cbutton'><a id='roll'>ROLL & WIN</a></div>
          <p id='resultDisplay' className="resultDisplay"></p>  
          </div>
          <div className='bp-middle-left-sub bp-blueshadow'>
            <p className="qmark numbering ">?</p>
            <img className='crypto-icon crownSvg' src={'https://www.flaticon.com/svg/static/icons/svg/2122/2122712.svg'} />
            <p style={{marginTop:-2}}>JACKPOT</p>
            <h1 style={{marginBottom:-10,marginTop:-8, color:'#FFBF00'}}>$777.25</h1>
          </div>
          <div className='bp-middle-left-sub bp-blueshadow' style={{}}>
          <div className='lotteryRange1'>
              <table>
                <tbody><tr>
                <td style={{width: '5em'}}><p className="numbering">1</p></td>
                <td style={{width: '25em', textAlign:'left',letterSpacing:'2px'}}><p>Roll 0 - 999,500</p></td>

                <td style={{width: '30%', paddingRight:'1em'}}><div style={{backgroundColor:'rgba(0,0,0,0.4)',padding:'0.2em',borderRadius:'0.4em'}}>5 POINTS</div></td>
              </tr></tbody>

              </table>
              </div>
          <div className='lotteryRange2'>
             <table><tbody> <tr>
                <td style={{width: '5em'}}><p className="numbering">2</p></td>
                <td style={{width: '25em', textAlign:'left',letterSpacing:'2px'}}><p>Roll 999,501 - 999,700</p></td>

                <td style={{width: '30%', paddingRight:'1em'}}><div style={{backgroundColor:'rgba(0,0,0,0.4)',padding:'0.2em',borderRadius:'0.4em'}}>10 POINTS</div></td>
              </tr></tbody></table>
              </div>
          <div className='lotteryRange3'>
              <table><tbody><tr>
                <td style={{width: '5em'}}><p className="numbering">3</p></td>
                <td style={{width: '25em', textAlign:'left',letterSpacing:'2px'}}><p>Roll 999,701 - 999,850</p></td>

                <td style={{width: '30%', paddingRight:'1em'}}><div style={{backgroundColor:'rgba(0,0,0,0.4)',padding:'0.2em',borderRadius:'0.4em'}}>100 POINTS</div></td>
              </tr></tbody></table>
              </div>
          <div className='lotteryRange4'>
              <table><tbody><tr>
                <td style={{width: '5em'}}><p className="numbering">4</p></td>
                <td style={{width: '25em', textAlign:'left',letterSpacing:'2px'}}><p>Roll 999,851 - 999,920</p></td>

                <td style={{width: '30%', paddingRight:'1em'}}><div style={{backgroundColor:'rgba(0,0,0,0.4)',padding:'0.2em',borderRadius:'0.4em'}}>200 POINTS</div></td>
              </tr></tbody></table>
              </div>
          <div className='lotteryRange5'>
              <table><tbody><tr>
                <td style={{width: '5em'}}><p className="numbering">5</p></td>
                <td style={{width: '25em', textAlign:'left',letterSpacing:'2px'}}><p>Roll 999,921 - 999,999</p></td>

                <td style={{width: '30%', paddingRight:'1em'}}><div style={{backgroundColor:'rgba(0,0,0,0.4)',padding:'0.2em',borderRadius:'0.4em'}}>500 POINTS</div></td>
              </tr></tbody></table>
              </div>
          </div>
          <div className='clearfix'/>
        </div>
      </div>
      <div className='bp-center-text'>
      <div style={{ width: '80%',whiteSpace: 'nowrap',margin:'auto'}}>
        <Marquee >
          <div  className='bp-crypto-price-item'>
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
              <thead>
              <tr>
                <th style={{width: '20%'}}>DATE</th>
                <th style={{width: '30%'}}>AMOUNT</th>
                <th style={{width: '30%'}}>STATUS</th>
              </tr>
              </thead>
              <tbody>
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
              </tbody>
            </table>
          </div>
          <div className='clearfix'/>
        </div>
      </div><br/><br/><br/>
      {/* <p>Hola</p> */}
      <style jsx>{`
                .stars-review{
                  width:8em;
                  height:3em;
                  position:absolute;
                  margin-top: 5em;
                  display:flex;
                  font-size0.6em;
                  
                }
                .end-review{
                  height: 2em;
                  background-color: black;
                  position: absolute;
                  margin-top: 7em;
                  width: 11.5%;
                  margin-left: -0.5em;
                  display: -webkit-box;
                  display: -webkit-flex;
                  display: -ms-flexbox;
                  display: flex;
                              }
                .inside-end-review{
                  width: 50%;
                  cursor:pointer
                }
                .inside-end-review p{
                  margin-top: 0.7em;
                  height: max-content;
                  font-size:0.7em;
                  font-weight:bold;
                  cursor:pointer;
                  text-align:center !important;
                      }
                .review{
                  display:contents
                }
                .review-score{
                  background-color:#151524;
                  font-size:0.7em;
                  text-align:center;
                  padding:0.3em;
                  border-radius:3px;
                  margin-top:0em
                }
                .review-logo{
                  width:3em;
                }
                .single-review{
                  width:17%;
                  height:4em;
                  background-color:#252540;
                  border-radius:3px;
                  margin:0.5em;
                  padding:0.5em;
                  display:flex;
                  font-family:"Open Sans"
                }
                .bp-reviewbox{
                  display: flex;
                  width:80%;
                  height:10.5em;
                  border:5px solid #1E1D32;
                  border-top:none;
                  margin:auto
                }
                .resultDisplay{
                  font-size: 1.5em!important;
    font-weight: 600;
    margin-top: 3em !important;
                }
                .randomNumber{
                  font-size:5em !important;
                  background-color:#1e1d31;
                  padding:10px 10px;
                  width:fit-content;
                  margin:0 auto;
                  margin-top:0.6em;
                }
                .qmark{
                  right: 20%;
                  position: absolute;
                  margin-top: 1em !important;
                  pointer-events: none;
                }
                .crownSvg{
                  margin-left: -11em;
                  position: absolute;
                  width: 4em;
                  margin-top: -0.2em;
                }
                .numbering{
                  font-weight:800;
                  background: #ffbf00;
                  width: 1.5em;
                  margin: auto;
                  padding: 0.4em;
                  border-radius: 50%;
                      }
                .cryptoMarquee{
                  margin-left:3em
                }
                .lotteryRange1{
                  font-weight:600;
                  height:4em;
                  background-color: #CB5C0D;
                  border-top-left-radius: 0.4em;
                  width: revert;
                  margin-left: -1.2em;
                  margin-top: -1em;
                  border-top-right-radius: 0.4em;
                  margin-right: -1em;
                }
                .lotteryRange2{
                  font-weight:600;
                  height:4em;
                  background-color: #db7406;
                  width: revert;
                  margin-left: -1.2em;
                  margin-right: -1em;
                }
                .lotteryRange3{
                  font-weight:600;
                  height:4em;
                  background-color: #e98c00;
                  width: revert;
                  margin-left: -1.2em;
                  margin-right: -1em;
                }
                .lotteryRange4{
                  font-weight:600;
                  height:4em;
                  background-color: #ef9900;
                  width: revert;
                  margin-left: -1.2em;
                  margin-right: -1em;
                }
                .lotteryRange5{
                  font-weight:600;
                  height:4em;
                  background-color: #f5a500;
                  width: revert;
                  margin-left: -1.2em;
                  border-bottom-right-radius: 0.4em;
                  border-bottom-left-radius: 0.4em;
                  margin-bottom: -2em;
                  margin-right: -1em;
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
    /* margin-right: 30px; */
    margin-top: 30px;
    width: 44%;
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
                  .stars-review{
                    left: 0;
                    right: 0;
                    margin-left: auto;
                    margin-right: auto;
                    width: 40%;
                  }
                  .end-review{
                    left: 0;
                    right: 0;
                    margin-left: auto;
                    margin-right: auto;
                    width: 40%;
                  }
                  .single-review{
                        width: 83%;
                        height: 9em;
                        background-color: #252540;
                        border-radius: 3px;
                        margin: auto;
                        padding: 0.5em;
                        display: -webkit-box;
                        display: -webkit-flex;
                        display: -ms-flexbox;
                        display: flex;
                        font-family: "Open Sans";
                        margin-bottom: 0.5em;
                  }
                  .bp-reviewbox{
                        display: block;
                        width: 80%;
                        height: 52.5em;
                        border: 5px solid #1E1D32;
                        border-top: none;
                        margin: auto;
                  }
                  .resultDisplay{
                    font-size:2em !important;
                    margin-top:2em !important

                  }
                  .randomNumber{
                    font-size:3em !important
                  }

                  .qmark{
                    display:none 
                  }
                  .lotteryRange1, .lotteryRange2, .lotteryRange3, .lotteryRange4, .lotteryRange5{
                    width:auto;
                    margin-right:-1.2em
                  }
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
