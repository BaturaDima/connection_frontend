import React from 'react';
import { GeoLocation } from './models/location.interface';
import { Descriptions, Table, Typography } from 'antd';
import { Cargo } from './models/cargo.interface';

interface OrderConfirmationProps {
  cargos: Cargo[];
  fromLocation: GeoLocation | undefined;
  toLocation: GeoLocation | undefined;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({
  cargos,
  fromLocation,
  toLocation,
}) => {
  const cargoColumns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Weight',
      key: 'weight',
      dataIndex: 'weight',
    },
    {
      title: 'Height',
      key: 'height',
      dataIndex: 'height',
    },
    {
      title: 'Width',
      key: 'width',
      dataIndex: 'width',
    },
    {
      title: 'Length',
      key: 'length',
      dataIndex: 'length',
    },
  ];

  return (
    <>
      <Typography.Title style={{ padding: '16px' }} level={3}>
        Order Information
      </Typography.Title>
      <Descriptions layout="horizontal" bordered>
        <Descriptions.Item label="Source City">
          {fromLocation?.city.name}
        </Descriptions.Item>
        <Descriptions.Item label="Source Street">
          {fromLocation?.street.name}
        </Descriptions.Item>
        <Descriptions.Item label="Source Home">
          {fromLocation?.home}
        </Descriptions.Item>
        <Descriptions.Item label="Destination City">
          {toLocation?.city.name}
        </Descriptions.Item>
        <Descriptions.Item label="Destination Street">
          {toLocation?.street.name}
        </Descriptions.Item>
        <Descriptions.Item label="Destination Home">
          {toLocation?.home}
        </Descriptions.Item>
      </Descriptions>
      <Table
        title={() => (
          <Typography.Title level={3}>Order Cargos</Typography.Title>
        )}
        pagination={{ pageSize: 3 }}
        columns={cargoColumns}
        dataSource={cargos}
      />
    </>
  );
};

export default OrderConfirmation;