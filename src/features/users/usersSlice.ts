import { apiSlice } from '../api/apiSlice';
import { User } from './models/user.interface';

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
            query: () => '/user',
            providesTags: (result = []) => [
                { type: 'User' as const, id: 'LIST' },
                ...result.map(({ id }) => ({
                    type: 'User' as const,
                    id,
                })),
            ],
        }),
        blockUser: builder.mutation<User, number>({
            query: (id) => ({
                url: `/user/${id}/block`,
                method: 'PUT',
            }),
            invalidatesTags: (result, error, arg) =>
                error ? [] : [{ type: 'User' as const, id: arg }],
        }),
        activateUser: builder.mutation<User, number>({
            query: (id) => ({
                url: `/user/${id}/activate`,
                method: 'PUT',
            }),
            invalidatesTags: (result, error, arg) =>
                error ? [] : [{ type: 'User' as const, id: arg }],
        }),
    }),
});

export const {
    useGetUsersQuery,
    useBlockUserMutation,
    useActivateUserMutation,
} = extendedApiSlice;
