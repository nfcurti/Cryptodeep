import React, { useState, useEffect } from 'react';
import Marquee from 'react-double-marquee';
import { RandomReveal } from "react-random-reveal";
import ReactStars from "react-rating-stars-component";

import { useRouter } from 'next/router'
import ServiceCookies from '../services/cookies';
import ServiceAuth from '../services/ServiceAuth';
import BasePage from '../components/BasePage';
import { PaginatedList } from 'react-paginated-list';
import Countdown from 'react-countdown';
export default class Home extends React.Component {

  constructor() {
    super();

    this.state = {
      faucets: [],
      faucetmsg: '',
      result: '000000',
      resultPoints: 0,
      playing: false,
      sv_jackpot: 0,
      sv_faucetdelay: 0,
      sv_roll_a: 0,
      sv_roll_b: 0,
      sv_roll_c: 0,
      sv_roll_d: 0,
      sv_roll_e: 0,
      remTime: null,
      userwallet: 0,
      cryptoval: null,
      reviewsites: [],
      reviews: []
    }
  }

  componentDidMount() {
    this._initData();
    this._loadReviews();
  }

   shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  _loadReviews = () => {
    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null && userCookies['cktoken'] == null) {
        window.location.replace(`/account`)
    }else{
        // if(userCookies['ckpl'] != '999') {
        // window.location.replace(`/account`)
        // }else{
            ServiceAuth.getreviewitems({
                "token": userCookies['cktoken']
              }).then(response => {
                const data = response.data;
                console.log(data);
                if(data.data.items != null) {
                    var _pool = data.data.items;
                    console.log(_pool);
                    _pool = _pool.filter(p => p.enabled == true && p.featured == true);

                    var _catTemp = _pool.reduce((acc, i) => acc+i.hashtags+(_pool.indexOf(i) == _pool.length - 1 ? "" : ","), "").split(',');
                    var unique = _catTemp.filter(function(elem, index, self) {
                      return index === self.indexOf(elem);
                  })

                  ServiceAuth.getreviews({
                    "token": userCookies['cktoken']
                  }).then(response => {
                    const dataz = response.data;
                    console.log(dataz);
                    _pool = this.shuffle(_pool);

                    this.setState({
                      reviewsites: _pool.length <= 5 ? _pool : _pool.slice(0, 5),
                      reviews: dataz.data.items
                  })
                  })

                    
                }
              }).catch(e => {
                console.log(e);
                alert(e);
                return;
              })
        // }
    };
  }

  _initData = () => {
    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null && userCookies['cktoken'] == null) {
        return;
    }else{
      ServiceAuth.getgeneralsettings({
        "token": userCookies['cktoken']
      }).then(response => {
        const dataB = response.data;
        console.log(dataB);
        this.setState({
          sv_jackpot: dataB.data.settings.jackpot,
          sv_faucetdelay: dataB.data.settings.faucetdelay,
          sv_roll_a: dataB.data.settings.roll_a,
          sv_roll_b: dataB.data.settings.roll_b,
          sv_roll_c: dataB.data.settings.roll_c,
          sv_roll_d: dataB.data.settings.roll_d,
          sv_roll_e: dataB.data.settings.roll_e,
          userwallet: dataB.data.userwallet,
          cryptoval: dataB.data.cryptoval
        })
        ServiceAuth.getfaucets({
          "token": userCookies['cktoken']
        }).then(response => {
          const dataC = response.data;
          console.log(dataC.data.faucets);
          this.setState({
            faucets: dataC.data.faucets
          })
        }).catch(e => {
          console.log(e);
          alert(e);
          return;
        })
      }).catch(e => {
        console.log(e);
        alert(e);
        return;
      })
    }
  }

  completeFaucet = () => {
    
  }

  _rollPressed = () => {
    this.setState({
      playing: true
    })

    var result = (document.getElementById("rdm").innerHTML).replace(/\s/g, '');
    this.setState({
      result: result
    })
    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null || userCookies['cktoken'] == null) {
        window.location.replace(`/login`)
    }else{
      ServiceAuth.doexecutefaucet({
        "token": userCookies['cktoken'],
        "rollednumber": result
      }).then(response => {
        const data = response.data;
        console.log(data);

        if(data.diff != null) {
          setTimeout(function() {
            this.setState({
              playing: false,
              faucetmsg: data.message,
              remTime: data.diff
            })
         }.bind(this), 1000);
        }else{
          setTimeout(function() {
            this.setState({
              playing: false,
              faucetmsg: data.message
            })
            this._initData();
         }.bind(this), 1000);
        }
        
        
      }).catch(e => {
        console.log(e);
        setTimeout(function() {
          this.setState({
            playing: false
          })
       }.bind(this), 1000);
        alert(e);
        return;
      })
    }
  }

  render() {
    return (
      <BasePage>
  
        <div className='bp-middle bp-h-bg'>
          <div className='bp-middle-over'>
            <div className="bp-reviewbox">

             {
               this.state.reviewsites.map(rs => {
                 return  <div className="review">
                 <div className="single-review"> 
                   <div style={{width:"fit-content"}}>
                     <img className='review-logo' src={rs.iconurl}/>
                     <p className='review-score'>{rs.score}<img style={{width:"1em",margin:"auto",marginLeft:"0.2em"}} className='crypto-icon' src={'https://upload.wikimedia.org/wikipedia/commons/a/a3/Orange_star.svg'} /></p>
                   </div>
                   <div style={{padding:"0.1em",marginLeft:"0.5em",marginTop:"-0.3em"}}>
               <p style={{fontSize:"0.7em", fontWeight:"bold"}}>{rs.title}</p>
               <p style={{fontSize:"0.7em"}}>{rs.description.length < 36 ? rs.description : `${rs.description.substring(0, 36)}...`}</p>
                   </div>
   
                 <div className="stars-review">
                 <div style={{display:'flex',width:"fit-content",margin:'auto',marginTop:'initial'}}>
               <span style={{marginRight:'0.2em',fontWeight:'bold'}}>{this.state.reviews.filter(r => r.reviewid == rs._id).length} ({this.state.reviews.filter(r => r.reviewid == rs._id).length == 0 ? '-' : this.state.reviews.filter(r => r.reviewid == rs._id).reduce((acc, r) => acc+r.scoregiven, 0) / this.state.reviews.filter(r => r.reviewid == rs._id).length})</span>
                   <ReactStars
                       count={5}
                       size={14}
                       value={this.state.reviews.filter(r => r.reviewid == rs._id).reduce((acc, r) => acc+r.scoregiven, 0) / this.state.reviews.filter(r => r.reviewid == rs._id).length}
                       edit={false}
                       isHalf={true}
                       activeColor="#ffd700"
                     />
                   </div>
                 </div>
                 <div className="end-review">
                   
                   <div onClick={() => {
                     window.location.replace(`/single?id=${rs._id}`);
                   }} style={{backgroundColor:"#f5a500",    borderTopLeftRadius: '1em',borderBottomLeftRadius: '1em'}} className="inside-end-review">
                     <p>REVIEW</p>
                   </div>
                   <div onClick={() => {
                     const tab = window.open(rs.siteurl, '_blank');
                   }} style={{backgroundColor:"#353535",    borderTopRightRadius: '1em',borderBottomRightRadius: '1em'}} className="inside-end-review" >
                     <p style={{textAlign:"right"}}>SITE</p>
                   </div>
                 </div>
                   </div>
               </div>
               
               })
             } 
             
            </div>
            
            <div className='bp-middle-left bp-blueshadow'>
            
            <br/>
            <div className='over_robot_a'/>
            <br/><p className='bp-title'>My Faucet</p>
            <p>You can roll a faucet every {this.state.sv_faucetdelay} minutes</p>
            <div 
              id='rdm'
              className = "randomNumber">
            <RandomReveal
              isPlaying={this.state.playing}
              duration={Infinity}
              revealDuration={0}
              characterSet={["0 ","1 ","2 ","3 ","4 ","5 ","6 ","7 ","8 ","9 "]}
              characters={this.state.result}
              onComplete={(() => this.completeFaucet())}
            />
            </div>
            
            {
              (this.state.playing || this.state.remTime != null) ? null :
              <div style={{height:'2em'}} className='bp-cbutton'><button onClick={() => this._rollPressed()}><a id='roll'>ROLL & WIN</a></button></div>
            }
            {
              this.state.faucetmsg == '' ? null :
              (
                this.state.remTime == null ? 
                <p id='resultDisplay' className="resultDisplay">{this.state.faucetmsg}</p> 
                : <Countdown
                  renderer={({ hours, minutes, seconds, completed }) => {
                    if (completed) {
                      // Render a completed state
                      return <div style={{height:'2em'}} className='bp-cbutton'><button onClick={() => this._rollPressed()}><a id='roll'>ROLL & WIN</a></button></div>;
                    } else {
                      // Render a countdown
                      return <p className="resultDisplay">You need to wait {("0" + hours).slice(-2)}:{("0" + minutes).slice(-2)}:{("0" + seconds).slice(-2)}</p>;
                    }
                  }}
                  onComplete={() => {
                    this.setState({
                      faucetmsg: '',
                      remTime: null
                    })
                  }}
                  date={Date.now() + (this.state.remTime * 60000)}
                />
              )
              
            }
             
            </div>
            
            
            <div className='bp-middle-left-sub bp-blueshadow'>
              <img className='crypto-icon crownSvg' src={'https://images.vexels.com/media/users/3/143188/isolated/preview/5f44f3160a09b51b4fa4634ecdff62dd-money-icon-by-vexels.png'} />
              <p style={{marginTop:-2}}>WALLET</p>
    <h1 style={{marginBottom:-10,marginTop:-8, color:'#FFBF00'}}>{this.state.userwallet} points</h1>
            </div>
            <div className='bp-middle-left-sub bp-blueshadow'>
              
              <span className='crypto-icon crownSvg' style={{backgroundImage: 'url("/images/robot_trophy.png")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', width: '50px', height: '60px', border: 'none' }} />
              <p style={{marginTop:-2}}>JACKPOT</p>
              <span className='crypto-icon' style={{position: 'absolute', marginLeft: '90px', marginTop: '-30px', backgroundImage: 'url("/images/robot_trophy.png")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', width: '50px', height: '60px', border: 'none' }} />
    <h1 style={{marginBottom:-10,marginTop:-8, color:'#FFBF00'}}>{this.state.sv_jackpot} points</h1>
    
            </div>
            
            <div className='bp-middle-left-sub bp-blueshadow' style={{}}>
            <div className='lotteryRange1'>
                <table>
                  <tbody><tr>
                  <td style={{width: '5em'}}><p className="numbering">1</p></td>
                  <td style={{width: '25em', textAlign:'left',letterSpacing:'2px'}}><p>Roll 0 - 999,500</p></td>
  
                  <td style={{width: '30%', paddingRight:'1em'}}><div style={{backgroundColor:'rgba(0,0,0,0.4)',padding:'0.2em',borderRadius:'0.4em'}}>{this.state.sv_roll_a} POINTS</div></td>
                </tr></tbody>
  
                </table>
                </div>
            <div className='lotteryRange2'>
               <table><tbody> <tr>
                  <td style={{width: '5em'}}><p className="numbering">2</p></td>
                  <td style={{width: '25em', textAlign:'left',letterSpacing:'2px'}}><p>Roll 999,501 - 999,700</p></td>
  
                  <td style={{width: '30%', paddingRight:'1em'}}><div style={{backgroundColor:'rgba(0,0,0,0.4)',padding:'0.2em',borderRadius:'0.4em'}}>{this.state.sv_roll_b} POINTS</div></td>
                </tr></tbody></table>
                </div>
            <div className='lotteryRange3'>
                <table><tbody><tr>
                  <td style={{width: '5em'}}><p className="numbering">3</p></td>
                  <td style={{width: '25em', textAlign:'left',letterSpacing:'2px'}}><p>Roll 999,701 - 999,850</p></td>
  
                  <td style={{width: '30%', paddingRight:'1em'}}><div style={{backgroundColor:'rgba(0,0,0,0.4)',padding:'0.2em',borderRadius:'0.4em'}}>{this.state.sv_roll_c} POINTS</div></td>
                </tr></tbody></table>
                </div>
            <div className='lotteryRange4'>
                <table><tbody><tr>
                  <td style={{width: '5em'}}><p className="numbering">4</p></td>
                  <td style={{width: '25em', textAlign:'left',letterSpacing:'2px'}}><p>Roll 999,851 - 999,920</p></td>
  
                  <td style={{width: '30%', paddingRight:'1em'}}><div style={{backgroundColor:'rgba(0,0,0,0.4)',padding:'0.2em',borderRadius:'0.4em'}}>{this.state.sv_roll_d} POINTS</div></td>
                </tr></tbody></table>
                </div>
            <div className='lotteryRange4'>
                <table><tbody><tr>
                  <td style={{width: '5em'}}><p className="numbering">5</p></td>
                  <td style={{width: '25em', textAlign:'left',letterSpacing:'2px'}}><p>Roll 999,921 - 999,998</p></td>
  
                  <td style={{width: '30%', paddingRight:'1em'}}><div style={{backgroundColor:'rgba(0,0,0,0.4)',padding:'0.2em',borderRadius:'0.4em'}}>{this.state.sv_roll_e} POINTS</div></td>
                </tr></tbody></table>
                </div>
            <div className='lotteryRange5'>
                <table><tbody><tr>
                  <td style={{width: '5em'}}><p className="numbering">6</p></td>
                  <td style={{width: '25em', textAlign:'left',letterSpacing:'2px'}}><p>Roll 999,999</p></td>
  
                  <td style={{width: '30%', paddingRight:'1em'}}><div style={{backgroundColor:'rgba(0,0,0,0.4)',padding:'0.2em',borderRadius:'0.4em'}}>JACKPOT</div></td>
                </tr></tbody></table>
                </div>
            </div>
            <div className='clearfix'/>
          </div>
        </div>
        
        <div className='bp-center-text'>
        <div style={{ width: '80%',whiteSpace: 'nowrap',margin:'auto'}}>
          {this.state.cryptoval == null ? null : <Marquee >
            <div  className='bp-crypto-price-item'>
          <p style={{fontWeight: 400, fontSize: 12}}><img className='crypto-icon' src={'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png'} /> ${this.state.cryptoval.BTC.last}<span className={this.state.cryptoval.BTC.bid_ask_spread_percentage > 0 ? 'bp-crypto-price-avg-span-success' :'bp-crypto-price-avg-span-fail'}><div className={this.state.cryptoval.BTC.bid_ask_spread_percentage > 0 ? 'bp-crypto-pass' : 'bp-crypto-pasf'}></div>+{this.state.cryptoval.BTC.bid_ask_spread_percentage.toFixed(4)}%</span></p>
            </div>
            <div className='bp-crypto-price-item'>
              <p style={{fontWeight: 400, fontSize: 12}}><img className='crypto-icon' src={'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/256/Ethereum-ETH-icon.png'} />${this.state.cryptoval.ETH.last}<span className={this.state.cryptoval.ETH.bid_ask_spread_percentage > 0 ? 'bp-crypto-price-avg-span-success' :'bp-crypto-price-avg-span-fail'}><div className={this.state.cryptoval.ETH.bid_ask_spread_percentage > 0 ? 'bp-crypto-pass' : 'bp-crypto-pasf'}></div>+{this.state.cryptoval.ETH.bid_ask_spread_percentage.toFixed(4)}%</span></p>
            </div>
            <div className='bp-crypto-price-item'>
              <p style={{fontWeight: 400, fontSize: 12}}><img className='crypto-icon' src={'https://en.bitcoinwiki.org/upload/en/images/thumb/c/c5/Litecoin-news.png/900px-Litecoin-news.png'} />${this.state.cryptoval.LTC.last}<span className={this.state.cryptoval.LTC.bid_ask_spread_percentage > 0 ? 'bp-crypto-price-avg-span-success' :'bp-crypto-price-avg-span-fail'}><div className={this.state.cryptoval.LTC.bid_ask_spread_percentage > 0 ? 'bp-crypto-pass' : 'bp-crypto-pasf'}></div>+{this.state.cryptoval.LTC.bid_ask_spread_percentage.toFixed(4)}%</span></p>
            </div>
            <div className='bp-crypto-price-item'>
              <p style={{fontWeight: 400, fontSize: 12}}><img className='crypto-icon' src={'https://cdn4.iconfinder.com/data/icons/crypto-currency-and-coin-2/256/tron_trn_coin-512.png'} />${this.state.cryptoval.TRX.last}<span className={this.state.cryptoval.TRX.bid_ask_spread_percentage > 0 ? 'bp-crypto-price-avg-span-success' :'bp-crypto-price-avg-span-fail'}><div className={this.state.cryptoval.TRX.bid_ask_spread_percentage > 0 ? 'bp-crypto-pass' : 'bp-crypto-pasf'}></div>+{this.state.cryptoval.TRX.bid_ask_spread_percentage.toFixed(4)}%</span></p>
            </div>
          </Marquee>}
          </div>
          
        </div>
        <div className='bp-center-text'>
        <p style={{fontWeight: 700, fontSize: 16}}>Faucet history</p>
        </div>
            
        <div className='bp-middle'>
          <div className='bp-middle-over'>
            
            <div className='bp-middle-all bp-blueshadow'>

                <PaginatedList 
                  list={this.state.faucets}
                  itemsPerPage={10}
                  renderList={(list) => (
                    <table className='bp-table'>

                  <div className='over_robot_b'/>
                    <thead>
                    <tr className='bp-header'>
                      <th style={{width: '30%'}}>DATE</th>
                      <th style={{width: '30%'}}>AMOUNT</th>
                      <th style={{width: '20%'}}>ROLLED NUMBER</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map((item, id) => {
                      return (
                        <tr key={id}>
                  <td style={{width: '30%'}}>{item.created_at.split('T').join(' ').substring(0, 16)}</td>
                  <td style={{width: '30%'}}><p style={{display: 'block', textAlign: 'center'}}>{item.amount} Points</p></td>
                  <td style={{width: '20%', textAlign: 'center', fontWeight: 'bold',  color: 'orange', paddingBottom: '1px'}}><p style={{display: 'block', textAlign: 'center', letterSpacing: '4px', color: 'orange'}}>{item.rollednumber}</p></td>
                </tr>
                      );
                    })}
                    </tbody>
              </table>
    )}
                />
                
                {/* <tr>
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
                </tbody> */}
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
                    margin-top: 5.5em;
                    display:flex;
                    
                  }
                  .end-review{
                    height: 2em;
                    position: absolute;
                    margin-top: 7em;
                    width: 13.9%;
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
                    height:5em;
                    background-color:#252540;
                    border-radius:3px;
                    margin:0.5em;
                    padding:0.5em;
                    display:flex;
                    font-family:"Nunito"
                  }
                  .bp-reviewbox{
                    display: flex;
                    width:95%;
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
                    border: none;
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

                  .bp-middle-left-subduo {
                    text-align: center;
      /* margin-right: 30px; */
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
  
                  .bp-middle-left-sub {
                    text-align: center;
      /* margin-right: 30px; */
      margin-top: 30px;
      width: 44%;
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
                          font-family: "Nunito";
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
    );
  }
}
