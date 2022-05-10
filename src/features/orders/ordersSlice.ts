import { apiSlice } from '../api/apiSlice';
import { Order } from './models/order.interface';

const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPendingOrders: builder.query<Order[], void>({
      query: () => '/order/pending',
      providesTags: (result = []) => [
        { type: 'Order' as const, id: 'LIST' },
        ...result.map(({ id }) => ({
          type: 'Order' as const,
          id,
        })),
      ],
    }),
    approveOrder: builder.mutation<Order, number>({
      query: (id) => ({
        url: `/order/${id}/approve`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Order' as const, id: arg }],
    }),
    declineOrder: builder.mutation<Order, number>({
      query: (id) => ({
        url: `/order/${id}/decline`,
        method: 'PUT',
      }),
      invalidatesTags: (result, error, arg) =>
        error ? [] : [{ type: 'Order' as const, id: arg }],
    }),
  }),
});

export const {
  useGetPendingOrdersQuery,
  useApproveOrderMutation,
  useDeclineOrderMutation,
} = extendedApiSlice;