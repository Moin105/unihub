import axios from 'axios';
import { setName } from '../features/UserSlice';
import { useDispatch } from 'react-redux';
const BaseUrl = 'https://admin.myuni-hub.com/api';
// export const SignUps = async ({ name, email, password, confirmPassword }) => {
//   // const dispatch = useDispatch();
//   const response = await fetch(`${BaseUrl}/register`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       email,password,confirmPassword,name
//     })
//   })
//   .then((response) =>{return response.json()})
// .then((data) => {console.log("moeeen");  return data;})
//   return response.data;
// };
export const SignUps = async ({ name, email, password, confirmPassword ,university}) => {
  const response = await fetch(`https://admin.myuni-hub.com/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, password, confirmPassword, name,university
    })
  });
  console.log("moin",response)
  const data = await response.json();
  return data;
};


export const SellerSignUp = async ({ name, email, password, confirm_password }) => {
  try {
    const response = await axios.post('https://admin.myuni-hub.com/api/seller_register', {
      email,
      password,
      confirm_password,
      name
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    console.log("seller gee", response);
  
    const data = response.data;
    return data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};
