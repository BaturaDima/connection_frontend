
import { Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import { Loading } from '../shared/loading';
import { AppRoutes } from './routes.enum';

const CreateOrderPage = lazy(() => import('../orders/CreateOrderPage'));

export const CustomerRoutes = () => (
    <Routes>
        <Route
            path={`${AppRoutes.CUSTOMER}/${AppRoutes.CREATE_ORDER}`}
            element={
                <Suspense fallback={<Loading />}>
                    <CreateOrderPage />
                </Suspense>
            }
        />
    </Routes>
);
