import React, { VFC } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { message, Table, Typography } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { GeoLocation } from './models/location.interface';
import { User } from '../users/models/user.interface';
import NetworkErrorResult from '../shared/network-error-result/NetworkErrorResult';
import {
  useApproveOrderMutation,
  useDeclineOrderMutation,
  useGetPendingOrdersQuery,
} from './ordersSlice';
import { formatDistanceToNow } from 'date-fns';
import { openNotification } from '../util/notification';
import ApproveAndDeclineActions from '../shared/approve-and-decline-actions/ApproveAndDeclineActions';
import UserLink from '../shared/user-link/UserLink';
import useSortedByTime from '../hooks/useSortedByTime';
import { Order } from './models/order.interface';

const PendingOrdersPage: VFC = () => {
  const { data: orders = [], isFetching, isError } = useGetPendingOrdersQuery();
  const [approveOrder, { isLoading: isApproving }] = useApproveOrderMutation();
  const [declineOrder, { isLoading: isDeclining }] = useDeclineOrderMutation();

  const renderUser = (user: User) => <UserLink user={user} />;

  const renderLocation = ({ city, street, home }: GeoLocation) => (
      <div>{`${city.name}, ${street.name}, ${home}`}</div>
  );

  const renderAction = (id: number) => (
      <ApproveAndDeclineActions
          id={id}
          onApprove={onApprove}
          onDecline={onDecline}
      />
  );

  const onDecline = async (id: number) => {
    try {
      await declineOrder(id).unwrap();
      openNotification(
          'Order Approval',
          'Declined successfully!',
          <CheckCircleOutlined />,
      );
    } catch (e) {
      message.error('Declining failed!');
    }
  };

  const onApprove = async (id: number) => {
    try {
      await approveOrder(id).unwrap();
      openNotification(
          'Order Approval',
          'Approved successfully!',
          <CheckCircleOutlined />,
      );
    } catch (e) {
      message.error('Approving failed!');
    }
  };

  const renderTime = (time: string) =>
      formatDistanceToNow(new Date(time), { addSuffix: true });

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
      render: renderTime,
    },
    {
      title: 'Updated',
      key: 'updated',
      dataIndex: 'updatedAt',
      render: renderTime,
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: 'id',
      render: renderAction,
    },
  ];

  const isTableLoading = isFetching || isApproving || isDeclining;

  const sortedOrders = useSortedByTime<Order>(
      orders,
      (order) => new Date(order.updatedAt),
  );

  return (
      <MainLayout>
        <Table
            title={() => (
                <Typography.Title level={2}>Pending Orders</Typography.Title>
            )}
            loading={isTableLoading || isError}
            columns={columns}
            dataSource={sortedOrders.map((order) => ({
              ...order,
              key: order.id,
            }))}
            pagination={{ pageSize: 8 }}
        />
        {isError && <NetworkErrorResult />}
      </MainLayout>
  );
};

export default PendingOrdersPage;
