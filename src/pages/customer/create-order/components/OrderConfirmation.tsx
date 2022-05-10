import React from 'react';
import { Cargo } from './CreateCargoForm';
import { GeoLocation } from '../../../orders/management/models/location.interface';
import { Descriptions, Table } from 'antd';

interface OrderConfirmationProps {
  cargos: Cargo[];
  fromLocation: GeoLocation | undefined;
  toLocation: GeoLocation | undefined;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ cargos, fromLocation, toLocation }) => {
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

  return (<>
    <Descriptions title='Order Info' layout='vertical' bordered>
      <Descriptions.Item label='Source City'>{fromLocation?.city.name}</Descriptions.Item>
      <Descriptions.Item label='Source Street'>{fromLocation?.street.name}</Descriptions.Item>
      <Descriptions.Item label='Source Home'>{fromLocation?.home}</Descriptions.Item>
      <Descriptions.Item label='Source City'>{toLocation?.city.name}</Descriptions.Item>
      <Descriptions.Item label='Source Street'>{toLocation?.street.name}</Descriptions.Item>
      <Descriptions.Item label='Source Home'>{toLocation?.home}</Descriptions.Item>
    </Descriptions>
    <Table title={() => 'Order Cargos'} columns={cargoColumns} dataSource={cargos} />
  </>);
};

export default OrderConfirmation;