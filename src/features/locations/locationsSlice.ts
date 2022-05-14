import { apiSlice } from '../api/apiSlice';
import { City } from '../orders/models/city.interface';
import { Street } from '../orders/models/street.interface';

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCities: builder.query<City[], void>({
      query: () => '/location/cities',
      providesTags: [{ type: 'City' as const, id: 'LIST' }],
    }),
    getStreets: builder.query<Street[], void>({
      query: () => '/location/streets',
      providesTags: [{ type: 'Street' as const, id: 'LIST' }],
    }),
  }),
});

export const { useGetCitiesQuery, useGetStreetsQuery } = extendedApiSlice;
