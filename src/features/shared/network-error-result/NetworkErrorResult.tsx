import React from 'react';
import { Result } from 'antd';

const NetworkErrorResult: React.FC = () => (
  <Result
    status="warning"
    title="There are some problems with your operation."
  />
);

export default NetworkErrorResult;