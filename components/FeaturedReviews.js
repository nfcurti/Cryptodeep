import React from 'react';
import ServiceCookies from '../services/cookies';
import ReactStars from "react-rating-stars-component";
import Translator from '../services/translator';

export default class FeaturedReviews extends React.Component {

    constructor() {
        super();
        this.state = {

        }
    }

    componentDidMount() {
        console.log('------')
        console.log(this.props.currentLang);
        console.log(this.props.translatorData);
    }

    render() {
        return this.props.item == null || this.props.reviews == null ? <p>Error</p> : (
            <div onClick={() => {
                window.location.replace(`/cryptodeep/single?id=${this.props.item._id}`);
               }} className={`ffreview`}>
                <div className={` ${this.props.featured ? 'featuredList' : ''}`} />
               <div className='ffrcont'
               >
                   <div className='ffrinfo'>
                       <div className='ffrlogo'>
                       <img src={`data:image/png;base64,${this.props.item.iconurl}`}/>
                       
                       </div>
                       <div className='ffrida'>
                       
                       <p className='ffreviewscoreset'>{this.props.item.score}<img style={{width:"1em",margin:"auto",marginLeft:"0.2em"}} className='crypto-icon' src={'https://upload.wikimedia.org/wikipedia/commons/a/a3/Orange_star.svg'} /></p><p className='ffrevtit'>{this.props.item.title}</p>
                       <p className='ffrevdesc'>{(this.props.item.shortdescription ?? "").length < 70 ? this.props.item.shortdescription : `${this.props.item.shortdescription.substring(0, 70)}...`}</p>
                       </div>
                   </div>
                   <div className='ffrrate'>
                   <span className='ffrratep'>{this.props.reviews.filter(r => r.reviewid == this.props.item.uniqueid).length} ({this.props.reviews.filter(r => r.reviewid == this.props.item.uniqueid).length == 0 ? '-' : this.props.reviews.filter(r => r.reviewid == this.props.item.uniqueid).reduce((acc, r) => acc+r.scoregiven, 0) / this.props.reviews.filter(r => r.reviewid == this.props.item.uniqueid).length})</span>
                    <ReactStars
                        count={5}
                        size={16}
                        value={this.props.reviews.filter(r => r.reviewid == this.props.item.uniqueid).reduce((acc, r) => acc+r.scoregiven, 0) / this.props.reviews.filter(r => r.reviewid == this.props.item.uniqueid).length}
                        edit={false}
                        isHalf={true}
                        activeColor="#ffd700"
                    />
                   </div>
               </div>

               {
            //        this.props.featured ?
            //         <>
            //         <div onClick={() => {
            //        window.location.replace(`/cryptodeep/single?id=${this.props.item._id}`);
            //    }} className='ffrc ffrcleft'
            //    style={{
            //        backgroundColor: this.props.reviews.filter(r => r.reviewid == this.props.item.uniqueid).length == 0 ? 'red' : 'orange'
            //    }}
            //    >
            //        <p className='ffrctext' style={{textTransform: 'uppercase'}}>{Translator.getStringTranslated('global_review', this.props.currentLang, this.props.translatorData)}</p>
            //    </div>
            //    <div onClick={() => {
            //        const tab = window.open(this.props.item.siteurl, '_blank');
            //    }} className='ffrc ffrcright'
            //    >
            //        <p className='ffrctext' style={{textTransform: 'uppercase'}}>{Translator.getStringTranslated('global_site', this.props.currentLang, this.props.translatorData)}</p>
            //    </div>
            //    </> : 
               

               <>
                    <div onClick={() => {
                   window.location.replace(`/cryptodeep/single?id=${this.props.item._id}`);
               }} className='ffrc ffrcleftx'
               style={{
                backgroundColor: this.props.reviews.filter(r => r.reviewid == this.props.item.uniqueid).length == 0 ? 'purple' : 'orange'
            }}
               >
                   <p className='ffrctext' style={{textTransform: 'uppercase'}}>{Translator.getStringTranslated('global_review', this.props.currentLang, this.props.translatorData)}</p>
               </div>
               <div onClick={() => {
                   const tab = window.open(this.props.item.siteurl, '_blank');
               }} className='ffrc ffrcrightx'
               >
                   <p className='ffrctext' style={{textTransform: 'uppercase'}}>{Translator.getStringTranslated('global_site', this.props.currentLang, this.props.translatorData)}</p>
               </div>
               </>
               }
               
               
             
            <style jsx>{`
                
            `}</style>
            </div>
        )
    }
}