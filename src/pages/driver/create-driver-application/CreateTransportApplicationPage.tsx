import { message, Upload } from 'antd';
import React from 'react';
import { MainLayout } from '../../../layouts/MainLayout';
import { InboxOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/es/upload';

const CreateTransportApplicationPage: React.FC = () => {
  const onChange = async ({ file }: UploadChangeParam) => {
    if (file.status !== 'done') return;

    const publicId: string = file.response.public_id;
    const response = await fetch('/transport-application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ publicId }),
    });

    if (!response.ok || !response.json) {
      message.error('Failed to save transport application document.');
      return;
    }
    message.success('Successfully uploaded transport application.');
  };

  return (
    <MainLayout>
      <h1>Upload document for your transport application:</h1>
      <Upload.Dragger onChange={onChange}
                      accept={'.pdf'}
                      action={`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`}
                      name={'file'} data={{ upload_preset: process.env.REACT_APP_CLOUD_UPLOAD_PRESET }}>
        <p className='ant-upload-drag-icon'>
          <InboxOutlined />
        </p>
        <p className='ant-upload-text'>Click or drag file to this area to upload</p>
        <p className='ant-upload-hint'>Support for a single upload.</p>
      </Upload.Dragger>
    </MainLayout>
  );
};

export default CreateTransportApplicationPage;