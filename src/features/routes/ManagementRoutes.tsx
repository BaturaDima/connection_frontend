
import { Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import { Loading } from '../shared/loading';
import { AppRoutes } from './routes.enum';

const UsersPage = lazy(() => import('../users/UsersPage'));
const OrdersPage = lazy(() => import('../orders/PendingOrdersPage'));
const TransportApplicationsPage = lazy(
    () => import('../transport-applications/TransportApplicationsPage'),
);

export const ManagementRoutes = () => (
    <Routes>
        <Route
            path={`${AppRoutes.MANAGEMENT}/${AppRoutes.USERS}`}
            element={
                <Suspense fallback={<Loading />}>
                    <UsersPage />
                </Suspense>
            }
        />
        <Route
            path={`${AppRoutes.MANAGEMENT}/${AppRoutes.ORDERS}`}
            element={
                <Suspense fallback={<Loading />}>
                    <OrdersPage />
                </Suspense>
            }
        />
        <Route
            path={`${AppRoutes.MANAGEMENT}/${AppRoutes.TRANSPORT_APPLICATIONS}`}
            element={
                <Suspense fallback={<Loading />}>
                    <TransportApplicationsPage />
                </Suspense>
            }
        />
    </Routes>
);
