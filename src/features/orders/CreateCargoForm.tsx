import React, { VFC } from 'react';
import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Space,
  Typography,
} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Cargo } from './models/cargo.interface';

type CreateCargoFormProps = {
  next: () => void;
  setCargos: (cargos: Cargo[]) => void;
  cargos: Cargo[];
};

const CreateCargoForm: VFC<CreateCargoFormProps> = ({
  next,
  cargos,
  setCargos,
}) => {
  const onFinish = ({ cargos }: { cargos: Cargo[] }) => {
    if (!cargos?.length) {
      message.warn('Please enter at least one cargo!');
      return;
    }
    setCargos(cargos);
    next();
  };

  return (
    <>
      <Typography.Title level={3}>Please Add Order Cargos:</Typography.Title>
      <Form
        name="dynamic_form_nest_item"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.List initialValue={cargos} name="cargos">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={[{ required: true, message: 'Missing Cargo Name' }]}
                  >
                    <Input placeholder="Cargo Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'weight']}
                    rules={[{ required: true, message: 'Missing weight' }]}
                  >
                    <InputNumber placeholder="Weight" min={0} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'length']}
                    rules={[{ required: true, message: 'Missing length' }]}
                  >
                    <InputNumber placeholder="Length" min={0} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'height']}
                    rules={[{ required: true, message: 'Missing height' }]}
                  >
                    <InputNumber placeholder="Height" min={0} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'width']}
                    rules={[{ required: true, message: 'Missing width' }]}
                  >
                    <InputNumber placeholder="Width" min={0} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add Cargo
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateCargoForm;