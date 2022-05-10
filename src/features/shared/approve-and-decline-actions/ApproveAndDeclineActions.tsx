import React, { VFC } from 'react';
import { Space } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

type ApproveAndDeclineActions = {
  id: number;
  onApprove: (id: number) => void;
  onDecline: (id: number) => void;
};

const ApproveAndDeclineActions: VFC<ApproveAndDeclineActions> = ({
  id,
  onApprove,
  onDecline,
}) => (
  <Space size={'large'}>
    <a onClick={() => onApprove(id)}>
      Approve <CheckOutlined />
    </a>
    <a onClick={() => onDecline(id)}>
      Decline <CloseOutlined />
    </a>
  </Space>
);

export default ApproveAndDeclineActions;