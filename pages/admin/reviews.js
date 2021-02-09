import React, { useState, useEffect } from 'react';
import Marquee from 'react-double-marquee';

import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from 'next/router'
import BaseAdminPage from '../../components/BaseAdminPage';
import ServiceAuth from '../../services/ServiceAuth';
import ServiceCookies from '../../services/cookies';
import { PaginatedList } from 'react-paginated-list';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export default class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      items: [],
      formController: {
        search: ''
      }
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    const controller = this.state.formController;
    controller[name] = value;
    this.setState({
      formController: controller
    })
  }

  _addBulkData = data => {
    console.log('Bulk data')
    var _finalToSend = data.filter(d => d.uniqueid != '').map(e => {
      var _e = e;
      _e.enabled = e.enabled.toUpperCase() == 'TRUE' ? true : false;
      _e.featured = e.featured.toUpperCase() == 'TRUE' ? true : false;
      return _e;
    });

    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null || userCookies['cktoken'] == null) {
        window.location.replace(`/cryptodeep/login`)
    }else{
      if(userCookies['ckpl'] != '999') { return; }
      
      const _mTSZ = {
        'token': userCookies['cktoken'],
        'items': _finalToSend,
      }
      console.log(_mTSZ);
      ServiceAuth.addbulkreviews(_mTSZ).then(response => {
        const data = response.data;
        console.log(data);
        window.location.replace(`/cryptodeep/admin/reviews`);
      }).catch(e => {
        console.log(e);
        alert('There was an error with the request.');
        return;
      })
    }
  }

   

  _handleReaderLoaded = (readerEvt) => {
    var bstr = readerEvt.target.result
    const wb = XLSX.read(bstr, { type: "binary", raw: true });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1, strip: true, FS: '%%%' });
      /* Update state */
      console.log(data);
      var result = JSON.parse(this.convertToJson(data));
      console.log(result.length);
      if(result.length == 0) {
        alert('Invalid data');
        return;
      }
      if(!result[0].hasOwnProperty('uniqueid')) {
        alert('Invalid data');
        return;
      }
      var _mConf = confirm('The data is valid. Import?')
      if(_mConf) {
        this._addBulkData(result);
      }
  }

  convertToJson = csv => {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split('%%%');

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split('%%%');

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j]
      }

      result.push(obj);
    }

    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }

  exportPressed = () => {
    const csvData = this.state.items.map((e) => {
      return {
        'uniqueid': e.uniqueid ?? (e.siteurl ?? ''),
        'score': e.score ?? '',
        'importance': e.importance ?? '',
        'enabled': e.enabled ?? '',
        'featured': e.featured ?? '',
        'siteurl': e.siteurl ?? '',
        'iconurl': e.iconurl ?? '',
        'description': e.description ?? '',
        'title': e.title ?? '',
        'subcategoryid': e.subcategoryid ?? '',
        'shortdescription': e.shortdescription ?? '',
        'pros': e.pros ?? '',
        'cons': e.cons ?? '',
      }
    })
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, 'cryptodeep_reviews' + fileExtension);
  }

  componentDidMount() {
    const userCookies = ServiceCookies.getUserCookies();
        if(userCookies['ckuserid'] == null && userCookies['cktoken'] == null) {
            window.location.replace(`/cryptodeep/account`)
        }else{
            if(userCookies['ckpl'] != '999') {
            window.location.replace(`/cryptodeep/account`)
            }else{
                ServiceAuth.getreviewitems({
                    "token": userCookies['cktoken']
                  }).then(response => {
                    const data = response.data;
                    console.log(data);
                    if(data.data.items != null) {
                        this.setState({
                            items: data.data.items
                        })
                    }
                  }).catch(e => {
                    console.log(e);
                    alert(e);
                    return;
                  })
            }
        };

       
  }

  toggleEnablingReviewItem = (item, newval) => {
    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null || userCookies['cktoken'] == null) {
        window.location.replace(`/cryptodeep/login`)
    }else{
      if(userCookies['ckpl'] != '999') { return; }
      
      const _mTSZ = {
        'token': userCookies['cktoken'],
        'uniqueid': item.uniqueid ?? (item.siteurl ?? ""),
        'reviewid': item._id,
        'iconurl': item.iconurl,
        'title': item.title,
        'description': item.description,
        'siteurl': item.siteurl,
        'importance': item.importance,
        'subcategoryid': item.subcategoryid,
        'enabled': newval ? 'true' : 'false',
        'featured': item.featured == null ? 'false' : (item.featured ? 'true' : 'false'),
        'score': item.score,
        'pros': item.pros,
        'cons': item.cons,
        'shortdescription': item.shortdescription
      }
      console.log(_mTSZ);
      ServiceAuth.updatereviewitem(_mTSZ).then(response => {
        const data = response.data;
        console.log(data);
        window.location.replace('/cryptodeep/admin/reviews');
      }).catch(e => {
        console.log(e);
        alert('There was an error with the request. If you\'re filling Rich Text, please reduce your characters in order to avoid memory usage');
        return;
      })
    }
  }

  toggleFeaturingReviewItem = (item, newval) => {
    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null || userCookies['cktoken'] == null) {
        window.location.replace(`/cryptodeep/login`)
    }else{
      if(userCookies['ckpl'] != '999') { return; }
      
      const _mTSZ = {
        'token': userCookies['cktoken'],
        'uniqueid': item.uniqueid ?? (item.siteurl ?? ""),
        'reviewid': item._id,
        'iconurl': item.iconurl,
        'title': item.title,
        'description': item.description,
        'siteurl': item.siteurl,
        'importance': item.importance,
        'subcategoryid': item.subcategoryid,
        'enabled': item.enabled ? 'true' : 'false',
        'featured': newval ? 'true' : 'false',
        'score': item.score,
        'pros': item.pros,
        'cons': item.cons,
        'shortdescription': item.shortdescription
      }
      console.log(_mTSZ);
      ServiceAuth.updatereviewitem(_mTSZ).then(response => {
        const data = response.data;
        console.log(data);
        window.location.replace('/cryptodeep/admin/reviews');
      }).catch(e => {
        console.log(e);
        alert('There was an error with the request. If you\'re filling Rich Text, please reduce your characters in order to avoid memory usage');
        return;
      })
    }
  }

  removeReviewItem = (id) => {
    var _a = confirm('You sure you want to delete the item? ');
    if(!_a) { return; }

    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null || userCookies['cktoken'] == null) {
        window.location.replace(`/cryptodeep/login`)
    }else{
      if(userCookies['ckpl'] != '999') { return; }

      var _mTSZ = {
        'token': userCookies['cktoken'],
        'reviewid': id
      }
      console.log(_mTSZ);
      ServiceAuth.deletereviewitem(_mTSZ).then(response => {
        const data = response.data;
        console.log(data);
        window.location.replace('/cryptodeep/admin/reviews');
      }).catch(e => {
        console.log(e);
        alert('There was an error with the request. If you\'re filling Rich Text, please reduce your characters in order to avoid memory usage');
        return;
      })
    }
  }

  render() {

  return (
          <BaseAdminPage>
          <div className='bp-middle'>
            <br/>
        <div className='bp-middle-over'>
        <div className='bp-middle-all bp-blueshadow'>
                <p className='loginTitle'>Admin Reviews</p>
                <input
                  value="Export"
                  type='submit'
                  onClick={() => this.exportPressed()}
                  className='loginSubmit '
                  style={{
                    marginBottom: '10px'
                  }}
                /> 
                <hr style={{
                  marginBottom: '15px',
                  opacity: '0'
                }}/>
                 <input
                value="Import"
                type='submit'
                onClick={() => {}}
                className='loginSubmit '
                style={{
                  marginBottom: '10px'
                }}
              /><input 
            type='file'
            name='image'
            id='file'
            accept='.xls, .xlsx'
            onChange={(val) => {
              var file = val.target.files[0];

              if(file) {
                const reader = new FileReader();
                reader.onload = this._handleReaderLoaded.bind(this);
                reader.readAsBinaryString(file);
              }
            }}
          /><br/>
                  <br/>
                
                <div>
                    <p>
                      <input 
                          style={{
                            width: '90%'
                          }}
                          placeholder="Search..."
                          name='search' 
                          type='text'
                           onChange={this.handleInputChange} 
                          value={this.state.formController.search}
                      />
                     </p>
                  </div>
                <PaginatedList
                    list={this.state.items.filter(r => r.title.toUpperCase().includes(this.state.formController.search.toUpperCase()))}
                    itemsPerPage={25}
                    renderList={(list) => (
                        <>
                        <table className='admin-table'>
                            <thead>
                                <tr>
                                    <td><p>#</p></td>
                                    <td><p>Unique ID</p></td>
                                    <td><p>Title</p></td>
                                    <td><p>Importance</p></td>
                                    <td><p>Site Url</p></td>
                                    <td><p>Short<br/>Description</p></td>
                                    <td><p>Icon Url </p></td>
                                    <td><p>Featured</p></td>
                                    <td><p>Enabled </p></td>
                                    <td><p>Actions</p></td>
                                </tr>
                            </thead>
                            <tbody >
                            {list.map((item, id) => {
                                return (
                                        <tr className='admin-bodytr' key={id}>
                <td style={{width: '5em'}}><p className="numbering">{this.state.items.indexOf(item) + 1}</p></td>
                
                <td style={{width: '15em', textAlign:'left',letterSpacing:'2px'}}><p>{item.uniqueid}</p></td>
                <td style={{width: '15em', textAlign:'left',letterSpacing:'2px'}}><p>{item.title}</p></td>
                <td style={{width: '20em', textAlign:'left',letterSpacing:'2px'}}><p>{item.importance}</p></td>
                <td style={{width: '20em', textAlign:'left',letterSpacing:'2px'}}><p>{item.siteurl}</p></td>
                                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}><p>{(item.shortdescription ?? "").length < 10 ? item.shortdescription : `${item.shortdescription.substring(0, 10)}...`}</p></td>
                                <td style={{width: '100px'}}><div>
                                <img style={{
                                  margin: '-35px -35px',
                                  width: '40px',
                                  height: '40px',
                                  opacity: '1',
                                }} src={`data:image/png;base64,${item.iconurl}`}/></div></td>
                                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}>
                                {
                                    item.featured ? <button className='crypto-status-btn csb-success' onClick={() => {
                                      this.toggleFeaturingReviewItem(item, false);
                                    }}>Featured</button> 
                                    : <button className='crypto-status-btn csb-in-process' onClick={() => {
                                      this.toggleFeaturingReviewItem(item, true);
                                    }}>Normal</button>  
                                }
                                </td>
                                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}>
                                {
                                    item.enabled ? <button className='crypto-status-btn csb-success' onClick={() => {
                                      this.toggleEnablingReviewItem(item, false);
                                    }}>Enabled</button> 
                                    : <button className='crypto-status-btn csb-in-process' onClick={() => {
                                      this.toggleEnablingReviewItem(item, true);
                                    }}>Disabled</button>  
                                }
                                </td>
                                
                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}><button onClick={() => {
                    window.location.replace(`/cryptodeep/admin/editreview?id=${item._id}`)
                }} className='admin-actiob admin-actiob-validate'><p>Edit</p></button><br/><button onClick={() => {
                    this.removeReviewItem(item._id);
                }} className='admin-actiob admin-actiob-reject'><p>Remove</p></button></td>


              </tr>
                                )
                            })}
                            </tbody>
                            </table>
                        </>
                    )}
                />
                <br/>
                <br/>
                <input
                  value="Create"
                  type='submit'
                  onClick={() => {
                    window.location.replace('/cryptodeep/admin/newreview');
                  }}
                  className='loginSubmit '
                />
            </div>
          <div className='clearfix'/>
        </div>


      <style jsx>{`
                  .captchaHolder{
                              margin:0 auto;
                                  width: 40%;
                                margin-bottom: 2em;
                            }
                  input[type="checkbox"]{
                    width:1em;margin-top:1%
                  }
                  .loginTerms label{
                    display:inline; float:left
                  }
                  .terms{
                        margin-bottom: 2em
                  }

                  a{
                    text-decoration:none
                  }
                  .loginSignup {font-size:1em;margin-top:2em!important;font-weight:600;color:white;}
                  .loginSignup a{font-size:1em;margin-top:2em!important;font-weight:600;color:white;}

                  .bp-middle-over{
                    width:100% !important;
                    margin:0 auto !important;
                  }

                  inputhold{
                    position:relative
                  }

                  img{
                    width:2em;
                    position: absolute;
                    margin-left: -4em;
                    padding: 12px 12px;
                    pointer-events: none;
                  opacity:0.3;
                  }

                 form{
                  width:87%;
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

                  background-image: url("/cryptodeep/images/texture_a.png");
                  background-size: contain;
                  background-repeat: no-repeat;
                }
                .bp-middle {
                    margin: 0px;
                    width: 100%;
                    height: 400px;
                }

                .bp-middle-over {
                  width: 100%;
                }
                .bp-middle-left p, .bp-middle-all p {
                  margin: 0px;
                }
                .bp-middle-left {
                  text-align: center;
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
                  width: 100%;
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
                  margin-left: 5%;
                  margin-right: 5%;
                  margin-top: 10px;
                  width: 90%;
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

                  .bp-middle-over{
                    width:85% !important
                  }

                }

                .crypto-status-btn:hover {
                  cursor: pointer;
                }
            `}</style>
      </div></BaseAdminPage>
  );
  }
}
