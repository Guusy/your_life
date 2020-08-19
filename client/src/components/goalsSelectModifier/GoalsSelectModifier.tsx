import { Button, Col, Form, Row, Select } from 'antd';
import React, { useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import { useGetUserGoalsQuery } from '../../graphql/API';

const { Option } = Select;

const modifiersOptions = [
  { value: 1, label: 'flechita para arriba' },
  { value: 0.5, label: 'flechita para arriba derecha' },
  { value: 0, label: 'neutro' },
  { value: -0.5, label: 'flechita para abajo derecha' },
  { value: -1, label: 'flechita para abajo' }
];
export default () => {
  const client = useApolloClient();
  const { data } = useGetUserGoalsQuery({ variables: { id: '1' }, client });
  const [addOne, setAddone] = useState(false);

  return (
    <>
      {addOne ? (
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item
              label="Meta"
              name="goal"
              rules={[
                { required: true, message: 'Tenes que agregar una meta' }
              ]}
            >
              <Select placeholder="Selecciona el lugar">
                {data.getUserGoals.map(goal => (
                  <Option value={goal.id}>{goal.title}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              style={{ width: '100%' }}
              label="Modificador"
              name="modifier"
              rules={[
                { required: true, message: 'Tenes que agregar un modificador' }
              ]}
            >
              <Select placeholder="Modificador">
                {modifiersOptions.map(modifier => (
                  <Option value={modifier.value}> {modifier.label}</Option>
                ))}
              </Select>
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
