import React from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import profile from '../Images/profile.png';

function SellerPage() {
  return (
    <div className='sellerpage'>
       <Header/>
         <div className='wrapper'>
         <div className='seller'>
                    <figure>
                        <img src={profile}/>
                    </figure>
                    <h3>Become a seller! </h3>
                    <div>What do you need to sell?</div>
              </div>
        <div className='tab-row'>
             <div className='tab-button'>
                 <figure>

                 </figure>
                 <p></p>
             </div>
             <div className='tab-button'>
                 <figure>

                 </figure>
                 <p></p>
             </div>
             <div className='tab-button'>
                 <figure>

                 </figure>
                 <p></p>
             </div>    
              <div className='tab-button'>
                 <figure>

                 </figure>
                 <p></p>
             </div>
        </div> 
        <React.Fragment>
        <div className='review-card'>
            <div className="circle">
            <figure>
                 <img src={icon}/>
            </figure>
            </div>
            <h5>kevin mark</h5>
            <figure>
            <img src={rating}/>
            </figure>
            <p>{comment}</p>
        </div>
    </React.Fragment>
        </div>
        <Footer/>
    </div>
  )
}

export default SellerPage