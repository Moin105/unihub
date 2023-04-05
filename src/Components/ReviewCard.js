import React from 'react'
import rating from '../Images/rating.png'
function ReviewCard({icon,name,comment}) {
  return (
    <React.Fragment>
        <div className='review-card'>
            <div className="circle">
            <figure>
                 <img src={icon}/>
            </figure>
            </div>
            <h5>{name}</h5>
            <figure>
            <img src={rating}/>
            </figure>
            <p>{comment}</p>
        </div>
    </React.Fragment>

  )
}

export default ReviewCard