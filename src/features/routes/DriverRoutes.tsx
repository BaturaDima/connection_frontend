import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRoutes } from './routes.enum';
import { Loading } from '../shared/loading';

const CreateTransportApplicationPage = lazy(
    () => import('../transport-applications/CreateTransportApplicationPage'),
);

export const DriverRoutes = () => (
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
