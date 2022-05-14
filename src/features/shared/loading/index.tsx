import { Spin } from 'antd';
import React, { VFC } from 'react';
import { MainLayout } from '../../layouts/MainLayout';

export const Loading: VFC = () => (
  <MainLayout>
    <Spin />
  </MainLayout>
);
