import { Route, Routes } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';
import { Loading } from '../features/shared/loading';
import { AppRoutes } from './routes.enum';

const CreateOrderPage = lazy(
  () => import('../pages/customer/create-order/CreateOrderPage'),
);

export const CustomerRoutes: React.FC = () => (
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
