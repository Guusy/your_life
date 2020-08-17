import { useApolloClient } from '@apollo/react-hooks';
import { Form, Select } from 'antd';
import React from 'react';
import { useGetUserAvailableEdgesQuery } from '../../graphql/API';

const { Option } = Select;

export default () => {
  const client = useApolloClient();
  const { data } = useGetUserAvailableEdgesQuery({
    variables: { id: '1' },
    client
  });

  return (
    <>
      {data && data.edges && (
        <Form.Item
          label="Sobre que:"
          name="edges"
          rules={[
            { required: true, message: 'Tenes que agregar sobre que es' }
          ]}
        >
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Selecciona sobre que estas pensando"
          >
            {data.edges.map(option => (
              <Option value={option.id}>{option.label}</Option>
            ))}
          </Select>
        </Form.Item>
      )}
    </>
  );
};
