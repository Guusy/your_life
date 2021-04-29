import { useApolloClient } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { ChromePicker } from 'react-color';
import {
  useAddCustomFeelingMutation,
  useGetUserAvailableFeelingsQuery
} from '../../graphql/API';

export default () => {
  const client = useApolloClient();
  const { data, loading } = useGetUserAvailableFeelingsQuery({
    variables: { id: '1' },
    client
  });
  const [addFeelingMutation] = useAddCustomFeelingMutation({ client });
  const [show, setShow] = useState(false);
  const [addNewOne, setAddNewOne] = useState(false);
  const [color, setColor] = useState('');
  const [selectingColor, setSelectingColor] = useState(false);
  if (loading) {
    return <p>Cargando sentimientos</p>;
  }
  const label = show ? 'Ocultar sentimientos' : 'Mostrar sentimientos';
  const addFeeling = async ({ feeling }) => {
    const input = { feeling, color };
    console.log('input', input);

    try {
      await addFeelingMutation({
        variables: { id: '1', input }
      });
    } catch (error) {
      console.log('Error adding feeling', error);
    }
  };

  return (
    <div>
      <h4>Sentimientos</h4>
      <Button onClick={() => setShow(prev => !prev)}>{label} </Button>
      <div>
        {show &&
          data.getUserAvailableFeelings.map(({ feeling, color }) => (
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
          ))}
      </div>

      {addNewOne ? (
        <Form onFinish={addFeeling}>
          <Form.Item
            label="Sentimiento"
            name="feeling"
            rules={[
              {
                required: true,
                message: 'Tenes que agregar el nombre del sentimiento'
              }
            ]}
          >
            <Input placeholder="Agrega nombre" />
          </Form.Item>
          <div>
            <button
              type="button"
              onClick={() => setSelectingColor(prev => !prev)}
            >
              Selecciona un color
            </button>
            {selectingColor && (
              <ChromePicker
                color={color}
                onChangeComplete={colorParam => setColor(colorParam.hex)}
              />
            )}
          </div>
          <Button htmlType="submit" disabled={!color}>
            Agregar
          </Button>
        </Form>
      ) : (
        <Button onClick={() => setAddNewOne(prev => !prev)}>
          Agregar uno nuevo
        </Button>
      )}
    </div>
  );
};
