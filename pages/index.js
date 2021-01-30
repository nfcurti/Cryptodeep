import React, { useState, useEffect } from 'react';
import Marquee from 'react-double-marquee';
import { RandomReveal } from "react-random-reveal";
import ReactStars from "react-rating-stars-component";
import PredictPopup from '../components/PredictPopup';
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useRouter } from 'next/router'
import ServiceCookies from '../services/cookies';
import ServiceAuth from '../services/ServiceAuth';
import BasePage from '../components/BasePage';
import { PaginatedList } from 'react-paginated-list';
import Countdown from 'react-countdown';
import FeaturedReviews from '../components/FeaturedReviews';
import Translator from '../services/translator';
import GamblePopup from '../components/gamblePopup';

export default class Home extends React.Component {

  constructor() {
    super();

    this.state = {
      faucetAlertSound: true,
      play: false,
      audio: null,
      gamblegameShow: false,
      predictgameShow: false,
      isMonday: false,
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
      userfaucetbalance: 0,
      cryptoval: null,
      reviewsites: [],
      reviews: [],
      //Lang
      translatorData: [],
      currentLang: 'en',
      usdperpoint: 0
    }
  }

  componentDidMount() {
    var date = new Date();
    if(date.getDay() == 1) {
      this.setState({
        isMonday: true
      })
    }
    this._initData();
    this._loadLang();
    this._loadReviews();
    
    this.setState({
      audio: new Audio('/skype-notification-sound.mp3')
    }, () => {
      this.state.audio.addEventListener('ended', () => {
        this.setState({
          play: false
        })
      })
    })
    
  }

