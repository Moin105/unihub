import React from 'react'

function ServiceTag({name,icon}) {
  return (
    <React.Fragment>
         <div className='servicetag-box'>
                    <figure>
                       <img src={icon}/>
                    </figure>
                    <p>{name}</p>
                </div>
    </React.Fragment>
  )
}

export default ServiceTag