import React from 'react'
import Footer from '../Components/Footer'
import Header from '../Components/Header'

function BecomeSeller() {
  return (
    <div className='becomeseller'>
        <Header/>
        <div className='wrapper '>
        <div className='seller'>
                    <figure>
                    </figure>
                    <h3></h3>
                    <p></p>
        </div>
        <div className='your-products'>
            <h4></h4>
            <p></p>
            <div className='tabs-row'>
                <div>Product List</div>
                <div>Add New Product</div>
            </div>
    <div>
        <table>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
            <tbody>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            </tbody>
        </table>

    </div>
    <div className='sell-products'>
              <h5>

              </h5>
              <span>

              </span>
              
    </div>
        </div> 
        </div>
        <Footer/>
    </div>
  )
}

export default BecomeSeller