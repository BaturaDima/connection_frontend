import { MainLayout } from '../layouts/MainLayout';

import React, { VFC } from 'react';
import { message, Table, Tag, Typography } from 'antd';
import { User } from './models/user.interface';
import NetworkErrorResult from '../shared/network-error-result/NetworkErrorResult';
import {
  useActivateUserMutation,
  useBlockUserMutation,
  useGetUsersQuery,
} from './usersSlice';
import { DriverApplication } from './models/driver-application.interface';
import {
  useApproveDriverApplicationMutation,
  useDeclineDriverApplicationMutation,
  useGetPendingDriverApplicationsQuery,
} from '../driver-applications/driverApplicationsSlice';
import ApproveAndDeclineActions from '../shared/approve-and-decline-actions/ApproveAndDeclineActions';
import UserLink from '../shared/user-link/UserLink';
import useSortedByTime from '../hooks/useSortedByTime';
import { formatDistanceToNow } from 'date-fns';

const UsersPage: VFC = () => {
  const {
    data: users = [],
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetUsersQuery();
  const [activateUser, { isLoading: isActivating }] = useActivateUserMutation();
  const [blockUser, { isLoading: isBlocking }] = useBlockUserMutation();
  const {
    data: applications = [],
    isLoading: isApplicationsLoading,
    isError: isApplicationsError,
  } = useGetPendingDriverApplicationsQuery();
  const [approveDriverApplication, { isLoading: isApproving }] =
    useApproveDriverApplicationMutation();
  const [declineDriverApplication, { isLoading: isDeclining }] =
    useDeclineDriverApplicationMutation();

  const renderUserTags = (user: User) => {
    const color = user.isActive ? 'green' : 'red';
    const text = user.isActive ? 'Active' : 'Blocked';
    return (
      <Tag color={color} key={text}>
        {text}
      </Tag>
    );
  };

  const renderDriverApplicationsTags = () => (
    <Tag color="orange" key="Approve">
      Not Approved
    </Tag>
  );

  const onBlock = async (id: number) => {
    try {
      await blockUser(id).unwrap();
    } catch (e) {
      message.error('Blocking failed!');
    }
  };

  const onActivate = async (id: number) => {
    try {
      await activateUser(id).unwrap();
    } catch (e) {
      message.error('Activation failed!');
    }
  };

  const onApprove = async (id: number) => {
    try {
      await approveDriverApplication(id).unwrap();
    } catch (e) {
      message.error('Approving failed!');
    }
  };

  const onDecline = async (id: number) => {
    try {
      await declineDriverApplication(id).unwrap();
    } catch (e) {
      message.error('Declining failed!');
    }
  };

  const renderUserActions = ({ id, isActive }: User) => {
    if (isActive) {
      return <a onClick={() => onBlock(id)}>Block</a>;
    }
    return <a onClick={() => onActivate(id)}>Activate</a>;
  };

  const renderApplicationActions = (id: number) => (
    <ApproveAndDeclineActions
      id={id}
      onApprove={onApprove}
      onDecline={onDecline}
    />
  );

  const commonColumns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (updatedAt: string) =>
        formatDistanceToNow(new Date(updatedAt), { addSuffix: true }),
    },
  ];

  const userColumns = [
    {
      title: 'Name',
      key: 'name',
      render: (user: User) => <UserLink user={user} />,
    },
    ...commonColumns,
    {
      title: 'Tags',
      key: 'tags',
      render: renderUserTags,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: renderUserActions,
    },
  ];

  const applicationColumns = [
    {
      title: 'Name',
      key: 'name',
      render: (record: DriverApplication) => (
        <a>{`${record.firstName} ${record.lastName}`}</a>
      ),
    },
    ...commonColumns,
    {
      title: 'Tags',
      key: 'tags',
      render: renderDriverApplicationsTags,
    },
    {
      title: 'Actions',
      key: 'actions',
      dataIndex: 'id',
      render: renderApplicationActions,
    },
  ];

  const isUserTableLoading = isUsersLoading || isActivating || isBlocking;
  const isApplicationsTableLoading =
    isApplicationsLoading || isApproving || isDeclining;

  const sortedUsers = useSortedByTime<User>(
    users,
    (user) => new Date(user.updatedAt),
  );
  const sortedApplications = useSortedByTime<DriverApplication>(
    applications,
    (application) => new Date(application.updatedAt),
  );

  return (
    <MainLayout>
      <Table
        title={() => (
          <Typography.Title level={2}>Driver Applications</Typography.Title>
        )}
        loading={isApplicationsError || isApplicationsTableLoading}
        columns={applicationColumns}
        pagination={{ pageSize: 5 }}
        dataSource={sortedApplications}
      />
      <Table
        title={() => <Typography.Title level={2}>Users</Typography.Title>}
        loading={isUsersError || isUserTableLoading}
        columns={userColumns}
        pagination={{ pageSize: 5 }}
        dataSource={sortedUsers}
      />
      {isUsersError || (isApplicationsError && <NetworkErrorResult />)}
    </MainLayout>
  );
};

export default UsersPage;
