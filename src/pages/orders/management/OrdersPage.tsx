import React from 'react';
import { MainLayout } from '../../../layouts/MainLayout';
import { notification, Result, Table } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { Order } from './models/order.interface';
import { GeoLocation } from './models/location.interface';
import useFetching from '../../../hooks/useFetch';
import { User } from '../../users/managemnt/models/user.interface';

const OrdersPage: React.FC = () => {
  const { data, isLoading, hasError, setData, setLoading } = useFetching<
    Order[]
  >('/order/not-approved', []);

  const renderUser = ({ firstName, lastName }: User) => (
    <a>{`${firstName} ${lastName}`}</a>
  );

  const renderLocation = ({ city, street, home }: GeoLocation) => (
    <div>{`${city.name}, ${street.name}, ${home}`}</div>
  );

  const renderAction = (id: number) => (
    <a onClick={() => onApprove(id)}>Approve</a>
  );

  const onApprove = async (id: number) => {
    const response = await approveOrder(id);
    if (!response.ok) return;

    removeOrder(id);
    openNotification();
  };

  const approveOrder = async (id: number) => {
    setLoading(true);
    const response = await fetch(`order/${id}/approve`, {
      method: 'PUT',
    });
    setLoading(false);
    return response;
  };

  const removeOrder = (id: number) => {
    const index = data.findIndex((order) => order.id === id);
    if (index === -1) return;

    setData([...data.slice(0, index), ...data.slice(index + 1)]);
  };

  const openNotification = () => {
    notification.info({
      message: `Order Approval`,
      description: `Approved successfully.`,
      placement: 'bottomRight',
      icon: <CheckCircleOutlined />,
    });
  };

  const columns = [
    {
      title: 'Owner',
      key: 'owner',
      dataIndex: 'user',
      render: renderUser,
    },
    {
      title: 'From',
      key: 'from',
      dataIndex: 'fromLocation',
      render: renderLocation,
    },
    {
      title: 'To',
      key: 'to',
      dataIndex: 'toLocation',
      render: renderLocation,
    },
    {
      title: 'Created',
      key: 'created',
      dataIndex: 'createdAt',
    },
    {
      title: 'Updated',
      key: 'updated',
      dataIndex: 'updatedAt',
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: 'id',
      render: renderAction,
    },
  ];

  return (
    <MainLayout>
      {data && (
        <Table
          title={() => 'Orders'}
          bordered
          loading={isLoading || hasError}
          columns={columns}
          dataSource={data.map((order) => ({
            ...order,
            key: order.id.toString(),
          }))}
        />
      )}
      {hasError &&  <Result
        status="warning"
        title="There are some problems with your operation."
      />}
    </MainLayout>
  );
};

export default OrdersPage;
