import React from 'react';
import ServiceCookies from '../services/cookies';
import ReactStars from "react-rating-stars-component";
export default class FeaturedReviews extends React.Component {
    


    render() {
        return this.props.item == null || this.props.reviews == null ? <p>Error</p> : (
            <div onClick={() => {
                window.location.replace(`/single?id=${this.props.item._id}`);
               }} className="ffreview">

               <div className='ffrcont'
               >
                   <div className='ffrinfo'>
                       <div className='ffrlogo'>
                       <img src={this.props.item.iconurl}/>
                       <p className='ffreviewscoreset'>{this.props.item.score}<img style={{width:"1em",margin:"auto",marginLeft:"0.2em"}} className='crypto-icon' src={'https://upload.wikimedia.org/wikipedia/commons/a/a3/Orange_star.svg'} /></p>
                       
                       </div>
                       <div className='ffrida'>
                       <p className='ffrevtit'>{this.props.item.title}</p>
                       <p className='ffrevdesc'>{(this.props.item.shortdescription ?? "").length < 70 ? this.props.item.shortdescription : `${this.props.item.shortdescription.substring(0, 70)}...`}</p>
                       </div>
                   </div>
                   <div className='ffrrate'>
                   <span className='ffrratep'>{this.props.reviews.filter(r => r.reviewid == this.props.item._id).length} ({this.props.reviews.filter(r => r.reviewid == this.props.item._id).length == 0 ? '-' : this.props.reviews.filter(r => r.reviewid == this.props.item._id).reduce((acc, r) => acc+r.scoregiven, 0) / this.props.reviews.filter(r => r.reviewid == this.props.item._id).length})</span>
                    <ReactStars
                        count={5}
                        size={16}
                        value={this.props.reviews.filter(r => r.reviewid == this.props.item._id).reduce((acc, r) => acc+r.scoregiven, 0) / this.props.reviews.filter(r => r.reviewid == this.props.item._id).length}
                        edit={false}
                        isHalf={true}
                        activeColor="#ffd700"
                    />
                   </div>
               </div>

               {
                   this.props.featured ?
                    <>
                    <div onClick={() => {
                   window.location.replace(`/single?id=${this.props.item._id}`);
               }} className='ffrc ffrcleft'
               >
                   <p className='ffrctext'>REVIEW</p>
               </div>
               <div onClick={() => {
                   const tab = window.open(this.props.item.siteurl, '_blank');
               }} className='ffrc ffrcright'
               >
                   <p className='ffrctext'>SITE</p>
               </div>
               </> : 
               

               <>
                    <div onClick={() => {
                   window.location.replace(`/single?id=${this.props.item._id}`);
               }} className='ffrc ffrcleftx'
               >
                   <p className='ffrctext'>REVIEW</p>
               </div>
               <div onClick={() => {
                   const tab = window.open(this.props.item.siteurl, '_blank');
               }} className='ffrc ffrcrightx'
               >
                   <p className='ffrctext'>SITE</p>
               </div>
               </>
               }
               
               
             
            <style jsx>{`
                
            `}</style>
            </div>
        )
    }
}