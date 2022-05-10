import React from 'react';
import { MainLayout } from '../../../layouts/MainLayout';
import { Button, notification, Space, Table } from 'antd';
import { User } from '../../users/managemnt/models/user.interface';
import { TransportApplication } from './models/transport-application.interface';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import useFetching from '../../../hooks/useFetch';
import NetworkErrorResult from '../../../components/network-error-result/NetworkErrorResult';

const TransportApplicationsPage: React.FC = () => {
  const { data, isLoading, hasError, setData, setLoading } = useFetching<
    TransportApplication[]
  >('/transport-application/pending', []);

  const onApprove = async (id: number) => {
    const response = await updateStatus(`/transport-application/${id}/approve`);
    if (!response.ok) return;

    removeApplication(id);
    openNotification('Approved!', <CheckCircleOutlined />);
  };

  const onReject = async (id: number) => {
    const response = await updateStatus(`/transport-application/${id}/reject`);
    if (!response.ok) return;

    removeApplication(id);
    openNotification('Rejected!', <CloseCircleOutlined />);
  };

  const updateStatus = async (url: string) => {
    setLoading(true);
    const response = await fetch(url, { method: 'PUT' });
    setLoading(false);
    return response;
  };

  const removeApplication = (id: number) => {
    const index = data.findIndex((app) => app.id === id);
    if (index === -1) return;

    setData([...data.slice(0, index), ...data.slice(index + 1)]);
  };



  const renderActions = (id: number) => (
    <Space size={'large'}>
      <a onClick={() => onApprove(id)}>Approve</a>
      <a onClick={() => onReject(id)}>Reject</a>
    </Space>
  );


  const openNotification = (text: string, icon: JSX.Element) =>
    notification.info({
      message: `Transport application approval`,
      description: text,
      placement: 'bottomRight',
      icon: icon,
    });

  const columns = [
    {
      title: 'Driver',
      key: 'driver',
      dataIndex: 'driver',
      render: ({ firstName, lastName }: User) => (
        <a>{`${firstName} ${lastName}`}</a>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: 'id',
      render: renderActions,
    },
  ];

  return (
    <MainLayout>
      {data && (
        <Table
          loading={isLoading || hasError}
          title={() => 'Transport Applications'}
          bordered
          columns={columns}
          dataSource={data.map((app) => ({
            ...app,
            key: app.id.toString(),
          }))}
        />
      )}
      {hasError && <NetworkErrorResult />}
    </MainLayout>
  );
};

export default TransportApplicationsPage;