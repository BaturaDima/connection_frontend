import { Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import { Loading } from '../components/loading';
import { AppRoutes } from './routes.enum';

const UsersPage = lazy(() => import('../pages/users/managemnt/UsersPage'));
const OrdersPage = lazy(() => import('../pages/orders/management/OrdersPage'));
const TransportApplicationsPage = lazy(
  () =>
    import(
      '../pages/transport-applications/management/TransportApplicationsPage'
    ),
);

export const ManagementRoutes: React.FC = () => (
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
