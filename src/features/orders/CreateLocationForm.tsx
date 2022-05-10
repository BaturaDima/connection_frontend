import React, { useMemo, VFC } from 'react';
import {
  Button,
  Form,
  FormInstance,
  InputNumber,
  message,
  Space,
  Typography,
} from 'antd';
import DropDownWIthInput from '../shared/dropdown-with-input/DropDownWIthInput';
import { GeoLocation } from './models/location.interface';
import { Street } from './models/street.interface';
import { City } from './models/city.interface';

interface CreateLocationFormState {
  cityFrom: string | undefined;
  streetFrom: string | undefined;
  homeFrom: number | undefined;
  cityTo: string | undefined;
  streetTo: string | undefined;
  homeTo: number | undefined;
}

type CreateLocationFormProps = {
  next: () => void;
  setFromLocation: (val: GeoLocation) => void;
  setToLocation: (val: GeoLocation) => void;
  fromLocation: GeoLocation | undefined;
  toLocation: GeoLocation | undefined;
  streets: Street[];
  cities: City[];
};

const CreateLocationForm: VFC<CreateLocationFormProps> = ({
  streets,
  cities,
  next,
  setFromLocation,
  setToLocation,
  fromLocation,
  toLocation,
}) => {
  const formRef = React.createRef<FormInstance>();
  const formValues = useMemo<CreateLocationFormState>(
    () => ({
      streetFrom: fromLocation?.street.name,
      streetTo: toLocation?.street.name,
      cityFrom: fromLocation?.city.name,
      cityTo: toLocation?.city.name,
      homeFrom: fromLocation?.home,
      homeTo: toLocation?.home,
    }),
    [],
  );

  const onStreetChange = (key: 'streetTo' | 'streetFrom', street: string) => {
    formRef.current?.setFieldsValue({ [key]: street });
  };

  const onCityChange = (key: 'cityTo' | 'cityFrom', city: string) => {
    formRef.current?.setFieldsValue({ [key]: city });
  };

  const onFinish = (state: CreateLocationFormState) => {
    const toLocation = {
      home: state.homeTo!,
      street: {
        name: state.streetTo!,
      },
      city: {
        name: state.cityTo!,
      },
    };
    const fromLocation = {
      home: state.homeFrom!,
      street: {
        name: state.streetFrom!,
      },
      city: {
        name: state.cityFrom!,
      },
    };
    if (JSON.stringify(toLocation) === JSON.stringify(fromLocation)) {
      message.error('Locations must not be the same.');
      return;
    }

    setToLocation(toLocation);
    setFromLocation(fromLocation);
    next();
  };

  return (
    <>
      <Typography.Title level={3}>
        Please add source and destination locations:
      </Typography.Title>
      <Form
        initialValues={formValues}
        layout={'vertical'}
        ref={formRef}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        autoComplete="off"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <Space>
          <Form.Item
            label={'Source'}
            name="cityFrom"
            rules={[{ required: true, message: 'Missing source city' }]}
          >
            <DropDownWIthInput
              onChange={(city) => onCityChange('cityFrom', city)}
              placeholder="City Name"
              options={cities.map((city) => city.name)}
              defaultValue={formValues.cityFrom}
            />
          </Form.Item>

          <Form.Item
            label={'Destination'}
            name="cityTo"
            rules={[{ required: true, message: 'Missing destination city' }]}
          >
            <DropDownWIthInput
              onChange={(city) => onCityChange('cityTo', city)}
              placeholder="City Name"
              options={cities.map((city) => city.name)}
              defaultValue={formValues.cityTo}
            />
          </Form.Item>
        </Space>

        <Space>
          <Form.Item
            name="streetFrom"
            rules={[{ required: true, message: 'Missing source street' }]}
          >
            <DropDownWIthInput
              onChange={(street) => onStreetChange('streetFrom', street)}
              placeholder="Street Name"
              options={streets.map((street) => street.name)}
              defaultValue={formValues.streetFrom}
            />
          </Form.Item>

          <Form.Item
            name="streetTo"
            rules={[{ required: true, message: 'Missing destination street!' }]}
          >
            <DropDownWIthInput
              onChange={(street) => onStreetChange('streetTo', street)}
              placeholder="Street Name"
              options={streets.map((street) => street.name)}
              defaultValue={formValues.streetTo}
            />
          </Form.Item>
        </Space>

        <Space align={'center'} size={'large'}>
          <Form.Item
            name="homeFrom"
            rules={[{ required: true, message: 'Missing home' }]}
          >
            <InputNumber placeholder="Home" min={0} />
          </Form.Item>

          <Form.Item
            name="homeTo"
            rules={[{ required: true, message: 'Missing home' }]}
          >
            <InputNumber placeholder="Home" min={0} />
          </Form.Item>
        </Space>

        <Form.Item>
          <Button style={{ marginTop: '5px' }} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateLocationForm;