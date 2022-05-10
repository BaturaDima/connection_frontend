import { apiSlice } from '../api/apiSlice';
import { City } from '../orders/models/city.interface';
import { Street } from '../orders/models/street.interface';

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCities: builder.query<City[], void>({
      query: () => '/location/cities',
      providesTags: [],
    }),
    getStreets: builder.query<Street[], void>({
      query: () => '/location/streets',
      providesTags: [],
    }),
  }),
});

export const { useGetCitiesQuery, useGetStreetsQuery } = extendedApiSlice;