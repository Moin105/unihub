import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setData } from '../slices/apiSlice';

const BASE_URL = 'http://34.233.35.208/api';
//  seller 
export const fetchEndpointOne = createAsyncThunk(
    'api/product_category',
    async () => {
      const response = await axios.get(`${BASE_URL}/product_category`);
      return response.data;
    }
  );

  export const fetchEndpointTwo = createAsyncThunk(
    'api/products',
    async () => {
      const response = await axios.get(`${BASE_URL}/products`);
      return response.data;
    }
  );

  export const fetchEndpointThree = createAsyncThunk(
    'api/products/:id',
    async () => {
      const response = await axios.get(`${BASE_URL}/products/:id`);
      return response.data;
    }
  );

  export const fetchEndpointFour = createAsyncThunk(
    'api/product_active_deactive/:id',
    async () => {
      const response = await axios.get(`${BASE_URL}/product_active_deactive/:id`);
      return response.data;
    }
  );
  export const fetchEndpointFive = createAsyncThunk(
    'api/service_category',
    async () => {
      const response = await axios.get(`${BASE_URL}/service_category`);
      return response.data;
    }
  );

    export const fetchEndpointSix = createAsyncThunk(
      'api/cleaning_services',
      async () => {
        const response = await axios.get(`${BASE_URL}/cleaning_services`);
        return response.data;
      }
    );

  export const fetchEndpointEight = createAsyncThunk(
    'api/time_slots',
    async () => {
      const response = await axios.get(`${BASE_URL}/time_slots`);
      return response.data;
    }
  );
  export const fetchEndpointNine = createAsyncThunk(
    'api/service_category',
    async () => {
      const response = await axios.get(`${BASE_URL}/service_category`);
      return response.data;
    }
  );

  
  export const fetchEndpointTen = createAsyncThunk(
    'api/universities',
    async () => {
      const response = await axios.get(`${BASE_URL}/universities`);
      return response.data;
    }
    );
    export const fetchEndpointEleven = createAsyncThunk(
      'api/cleaning_services',
      async () => {
        const response = await axios.get(`${BASE_URL}/cleaning_services`);
        return response.data;
      }
    );

  export const fetchEndpointTweleve = createAsyncThunk(
    'api/time_slots',
    async () => {
      const response = await axios.get(`${BASE_URL}/time_slots`);
      return response.data;
    }
  );


  
  export const fetchEndpointThirteen = createAsyncThunk(
    'api/cleaning_service_active_deactive/:id',
    async () => {
      const response = await axios.get(`${BASE_URL}/cleaning_service_active_deactive/:id`);
      return response.data;
    }
    );
    export const fetchEndpointFourteen = createAsyncThunk(
      'api/cleaning_services/:id',
      async () => {
        const response = await axios.get(`${BASE_URL}/cleaning_services/:id`);
        return response.data;
      }
    );

  export const fetchEndpointFifteen = createAsyncThunk(
    'api/events',
    async () => {
      const response = await axios.get(`${BASE_URL}/events`);
      return response.data;
    }
  );
  export const fetchEndpointSixteen = createAsyncThunk(
    'api/events/:id',
    async () => {
      const response = await axios.get(`${BASE_URL}/events/:id`);
      return response.data;
    }
  );

  export const fetchEndpointSeventeen = createAsyncThunk(
    'api/event_active_deactive/:id',
    async () => {
      const response = await axios.get(`${BASE_URL}/event_active_deactive/:id`);
      return response.data;
    }
  );

export const fetchEndpointEighthteen = createAsyncThunk(
  'api/my_ratings',
  async () => {
    const response = await axios.get(`${BASE_URL}/my_ratings`);
    return response.data;
  }
);
export const fetchEndpointNineteen = createAsyncThunk(
  'api/retrive-account',
  async () => {
    const response = await axios.get(`${BASE_URL}/retrive-account`);
    return response.data;
  }
);
// export const fetchEndpointTwenty = createAsyncThunk('api/')