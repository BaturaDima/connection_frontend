import React, { useMemo } from 'react';
import { Button, Form, FormInstance, InputNumber, Space } from 'antd';
import DropDownWIthInput from '../../../../components/dropdown-with-input/DropDownWIthInput';
import { GeoLocation } from '../../../orders/management/models/location.interface';

interface CreateLocationFormState {
  cityFrom: string | undefined;
  streetFrom: string | undefined;
  homeFrom: number | undefined;
  cityTo: string | undefined;
  streetTo: string | undefined;
  homeTo: number | undefined;
}

interface CreateLocationFormProps {
  next: () => void;
  setFromLocation: (val: GeoLocation) => void;
  setToLocation: (val: GeoLocation) => void;
  fromLocation: GeoLocation | undefined;
  toLocation: GeoLocation | undefined;
}

const CreateLocationForm: React.FC<CreateLocationFormProps> = ({
                                                                 next,
                                                                 setFromLocation,
                                                                 setToLocation,
                                                                 fromLocation,
                                                                 toLocation,
                                                               }) => {
  const formRef = React.createRef<FormInstance>();
  const formValues = useMemo<CreateLocationFormState>(() => ({
    streetFrom: fromLocation?.street.name,
    streetTo: toLocation?.street.name,
    cityFrom: fromLocation?.city.name,
    cityTo: toLocation?.city.name,
    homeFrom: fromLocation?.home,
    homeTo: toLocation?.home,
  }), []);

  const onStreetChange = (key: 'streetTo' | 'streetFrom', street: string) => {
    formRef.current?.setFieldsValue({ [key]: street });
  };

  const onCityChange = (key: 'cityTo' | 'cityFrom', city: string) => {
    formRef.current?.setFieldsValue({ [key]: city });
  };

  const onFinish = (state: CreateLocationFormState) => {
    setToLocation({
      home: state.homeTo!,
      street: {
        name: state.streetTo!,
      },
      city: {
        name: state.cityTo!,
      },
    });
    setFromLocation({
      home: state.homeFrom!,
      street: {
        name: state.streetFrom!,
      },
      city: {
        name: state.cityFrom!,
      },
    });
    next();
  };

  return (
    <>
      <h1>Please add source and destination locations:</h1>
      <Form
        initialValues={formValues}
        layout={'vertical'}
        ref={formRef}
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete='off'
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Space>
          <Form.Item
            label={'Source'}
            name='cityFrom'
            rules={[{ required: true, message: 'Missing source city' }]}
          >
            <DropDownWIthInput onChange={city => onCityChange('cityFrom', city)}
                               placeholder='City Name'
                               options={[]}
                               defaultValue={formValues.cityFrom} />
          </Form.Item>

          <Form.Item
            label={'Destination'}
            name='cityTo'
            rules={[{ required: true, message: 'Missing destination city' }]}
          >
            <DropDownWIthInput onChange={city => onCityChange('cityTo', city)}
                               placeholder='City Name'
                               options={[]}
                               defaultValue={formValues.cityTo} />
          </Form.Item>
        </Space>

        <Space>
          <Form.Item
            name='streetFrom'
            rules={[{ required: true, message: 'Missing source street' }]}
          >
            <DropDownWIthInput onChange={street => onStreetChange('streetFrom', street)}
                               placeholder='Street Name'
                               options={[]}
                               defaultValue={formValues.streetFrom} />
          </Form.Item>

          <Form.Item
            name='streetTo'
            rules={[{ required: true, message: 'Missing destination street!' }]}
          >
            <DropDownWIthInput onChange={street => onStreetChange('streetTo', street)}
                               placeholder='Street Name'
                               options={[]}
                               defaultValue={formValues.streetTo} />
          </Form.Item>
        </Space>

        <Space align={'center'} size={'large'}>
          <Form.Item
            name='homeFrom'
            rules={[{ required: true, message: 'Missing home' }]}
          >
            <InputNumber placeholder='Home' min={0} />
          </Form.Item>

          <Form.Item
            name='homeTo'
            rules={[{ required: true, message: 'Missing home' }]}
          >
            <InputNumber placeholder='Home' min={0} />
          </Form.Item>
        </Space>

        <Form.Item>
          <Button style={{ marginTop: '5px' }} type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateLocationForm;