import React, { useState, useEffect } from 'react';
import Marquee from 'react-double-marquee';
import ReactStars from "react-rating-stars-component";

import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from 'next/router'
import BasePage from '../components/BasePage';
import ServiceAuth from '../services/ServiceAuth';
import ServiceCookies from '../services/cookies';
import FeaturedReviews from '../components/FeaturedReviews';
import { PaginatedList } from 'react-paginated-list';
import Translator from '../services/translator';


export default class Home extends React.Component {


  constructor() {
    super();
    this.state = {
      items: [],
      filteredList: [],
      reviews: [],
      categories: [],
      subcategories: [],
      selectedCategory: '',
      selectedSubcategory: '',

      userfaucetbalance: 0,
      formController: {
        search: ''
      },
      //Lang
      translatorData: [],
      currentLang: 'en'
    }
  }

  _loadLang = () => {
    const langCookies = ServiceCookies.getLangCookies();
    this.setState({
        currentLang: langCookies['cklang']
    })
    ServiceAuth.getlanguagedataset({
      
    }).then(response => {
      const data = response.data;
      console.log(data);
      if(data.data.items != null) {
          this.setState({
              translatorData: data.data.items
          })
      }
    }).catch(e => {
      console.log(e);
      alert(e);
      return;
    })
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    const controller = this.state.formController;
    controller[name] = value;
    this.setState({
      formController: controller
    })
  }

  componentDidMount() {
    this._loadLang();
    // const userCookies = ServiceCookies.getUserCookies();
    // if(userCookies['ckuserid'] == null && userCookies['cktoken'] == null) {
    //     window.location.replace(`/account`)
    // }else{
            ServiceAuth.getreviewitems({
                // "token": userCookies['cktoken']
              }).then(response => {
                const data = response.data;
                console.log(data);
                if(data.data.items != null) {
                    var _pool = data.data.items;
                    console.log(_pool);
                    _pool = _pool.filter(p => p.enabled == true);

                    ServiceAuth.getrevcategory({
                      // "token": userCookies['cktoken']
                    }).then(response => {
                      const datacc = response.data;
                      console.log(datacc);
                      this.setState({
                        categories: datacc.data.items
                    })

                      ServiceAuth.getrevsubcategory({
                        // "token": userCookies['cktoken']
                      }).then(response => {
                        const datass = response.data;
                        console.log(datass);
                        this.setState({
                          subcategories: datass.data.items
                      })

                      ServiceAuth.getreviews({
                        // "token": userCookies['cktoken']
                      }).then(response => {
                        const dataz = response.data;
                        console.log(dataz);
                        this.setState({
                          items: _pool,
                          filteredList: _pool,
                          reviews: dataz.data.items
                      })
                      const userCookies = ServiceCookies.getUserCookies();
    
                      var _tmpMap = userCookies['cktoken'] == null ? {} : {
                        "token": userCookies['cktoken']
                      }
                      ServiceAuth.getgeneralsettings(_tmpMap).then(response => {
                        const dataB = response.data;
                        
                        console.log(dataB);
                        this.setState({
                          userfaucetbalance: dataB.data.userfaucetbalance,
                          
                        })
                      
                      })
                    })

                      
                      })
                    })

                  

                    
                }
              }).catch(e => {
                console.log(e);
                alert(e);
                return;
              })
        
    // };
  }

  groupByN = (n, data) => {
    let result = [];
    for (var i = 0; i < data.length; i += n) result.push(data.slice(i, i + n));
    return result;
  };

