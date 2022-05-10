import React from 'react';
import { MainLayout } from '../../../layouts/MainLayout';
import { Button, notification, Result, Space, Table } from 'antd';
import { User } from '../../users/managemnt/models/user.interface';
import { TransportApplication } from './models/transport-application.interface';
import { CheckCircleOutlined, CloseCircleOutlined, DownloadOutlined } from '@ant-design/icons';
import useFetching from '../../../hooks/useFetch';

const TransportApplicationsPage: React.FC = () => {
  const {
    data,
    isLoading,
    hasError,
    setData,
    setLoading,
  } = useFetching<TransportApplication[]>('/transport-application/pending', []);

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

  const onOpenDocument = async (documentPublicId: string) => {
    const response = await fetch(`/transport-application/document?documentPublicId=${documentPublicId}`);
    const blob = await response.blob();
    const objectURL = URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = objectURL;
    link.setAttribute('download', `document.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderActions = (id: number) => (
    <Space size={'large'}>
      <a onClick={() => onApprove(id)}>Approve</a>
      <a onClick={() => onReject(id)}>Reject</a>
    </Space>
  );

  const renderDocuments = (documentUid: string) => (
    <Button onClick={() => onOpenDocument(documentUid)} type='primary' shape='round' icon={<DownloadOutlined />}>
      Download
    </Button>
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
      title: 'Document',
      key: 'document',
      dataIndex: 'documentPublicId',
      render: renderDocuments,
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
      {hasError && <Result
        status='warning'
        title='There are some problems with your operation.'
      />}
    </MainLayout>
  );
};

export default TransportApplicationsPage;
