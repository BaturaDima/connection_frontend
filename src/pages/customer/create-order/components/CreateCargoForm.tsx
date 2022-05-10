import React from 'react';
import { Button, Form, Input, InputNumber, message, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export interface Cargo {
  name: string;
  width: number;
  length: number;
  height: number;
  weight: number;
}

interface CreateCargoFormProps {
  next: () => void;
  setCargos: (cargos: Cargo[]) => void;
  cargos: Cargo[];
}

const CreateCargoForm: React.FC<CreateCargoFormProps> = ({ next, cargos, setCargos }) => {
  const onFinish = async ({ cargos }: { cargos: Cargo[] }) => {
    if (!cargos?.length) {
      await message.warn('Please enter at least one cargo!');
      return;
    }
    setCargos(cargos);
    next();
  };

  return (
    <>
      <h1>Please add some cargos:</h1>
      <Form name='dynamic_form_nest_item'  onFinish={onFinish}
            autoComplete='off'>
        <Form.List initialValue={cargos} name='cargos'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align='baseline'>
                  <Form.Item
                    {...restField}
                    name={[name, 'name']}
                    rules={[{ required: true, message: 'Missing Cargo Name' }]}
                  >
                    <Input placeholder='Cargo Name' />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'weight']}
                    rules={[{ required: true, message: 'Missing weight' }]}
                  >
                    <InputNumber placeholder='Weight' min={0} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'length']}
                    rules={[{ required: true, message: 'Missing length' }]}
                  >
                    <InputNumber placeholder='Length' min={0} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'height']}
                    rules={[{ required: true, message: 'Missing height' }]}
                  >
                    <InputNumber placeholder='Height' min={0} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'width']}
                    rules={[{ required: true, message: 'Missing width' }]}
                  >
                    <InputNumber placeholder='Width' min={0} />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button type='dashed' onClick={() => add()} block icon={<PlusOutlined />}>
                  Add Cargo
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateCargoForm;