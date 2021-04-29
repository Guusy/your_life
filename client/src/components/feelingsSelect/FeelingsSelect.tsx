import { Button, Form, Select } from 'antd';
import React, { useState } from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/react-hooks';
import {
  AddCustomFeelingMutationVariables,
  GetUserAvailableFeelingsData
} from '../../graphql/API_2';
import { GET_USER_AVAILABLE_FEELINGS } from '../../graphql/queries';
import { ADD_CUSTOM_FEELING_USER } from '../../graphql/mutations';
import { useGetUserAvailableFeelingsQuery } from '../../graphql/API';

const { Option } = Select;

export default () => {
  const client = useApolloClient();
  const [addCustomFeeling, statusAddCustomFeeling] = useMutation<
    null,
    AddCustomFeelingMutationVariables
  >(ADD_CUSTOM_FEELING_USER);

  const {
    data,
    refetch: refreshAvailableFeelings
  } = useGetUserAvailableFeelingsQuery({ variables: { id: '1' }, client });

  const [searchValue, setSearchValue] = useState('');

  const addFeeling = async () => {
    try {
      await addCustomFeeling({
        variables: { id: '1', input: { feeling: searchValue } }
      });
      await refreshAvailableFeelings();
    } catch (errorAddFeeling) {
      console.log('statusAddCustomFeeling', statusAddCustomFeeling.error);
      console.log('error trying to add a custom feeling', errorAddFeeling);
    }
  };
  return (
    <Form.Item
      label="Animo"
      name="feelings"
      rules={[{ required: true, message: 'Tenes que agregar un animo' }]}
    >
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder="Selecciona tus animos"
        onSearch={value => setSearchValue(value)}
        notFoundContent={
          <p>
            Si no existe puedes{' '}
            <Button onClick={addFeeling}> agregarlo </Button>
          </p>
        }
      >
        {data &&
          data.getUserAvailableFeelings.map(({ feeling, color }) => (
            <Option value={feeling}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    backgroundColor: color,
                    width: '8px',
                    height: '8px',
                    marginRight: '5px'
                  }}
                />
                {feeling}
              </div>
            </Option>
          ))}
      </Select>
    </Form.Item>
  );
};
