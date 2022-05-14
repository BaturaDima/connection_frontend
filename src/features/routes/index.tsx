import React from 'react';
import { ManagementRoutes } from './ManagementRoutes';
import { CustomerRoutes } from './CustomerRoutes';
import { DriverRoutes } from './DriverRoutes';

export const IndexRoutes: React.FC = () => (
  <>
    <ManagementRoutes />
    <CustomerRoutes />
    <DriverRoutes />
  </>
);
