import axios from 'axios';
const BaseUrl = 'http://34.233.35.208/api';
export const signUp = async ({ name, email, password, confirmPassword }) => {
  const response = await fetch(`${BaseUrl}/social_login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,password
    })
  })
  .then((response) =>{return response.json()})
.then((data) => {return data})
  //  JSON.stringify({
  //   // name,
  //   email,
  //   password,
  //   // confirmPassword
  // }), {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // });
  return response.data;
};