  render() {
    return (
      <BasePage
        currentLang={this.state.currentLang}
        translatorData={this.state.translatorData}
      >
        <div className='bp-middle'>
          <div className='bp-middle-over'>

          <div className="bp-reviewbox" style={{
            // marginBottom: '60px',
            border: '5px solid #1E1D32'
          }}>
             {
               this.state.items.filter(i => i.enabled && i.featured).map(rs => {
                 return <FeaturedReviews 
                 item={rs}
                 featured={true}
                 reviews={this.state.reviews}
                 currentLang={this.state.currentLang}
                 translatorData={this.state.translatorData}
                />
               })
             } <br/>
             
            <div className='clearfix'/>
            </div>
             </div>


             <div className='bp-middle-over'>


             <div className='bp-middle-left-sub bp-blueshadow' style={{
              width: '100%',
              marginBottom: '40px'
            }}>
              <img className='crypto-icon crownSvg' src='images/cryptodeep_asset_6.png' style={{
                marginTop: '0px'
              }} />
              <a style={{
                fontSize: '14px'
              }} href={this.state.userfaucetbalance.length == 0 ? '#' : '/faucetbalance'}>
              <p style={{marginTop:-2, textTransform: 'uppercase'}}>{Translator.getStringTranslated('global_faucetbalance', this.state.currentLang, this.state.translatorData)}</p>
              </a>
    <h1 style={{marginBottom:-10,marginTop:-8, color:'#FFBF00'}}>{this.state.userfaucetbalance} {Translator.getStringTranslated('global_faucetscount', this.state.currentLang, this.state.translatorData)}</h1>
            </div>

            <div className='clearfix'/>

            <div className='bp-middle-all bp-blueshadow'>
                <p className='loginTitle'>{Translator.getStringTranslated('rvws_reviews', this.state.currentLang, this.state.translatorData)} </p>
                <p className='loginTitle' style={{fontSize:'1em',marginTop:'-2em'}}>{Translator.getStringTranslated('rvws_selcat', this.state.currentLang, this.state.translatorData)} </p>
                
                  {this.groupByN(5, this.state.categories).map(c => 
                    <div className='imgsm_box'>
                    
                      {
                         c.map(cx => {
                          return <div style={{width: '100px'}} className={`imgbox ${this.state.selectedCategory == cx._id ? 'imgboxsel' : ''}`} onClick={() => {
                            if(cx._id == this.state.selectedCategory) {
                              this.setState({
                                selectedCategory: '',
                                filteredList: this.state.items
                              })
                              return;
                            }
                            var _subcategoriesAvailables = this.state.subcategories.filter(s => s.parentcategoryid == cx._id);
                            this.setState({
                              selectedCategory: cx._id,
                              filteredList: this.state.items.filter(i => (_subcategoriesAvailables.map(s => s._id).indexOf(i.subcategoryid) != -1) )
                            })
                          }}>
                            <img className='imgsm' src={cx.iconurlx}/>
                            <p>{cx.title.toUpperCase()}</p>
                          </div>
                        })
                      }
                    </div>
                  )}
                <div>
                    <p>
                      <input 
                          style={{
                            width: '60%'
                          }}
                          placeholder={Translator.getStringTranslated('global_search', this.state.currentLang, this.state.translatorData)}
                          name='search' 
                          type='text'
                           onChange={this.handleInputChange} 
                          value={this.state.formController.search}
                      />
                     </p>
                  </div>
            </div>

            {
              this.state.selectedCategory == '' ? null :
              <div style={{transition: 'all 1s ease-in'}} className='bp-middle-all bp-blueshadow'>
              <br/><br/>
                <p className='loginTitle' style={{fontSize:'1em',marginTop:'-2em'}}>{Translator.getStringTranslated('rvws_subcat', this.state.currentLang, this.state.translatorData)}</p>
                
                  {this.groupByN(5, this.state.subcategories.filter(s => s.parentcategoryid == this.state.selectedCategory)).map(c => 
                    <div className='imgsm_box'>
                     {
                       c.map(cx => {
                        return <div style={{width: '100px'}} className={`imgbox ${this.state.selectedSubcategory == cx._id ? 'imgboxsel' : ''}`} onClick={() => {
                        
                          var _subcategoriesAvailables = this.state.subcategories.filter(s => s.parentcategoryid == this.state.selectedCategory).filter(s => s.parentcategoryid == cx._id);
                          this.setState({
                            selectedSubcategory: cx._id,
                            filteredList: this.state.items.filter(i => i.subcategoryid == cx._id )
                          })
                        }}>
                          <img className='imgsm' src={cx.iconurlx}/>
                          <p>{cx.title.toUpperCase()}</p>
                        </div>
                       })
                     }


                    </div>
                    )}
            </div>
            }

          {/* <div className="bp-reviewbox" style={{
            marginBottom: '60px'
          }}>
             {
               this.state.filteredList.filter(r => r.title.toUpperCase().includes(this.state.formController.search.toUpperCase())).map(rs => {
                 return <FeaturedReviews 
                 item={rs}
                 reviews={this.state.reviews}
                />
               })
             } <br/>
             
            </div> */}
            
            
            <div className='clearfix'/>
            <PaginatedList
                list={this.groupByN(5, this.state.filteredList.filter(r => r.title.toUpperCase().includes(this.state.formController.search.toUpperCase())))}
                itemsPerPage={10}
                renderList={(list) => (
                  <>
                  {
                    list.map((item, id) => {
                      return (
                        <div className="bp-reviewbox" key={id} style={{
                          marginBottom: '60px'
                        }}>
                           {
                             item.map(rs => {
                               return <FeaturedReviews 
                               item={rs}
                               reviews={this.state.reviews}
                               currentLang={this.state.currentLang}
                               translatorData={this.state.translatorData}
                              />
                             })
                           } <br/>
                           
                          </div>
                      )
                    })
                  }
                  </>
                )}
              />

            <div className='clearfix'/>
          </div>
        </div><br/><br/><br/>
        {/* <p>Hola</p> */}
        <style jsx>{`
                    .qty_com{
                          font-size: 0.6em;
                    position: absolute;
                    font-family: 'Nunito';
                    padding: 1em;
                    background: #00000050;
                    border-radius: 2em;
                    margin-top: -4.7em;
                    margin-left: 8.6em; 
                    }
                  .stars-review{
                    width:8em;
                    height:3em;
                    position:absolute;
                    margin-top: 5.5em;
                    display:flex;
                    
                  }
                  .end-review{
                    height: 2em;
                    margin-top: 2.8em;
                    width: 10em;
                    position: absolute;
                    right: 8%;
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
                    width:5em;
                  }
                  .single-review{
                        width: 100%;

                    height: 6.5em;
                    background-color:#252540;
                    border-radius:3px;
                    margin:0.5em;
                    padding:0.5em;
                    display:flex;
                    font-family:"Nunito";
                    margin-left: 4%;
                  }
                  .bp-reviewbox{
                    display: flex;
                    width:95%;
                    height:10.5em;
                    border-top:none;
                    margin: 0 auto;
                  }
                    .imgbox{padding:1em}
                    .imgboxsel {
                      background-color: #DC8614;
                    }
                    .imgbox:hover {cursor:pointer;
                          background-color: #DC8614;
                          -webkit-transition: background-color 1000ms linear;
                          -ms-transition: background-color 1000ms linear;
                          transition: background-color 1000ms linear;
                      }
                    .imgsm_box{width: fit-content;
                        display: flex;
                        margin: auto;}
                    .imgsm_box div{margin-right:2em;margin-left:2em;font-family='Nunito'}
                    .captchaHolder{
                      margin:0 auto;
                          width: 100%;
                        margin-bottom: 2em;
                    }
                    .loginSignup {font-size:1em;margin-top:2em!important;font-weight:600;color:white;}
                    .loginSignup a{font-size:1em;margin-top:2em!important;font-weight:600;color:white;}
  
                    .bp-middle-over {
                      margin: 0% 10%;
                      width: 80%;
                    }
  
                    inputhold{
                      position:relative
                    }
                    .imgsm{
                          width: 4em;
                          height: 4em;
                    }
  
                   form{
                    width:100%;
                    margin:0 auto;
                   }
  
                   input{
                        width: 15.5em;
                    padding: 15px;
                    margin-bottom: 2em;
                      color:white;
                    border-radius:3px;
                    border-style:solid;
                    border: 1px solid white;
                    background-color:transparent}
  
                    input:focus{
                      color:white;
                      outline:none;
                    }
  
                    .loginSubmit{
                      margin:0 auto;
                      text-decoration: none;
                      text-transform: uppercase;
                      color: #DC8614;
                      font-weight: 700;
                      font-size: 14px;
                      background-color:#353535;
                      border:none;
                      box-sizing: border-box;
                      -moz-box-sizing: border-box;
                      -webkit-box-sizing: border-box;
    
                    }
  
                    .loginSubmit:hover{
                      border-left: 1px  solid #DC8614 !important;
                      border-right: 1px  solid #DC8614 !important;
                      cursor:pointer;
                    }
  
                    .loginTitle{
                      font-size:3em;
                      margin-bottom:1em !important;
                      opacity:0.85
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
                    width: 100%;
                    float: left;
                    padding: 10px 14px;
                    padding-bottom: 30px;
  
                    font-family: 'Nunito';
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
                    .end-review{height: 2em;
                      margin-top: 1.7em;
                      width: 10em;
                      display: flex;
                      margin: auto;
                      margin-top: 2.5em !important;}
                    .single-review{width: 95%;
                      height: 15em;
                      background-color: #252540;
                      border-radius: 3px;
                      margin: 0.5em;
                      padding: 0.5em;
                      display: -webkit-box;
                      display: -webkit-flex;
                      display: -ms-flexbox;
                      display: flow-root;
                      font-family: "Nunito";
                      margin-left: 2em;}
                    .imgsm_box{display: inherit !important;}
                    .bp-middle-left, .bp-middle-left-sub {
                      width: 90%;
                    }
                  }
  
                  .bp-blueshadow {
                    background: #252540;
                    box-shadow: 0px 0px 20px rgba(0,0,0,0.4);
                    border-radius: 4px;
                  }
  
                  .clearfix::after {
                    content: "";
    clear: both;
    display: table;
                  }
  
                  @media screen and (max-width: 800px){
                    
                    .bp-middle{
                      margin-top:5em
                    }
  
                    input{
                      width:87%
                    }
  
                    .inputhold img{
                      display:none
                    }
  
                    
                  }
              `}</style>
      </BasePage>
    );
  }
}
