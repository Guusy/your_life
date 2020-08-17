import { Button, Col, Form, Input, Row, Select } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;
export default () => {
  // TODO :  obtener los goals de la API
  const [addOne, setAddone] = useState(false);

  return (
    <>
      {addOne ? (
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              label="Meta"
              name="goal"
              rules={[
                { required: true, message: 'Tenes que agregar una meta' }
              ]}
            >
              <Select placeholder="Selecciona el lugar">
                <Option value="lider_promotion">Promoción a lider</Option>
                <Option value="bajar_peso">Bajar de peso</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              style={{ width: '100%' }}
              label="Modificador"
              name="modifier"
              rules={[
                { required: true, message: 'Tenes que agregar un modificador' }
              ]}
            >
              <Input placeholder="Modificador" />
            </Form.Item>
          </Col>
        </Row>
      ) : (
        <Button type="primary" onClick={() => setAddone(prev => !prev)}>
          Esto afecta alguna meta tuya ?
        </Button>
      )}
    </>
  );
};
