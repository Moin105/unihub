import React from 'react'
import {FaCheckCircle} from 'react-icons/fa'
import { Checkbox } from '@chakra-ui/react'
function BookCleaner() {
  return (
    <div className='bookcleaner'>
           <div className='wrapper'>
              <h2>

              </h2>
              <figure>
                  {/* <img/>  */}
              </figure>
                  <div className='card-cleaner'>
                       <h4>Express</h4>
                        <ul>
                            <li>- Hoovering and Sweeping </li>
                            <li>- Dust, Wipe & Disinfect All Surfaces</li>
                        </ul>
                        <h4>Select Package</h4>
                        <Checkbox icon={<FaCheckCircle />} defaultIsChecked>
                        Checkbox with Icon
                        </Checkbox>
                  </div>
           </div>
    </div>
  )
}

export default BookCleaner