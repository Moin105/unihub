import axios from 'axios';
import { setName } from '../features/UserSlice';
import { useDispatch } from 'react-redux';
const BaseUrl = 'http://34.233.35.208/api';
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
export const SignUps = async ({ name, email, password, confirmPassword }) => {
  const response = await fetch(`${BaseUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email, password, confirmPassword, name
    })
  });
  console.log("moin",response)
  const data = await response.json();
  return data;
};