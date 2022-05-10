import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes.enum';
import { Loading } from '../components/loading';

const CreateTransportApplicationPage = lazy(
  () =>
    import(
      '../pages/driver/create-driver-application/CreateTransportApplicationPage'
    ),
);

export const DriverRoutes: React.FC = () => (
  <Routes>
    <Route
      path={`${AppRoutes.DRIVER}/${AppRoutes.CREATE_TRANSPORT_APPLICATION}`}
      element={
        <Suspense fallback={<Loading />}>
          <CreateTransportApplicationPage />
        </Suspense>
      }
    />
  </Routes>
);
