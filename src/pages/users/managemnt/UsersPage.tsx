import { MainLayout } from '../../../layouts/MainLayout';

import React, { useEffect, useState } from 'react';
import { Result, Table, Tag } from 'antd';
import { User } from './models/user.interface';
import { DriverApplication } from './models/driver-application.interface';

const UsersPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState<DriverApplication[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [hasError, setError] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const responses = await Promise.all([
        fetch('/user'),
        fetch('/driver-application/not-approved'),
      ]);

      if (responses.some(response => !response.ok)) {
        setError(true);
        return;
      }

      const [users, applications] = await Promise.all(
        responses.map((it) => it.json()),
      );

      setUsers(users);
      setApplications(applications);
      setLoading(false);
    };

    fetchUsers();
  }, []);

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
    <Tag color='orange' key='Approve'>
      Not Approved
    </Tag>
  );

  const onBlock = async (id: number) => {
    const response = await updateUser(`/user/${id}/block`);
    if (!response.ok) return;

    toggleUserState(id);
  };

  const onActivate = async (id: number) => {
    const response = await updateUser(`/user/${id}/activate`);
    if (!response.ok) return;

    toggleUserState(id);
  };

  const onApprove = async (id: number) => {
    const response = await updateUser(`/driver-application/${id}/approve`);
    if (!response.ok) return;

    removeApplication(id);
  };

  const updateUser = async (url: string) => {
    setLoading(true);
    const response = await fetch(url, { method: 'PUT' });
    setLoading(false);
    return response;
  };

  const renderUserActions = ({ id, isActive }: User) => {
    if (isActive) {
      return <a onClick={() => onBlock(id)}>Block</a>;
    }
    return <a onClick={() => onActivate(id)}>Activate</a>;
  };

  const renderApplicationActions = (id: number) => (
    <a onClick={() => onApprove(id)}>Approve</a>
  );

  const removeApplication = (id: number) => {
    const index = applications.findIndex((app) => app.id === id);
    if (index === -1) return;

    setApplications([
      ...applications.slice(0, index),
      ...applications.slice(index + 1),
    ]);
  };

  const toggleUserState = (id: number) => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) return;

    setUsers([
      ...users.slice(0, index),
      {
        ...users[index],
        isActive: !users[index].isActive,
      },
      ...users.slice(index + 1),
    ]);
  };

  const commonColumns = [
    {
      title: 'Name',
      key: 'name',
      render: (record: User | DriverApplication) => (
        <a>{`${record.firstName} ${record.lastName}`}</a>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  const userColumns = [
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

  const applicationTags = [
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

  return (
    <MainLayout>
      <Table
        title={() => 'Driver Applications'}
        bordered
        loading={loading}
        columns={applicationTags}
        dataSource={applications}
      />
      <Table
        title={() => 'Users'}
        bordered
        loading={loading}
        columns={userColumns}
        dataSource={users}
      />
      {hasError && <Result
        status='warning'
        title='There are some problems with your operation.'
      />}
    </MainLayout>
  );
};

export default UsersPage;