  componentWillUnmount() {
    if(this.state.audio != null) {
      this.state.audio.removeEventListener('ended', () => {
        this.setState({
          play: false
        })
      })
    }
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
    
    ServiceAuth.getreviewitems({
        
      }).then(response => {
        const data = response.data;
        console.log(data);
        if(data.data.items != null) {
            var _pool = data.data.items;
            console.log(_pool);
            _pool = _pool.filter(p => p.enabled == true && p.featured == true);

          ServiceAuth.getreviews({
            // "token": userCookies['cktoken']
          }).then(response => {
            const dataz = response.data;
            console.log(dataz);
            // _pool = this.shuffle(_pool);
            _pool = _pool.sort(function(a, b) {
              return parseFloat(b.importance) - parseFloat(a.importance);
          })

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
  }

  _loadLang = () => {
    const langCookies = ServiceCookies.getLangCookies();
    ServiceAuth.getlanguagedataset({
      
    }).then(response => {
      const data = response.data;
      console.log(data);
      if(data.data.items != null) {
          this.setState({
            currentLang: langCookies['cklang'],
              translatorData: data.data.items
          })
      }
    }).catch(e => {
      console.log(e);
      alert(e);
      return;
    })
  }

  _initData = () => {
    const userCookies = ServiceCookies.getUserCookies();
    
      var _tmpMap = userCookies['cktoken'] == null ? {} : {
        "token": userCookies['cktoken']
      }

      ServiceAuth.getgeneralsettings(_tmpMap).then(response => {
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
          faucetAlertSound: dataB.data.faucetalertsound,
          userwallet: dataB.data.userwallet,
          userfaucetbalance: dataB.data.userfaucetbalance,
          cryptoval: dataB.data.cryptoval,
          usdperpoint: dataB.data.settings.usdperpoint
        })
        ServiceAuth.getfaucets({
          // "token": userCookies['cktoken']
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
        // alert(e);
        return;
      })
    // }
  }

  completeFaucet = () => {
    
  }

  _rollPressed = () => {
    // if(this.state.userfaucetbalance <= 0) {
    //   alert('')
    //   return;
    // }
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
        alert('Error. Check if you\'re logged and if you have faucets available');
        return;
      })
    }
  }

  render() {
    return (
      <BasePage
        currentLang={this.state.currentLang}
        translatorData={this.state.translatorData}
      >
  
        <div className='bp-middle bp-h-bg'>
          <div className='bp-middle-over'>
            
            <div className={`bp-reviewbox`}>
             {
               this.state.reviewsites.map(rs => {
                 return  <FeaturedReviews 
                  item={rs}
                  featured={true}
                  reviews={this.state.reviews}
                  currentLang={this.state.currentLang}
                  translatorData={this.state.translatorData}
                 />
               
               })
             } 
             
            </div>
            <div className='bp-middle-left-sub bp-blueshadow' style={{
              width: '97%'
            }}>
              <img className='crypto-icon crownSvg' src='images/cryptodeep_asset_6.png' style={{
                marginTop: '0px'
              }} />
              <p style={{marginTop:-2, textTransform: 'uppercase'}}>{Translator.getStringTranslated('global_faucetbalance', this.state.currentLang, this.state.translatorData)}</p>
              
    <h1 style={{marginBottom:-10,marginTop:-8, color:'#FFBF00'}}>{this.state.userfaucetbalance} {Translator.getStringTranslated('global_faucetscount', this.state.currentLang, this.state.translatorData)}</h1>
            </div>

            <div className='clearfix'/>

            <div className='bp-middle-left bp-blueshadow'>
            
            <br/>
            <div className='over_robot_f'/>
            <br/><p className='bp-title'>{Translator.getStringTranslated('fct_myfaucet', this.state.currentLang, this.state.translatorData)}</p>
            <p style={{
              fontSize: '12px'
            }}>{Translator.getStringTranslated('fct_youcanroll', this.state.currentLang, this.state.translatorData).replace('%val%', this.state.sv_faucetdelay)}</p>
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
              <div style={{height:'2em'}} className='bp-cbuttonxxx'><button onClick={() => this._rollPressed()}><a id='roll'>{Translator.getStringTranslated('fct_rollnwin', this.state.currentLang, this.state.translatorData)}</a></button></div>
            }
            {
              this.state.faucetmsg == '' ? null :
              (
                this.state.remTime == null ? 
                <p id='resultDisplay' className="resultDisplay" style={{marginTop: '0px', marginBottom: '0px'}}>{this.state.faucetmsg}</p> 
                : <Countdown
                  renderer={({ hours, minutes, seconds, completed }) => {
                    if (completed) {
                      if(this.state.audio != null && this.state.faucetAlertSound) {
                        this.setState({ play: !this.state.play }, () => {
                          this.state.play ? this.state.audio.play() : this.state.audio.pause();
                        });
                      }
                      // Render a completed state
                      return <div style={{height:'2em'}} className='bp-cbuttonxxx'><button onClick={() => this._rollPressed()}><a id='roll'>{Translator.getStringTranslated('fct_rollnwin', this.state.currentLang, this.state.translatorData)}</a></button>
                      <br/>
                      <p className="resultDisplay">You need to wait {("0" + hours).slice(-2)}:{("0" + minutes).slice(-2)}:{("0" + seconds).slice(-2)}</p>
                      </div>;
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
            {
             
              !this.state.isMonday ? null : 
              <div style={{height:'2em', marginTop: '20px'}} className='bp-cbuttonxxx'><button onClick={() => {
                this.setState({
                  predictgameShow: true
                })
              }}><a id='roll'>{Translator.getStringTranslated('fct_extrafaucet', this.state.currentLang, this.state.translatorData)}</a></button></div>
              }
              <div style={{height:'2em', marginTop: '20px'}} className='bp-cbuttonxxx'><button onClick={() => {
                this.setState({
                  gamblegameShow: true
                })
              }} style={{
                backgroundImage: 'url(\'/images/buttonbgb.png\')'
              }}><a style={{
              }} id='rolla'>{Translator.getStringTranslated('global_gamble', this.state.currentLang, this.state.translatorData)}</a></button></div>
              <Modal  open={this.state.predictgameShow} onClose={() => {
                this.setState({
                  predictgameShow: false
                })
              }} classNames={{
                overlay: 'customOverlay',
                modal: 'customModal',
              }}>
                <PredictPopup
                  btcprice={this.state.cryptoval == null ? 0 : this.state.cryptoval.BTC.last}
                  currentLang={this.state.currentLang}
                  translatorData={this.state.translatorData}
                style="background-color:#252540"></PredictPopup>
              </Modal>
              <Modal  open={this.state.gamblegameShow} onClose={() => {
                this.setState({
                  gamblegameShow: false
                })
              }} classNames={{
                overlay: 'customOverlay',
                modal: 'customModal',
              }}>
                <GamblePopup
                  userfaucetbalance={this.state.userfaucetbalance}
                  currentLang={this.state.currentLang}
                  translatorData={this.state.translatorData}
                style="background-color:#252540"></GamblePopup>
              </Modal>
            </div>
            
            
            <div className='bp-middle-left-sub bp-blueshadow'>
              <img className='crypto-icon crownSvg' src={'https://images.vexels.com/media/users/3/143188/isolated/preview/5f44f3160a09b51b4fa4634ecdff62dd-money-icon-by-vexels.png'} />
              <p style={{marginTop:-2, textTransform: 'uppercase'}}>{Translator.getStringTranslated('global_wallet', this.state.currentLang, this.state.translatorData)}</p>
    <h1 style={{marginBottom:-10,marginTop:-8, color:'#FFBF00'}}>{this.state.userwallet} {Translator.getStringTranslated('global_points', this.state.currentLang, this.state.translatorData)}</h1>
            </div>
            <div className='bp-middle-left-sub bp-blueshadow'>
              
              <span className='crypto-icon crownSvg' style={{backgroundImage: 'url("/images/robot_trophy.png")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', width: '50px', height: '60px', border: 'none' }} />
              <p style={{marginTop:-2, textTransform: 'uppercase'}}>{Translator.getStringTranslated('global_jackpot', this.state.currentLang, this.state.translatorData)}</p>
              <span className='crypto-icon' style={{position: 'absolute', marginLeft: '90px', marginTop: '-30px', backgroundImage: 'url("/images/robot_trophy.png")', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', width: '50px', height: '60px', border: 'none' }} />
    <h1 style={{marginBottom:-10,marginTop:-8, color:'#FFBF00'}}>{this.state.sv_jackpot * this.state.usdperpoint} USD</h1>
    
            </div>
            
            <div className='bp-middle-left-sub bp-blueshadow' style={{}}>
            <div className='lotteryRangeN'>
                <table style={{
                  backgroundImage: 'url(\'images/jackpotline.png\')',
                  backgroundSize: '100% 50px',
                  backgroundRepeat: 'no-repeat',
                  margin: '0px',
                  width: '100%'
                }}>
                  <tbody><tr>
                  <td style={{width: '8em', marginLeft: '40px'}}><p className="numbering">1</p></td>
                  <td style={{width: '25em', textAlign:'left',letterSpacing:'2px', fontWeight: 'bold', fontSize: '14px'}}><p>{Translator.getStringTranslated('global_roll', this.state.currentLang, this.state.translatorData)} 0 - 999,500</p></td>
  
                  <td style={{paddingRight:'1em'}}><div style={{color: 'green', backgroundColor:'rgba(255,255,255,0.4)',padding:'0.2em',borderRadius:'0.4em', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '14px'}}>{this.state.sv_roll_a} {Translator.getStringTranslated('global_points', this.state.currentLang, this.state.translatorData)}</div></td>
                </tr></tbody>
  
                </table>
                </div>
            <div className='over_robot_h'/>
                <div className='lotteryRangeN'>
                <table style={{
                  backgroundImage: 'url(\'images/jackpotline.png\')',
                  backgroundSize: '100% 50px',
                  backgroundRepeat: 'no-repeat',
                  margin: '0px',
                  width: '100%'
                }}><tbody> <tr>
                  <td style={{width: '5em'}}><p className="numbering">2</p></td>
                  <td style={{width: '25em', textAlign:'left',letterSpacing:'2px', fontWeight: 'bold', fontSize: '14px'}}><p>{Translator.getStringTranslated('global_roll', this.state.currentLang, this.state.translatorData)} 999,501 - 999,700</p></td>
  
                  <td style={{paddingRight:'1em'}}><div style={{color: 'green', backgroundColor:'rgba(255,255,255,0.4)',padding:'0.2em',borderRadius:'0.4em', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '14px'}}>{this.state.sv_roll_b} {Translator.getStringTranslated('global_points', this.state.currentLang, this.state.translatorData)}</div></td>
                </tr></tbody></table>
                </div>
                <div className='lotteryRangeN'>
                <table style={{
                  backgroundImage: 'url(\'images/jackpotline.png\')',
                  backgroundSize: '100% 50px',
                  backgroundRepeat: 'no-repeat',
                  margin: '0px',
                  width: '100%'
                }}><tbody><tr>
                  <td style={{width: '5em'}}><p className="numbering">3</p></td>
                  <td style={{width: '25em', textAlign:'left',letterSpacing:'2px', fontWeight: 'bold', fontSize: '14px'}}><p>{Translator.getStringTranslated('global_roll', this.state.currentLang, this.state.translatorData)} 999,701 - 999,850</p></td>
  
                  <td style={{paddingRight:'1em'}}><div style={{color: 'green', backgroundColor:'rgba(255,255,255,0.4)',padding:'0.2em',borderRadius:'0.4em', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '14px'}}>{this.state.sv_roll_c} {Translator.getStringTranslated('global_points', this.state.currentLang, this.state.translatorData)}</div></td>
                </tr></tbody></table>
                </div>
                <div className='lotteryRangeN'>
                <table style={{
                  backgroundImage: 'url(\'images/jackpotline.png\')',
                  backgroundSize: '100% 50px',
                  backgroundRepeat: 'no-repeat',
                  margin: '0px',
                  width: '100%'
                }}><tbody><tr>
                  <td style={{width: '5em'}}><p className="numbering">4</p></td>
                  <td style={{width: '25em', textAlign:'left',letterSpacing:'2px', fontWeight: 'bold', fontSize: '14px'}}><p>{Translator.getStringTranslated('global_roll', this.state.currentLang, this.state.translatorData)} 999,851 - 999,920</p></td>
  
                  <td style={{paddingRight:'1em'}}><div style={{color: 'green', backgroundColor:'rgba(255,255,255,0.4)',padding:'0.2em',borderRadius:'0.4em', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '14px'}}>{this.state.sv_roll_d} {Translator.getStringTranslated('global_points', this.state.currentLang, this.state.translatorData)}</div></td>
                </tr></tbody></table>
                </div>
                <div className='lotteryRangeN'>
                <table style={{
                  backgroundImage: 'url(\'images/jackpotline.png\')',
                  backgroundSize: '100% 50px',
                  backgroundRepeat: 'no-repeat',
                  margin: '0px',
                  width: '100%'
                }}><tbody><tr>
                  <td style={{width: '5em'}}><p className="numbering">5</p></td>
                  <td style={{width: '25em', textAlign:'left',letterSpacing:'2px', fontWeight: 'bold', fontSize: '14px'}}><p>{Translator.getStringTranslated('global_roll', this.state.currentLang, this.state.translatorData)} 999,921 - 999,998</p></td>
  
                  <td style={{paddingRight:'1em'}}><div style={{color: 'green', backgroundColor:'rgba(255,255,255,0.4)',padding:'0.2em',borderRadius:'0.4em', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '14px'}}>{this.state.sv_roll_e} {Translator.getStringTranslated('global_points', this.state.currentLang, this.state.translatorData)}</div></td>
                </tr></tbody></table>
                </div>
                <div className='lotteryRangeN'>
                <table style={{
                  backgroundImage: 'url(\'images/jackpotline.png\')',
                  backgroundSize: '100% 50px',
                  backgroundRepeat: 'no-repeat',
                  margin: '0px',
                  width: '100%'
                }}><tbody><tr>
                  <td style={{width: '5em'}}><p className="numbering">6</p></td>
                  <td style={{width: '25em', textAlign:'left',letterSpacing:'2px', fontWeight: 'bold', fontSize: '14px'}}><p>{Translator.getStringTranslated('global_roll', this.state.currentLang, this.state.translatorData)} 999,999</p></td>
  
                  <td style={{paddingRight:'1em'}}><div style={{color: 'green', backgroundColor:'rgba(255,255,255,0.4)',padding:'0.2em',borderRadius:'0.4em', textTransform: 'uppercase', fontWeight: 'bold', fontSize: '14px'}}>{Translator.getStringTranslated('global_jackpot', this.state.currentLang, this.state.translatorData)}</div></td>
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
        <p style={{fontWeight: 700, fontSize: 16}}>{Translator.getStringTranslated('fct_history', this.state.currentLang, this.state.translatorData)}</p>
        </div>
            
        <div className='bp-middle'>
          <div className='bp-middle-over'>
            
            <div className='bp-middle-all bp-blueshadow'>

                <PaginatedList 
                  list={this.state.faucets}
                  itemsPerPage={10}
                  renderList={(list) => (
                    <table className='bp-table'>

                  <div className='over_robot_g'/>
                  <div className='over_robot_b'/>
                    <thead>
                    <tr className='bp-header'>
                      <th style={{width: '30%', textTransform: 'uppercase'}}>{Translator.getStringTranslated('global_date', this.state.currentLang, this.state.translatorData)}</th>
                      <th style={{width: '30%', textTransform: 'uppercase'}}>{Translator.getStringTranslated('global_amount', this.state.currentLang, this.state.translatorData)}</th>
                      <th style={{width: '20%', textTransform: 'uppercase'}}>{Translator.getStringTranslated('fct_rollednumber', this.state.currentLang, this.state.translatorData)}</th>
                    </tr>
                    </thead>
                    <tbody>
                    {list.map((item, id) => {
                      return (
                        <tr key={id}>
                  <td style={{width: '30%'}}>{item.created_at.split('T').join(' ').substring(0, 16)}</td>
                  <td style={{width: '30%'}}><p style={{display: 'block', textAlign: 'center'}}>{item.amount} {Translator.getStringTranslated('global_points', this.state.currentLang, this.state.translatorData)}</p></td>
                  <td style={{width: '20%', textAlign: 'center', fontWeight: 'bold',  color: 'orange', paddingBottom: '1px'}}><p style={{display: 'block', textAlign: 'center', letterSpacing: '4px', color: 'orange'}}>{item.rollednumber}</p></td>
                </tr>
                      );
                    })}
                    </tbody>
              </table>
    )}
                />
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
                    height:6.5em;
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
                    height:230px;
                    border:5px solid #1E1D32;
                    border-top:none;
                    margin: 0 auto;
                  }
                  .resultDisplay{
                    font-size: 2.1em!important;
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
                    color: green; 
                    background-color:rgba(255,255,255,0.4);
                    font-weight:800;
                    width: 1.5em;
                    margin: auto;
                    padding: 0.4em;
                    border-radius: 50%;
                    margin-left: 60px;
                    margin-right: 30px;
                        }
                  .cryptoMarquee{
                    margin-left:3em
                  }
                  .lotteryRangeN{
                    font-weight:600;
                    height: 60px;
                    width: 100%;
                  }
                  .lotteryRange1{
                    font-weight:600;
                    height:4em;
                    border-top-left-radius: 0.4em;
                    width: revert;
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
                    padding: 0 14px;
                    padding-bottom: 30px;
  
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
                          height: 230px;
                          border: 5px solid #1E1D32;
                          border-top: none;
                          margin: auto;
                    }
                    .resultDisplay{
                      font-size:2.4em !important;
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
