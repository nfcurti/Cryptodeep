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

import Translator from '../../services/translator';

export default class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      items: [],
      translatorData: [],
      currentLang: 'en',
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
    var _finalToSend = data.filter(d => d.codemsg != '');

    const userCookies = ServiceCookies.getUserCookies();
    if(userCookies['ckuserid'] == null || userCookies['cktoken'] == null) {
        window.location.replace(`/login`)
    }else{
      if(userCookies['ckpl'] != '999') { return; }
      
      const _mTSZ = {
        'token': userCookies['cktoken'],
        'items': _finalToSend,
      }
      console.log(_mTSZ);
      ServiceAuth.addbulklanguagedataset(_mTSZ).then(response => {
        const data = response.data;
        console.log(data);
        window.location.replace(`/admin/languages`);
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
      if(!result[0].hasOwnProperty('codemsg')) {
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

  componentDidMount() {
    const userCookies = ServiceCookies.getUserCookies();
        if(userCookies['ckuserid'] == null && userCookies['cktoken'] == null) {
            window.location.replace(`/account`)
        }else{
            if(userCookies['ckpl'] != '999') {
            window.location.replace(`/account`)
            }else{
                ServiceAuth.getlanguagedataset({
                    "token": userCookies['cktoken']
                  }).then(response => {
                    const data = response.data;
                    console.log(data);
                    if(data.data.items != null) {
                        this.setState({
                            items: data.data.items
                        })
                    }

                    this._loadLang();
                  }).catch(e => {
                    console.log(e);
                    alert(e);
                    return;
                  })
            }
        };

       
  }

  exportPressed = () => {
    const csvData = this.state.items.map((e) => {
      return {
        'codemsg': e.codemsg,
        'descriptionhelper': e.descriptionhelper,
        'en': e.en ?? '',
        'es': e.es ?? '',
        'it': e.it ?? '',
        'ru': e.ru ?? '',
        'hi': e.hi ?? ''
      }
    })
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, 'cryptodeep_language' + fileExtension);
  }

  importPressed = () => {
    
  }

  render() {

  return (
          <BaseAdminPage>
          <div className='bp-middle'>
            <br/>
        <div className='bp-middle-over'>
        <div className='bp-middle-all bp-blueshadow'>
                <p className='loginTitle'>Admin Languages</p>
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
                    list={this.state.items.filter(r => r.codemsg.toUpperCase().includes(this.state.formController.search.toUpperCase())
                        || r.en.toUpperCase().includes(this.state.formController.search.toUpperCase())
                        || r.es.toUpperCase().includes(this.state.formController.search.toUpperCase())
                        || r.it.toUpperCase().includes(this.state.formController.search.toUpperCase())
                        || r.ru.toUpperCase().includes(this.state.formController.search.toUpperCase())
                        || r.hi.toUpperCase().includes(this.state.formController.search.toUpperCase())
                        )}
                    itemsPerPage={25}
                    renderList={(list) => (
                        <>
                        <table className='admin-table'>
                            <thead>
                                <tr>
                                    <td><p>#</p></td>
                                    <td><p>Code</p></td>
                                    <td><p>Help<br/>Description</p></td>
                                    <td><p>en</p></td>
                                    <td><p>es</p></td>
                                    <td><p>it</p></td>
                                    <td><p>ru </p></td>
                                    <td><p>hi </p></td>
                                    <td><p>Actions</p></td>
                                </tr>
                            </thead>
                            <tbody >
                            {list.map((item, id) => {
                                return (
                                        <tr className='admin-bodytr' key={id}>
                <td style={{width: '5em'}}><p className="numbering">{this.state.items.indexOf(item) + 1}</p></td>
                <td style={{width: '15em', textAlign:'left',letterSpacing:'2px'}}><p>{item.codemsg}</p></td>
                <td style={{width: '20em', textAlign:'left',letterSpacing:'2px'}}><p>{item.descriptionhelper}</p></td>
                                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}><p>{(item.en ?? "").length < 100 ? item.en : `${item.en.substring(0, 100)}...`}</p></td>
                                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}><p>{(item.es ?? "").length < 100 ? item.es : `${item.es.substring(0, 100)}...`}</p></td>
                                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}><p>{(item.it ?? "").length < 100 ? item.it : `${item.it.substring(0, 100)}...`}</p></td>
                                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}><p>{(item.ru ?? "").length < 100 ? item.ru : `${item.ru.substring(0, 100)}...`}</p></td>
                                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}><p>{(item.hi ?? "").length < 100 ? item.hi : `${item.hi.substring(0, 100)}...`}</p></td>
                                
                                
                <td style={{width: '10em', textAlign:'left',letterSpacing:'2px'}}><button onClick={() => {
                    window.location.replace(`/admin/editlanguage?id=${item._id}`)
                }} className='admin-actiob admin-actiob-validate'><p>Edit</p></button></td>


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
