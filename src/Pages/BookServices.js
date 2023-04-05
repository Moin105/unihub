// page 17
// screen 4
import React from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'
import ReviewCard from '../Components/ReviewCard'
import ServiceTag from '../Components/ServiceTag'
import storage from  '../Images/storage.png'
import cleaner from  '../Images/cleaner.png'
import moveout from  '../Images/moveout.png'

import servicetag from  '../Images/servicetag.png'
import './details.css'
import './BookServices'
function BookServices() {
  return (
    <div className='details-page'>
      <Header/>
      {/* caorusel here  */}
      {/* services */}
      <div className='our-services'>
            <div className='wrapper'>
                  <h2>Book A Service</h2>   
                  <p classNmae='pixer'>Checkout our services provided by one expert <br></br> vendors and select the needed one.</p>
             <div className='servicebook-container'>
               <ServiceTag icon={storage} name="Book a Storage"/>
               <ServiceTag icon={cleaner} name="Cleaner"/>
               <ServiceTag icon={moveout} name="Moveout"/>
            </div>     
            </div>
      </div>
   {/* What we do */}
      <div className='whatwedo'>
         <div className='wrapper'>
             <h2>What we do!</h2>
             <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
             <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
         </div>
      </div>
      {/* Our Reviews */}
      <div className='our-reviews'>
         <div className='wrapper'>
             <h2>Our Reviews!</h2>
          <div className='reviewers-container'>
            <ReviewCard icon={servicetag}  name="Kevin Mark"/>
            <ReviewCard icon={servicetag} name="Preita k"/>
            <ReviewCard icon={servicetag} name="John Levi"/>
          </div>     
         </div>
      </div>
      {/* ends here*/}
      <Footer/>
    </div>
  )
}

export default BookServices