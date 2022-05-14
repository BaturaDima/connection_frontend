import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TransportApplication } from '../transport-applications/models/transport-application.interface';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: [
    'TransportApplication',
    'Order',
    'Street',
    'City',
    'User',
    'DriverApplication',
  ],
  endpoints: () => ({}),
});
