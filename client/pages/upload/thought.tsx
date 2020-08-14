import Head from 'next/head';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Form, Input, Button, message, DatePicker, Select } from 'antd';
import React from 'react';
import moment from 'moment';
import {
  AddThoughtMutationVariables,
  GetUserAvailableEdges
} from '../../src/graphql/API';
import FeelingsSelect from '../../src/components/feelingsSelect/FeelingsSelect';
import withApollo from '../../src/lib/apollo';
import { ADD_THOUGHT } from '../../src/graphql/mutations';
import { GET_USER_AVAILABLE_EDGES } from '../../src/graphql/queries';

const { Option } = Select;

const { TextArea } = Input;

const Thought = () => {
  const { data } = useQuery<GetUserAvailableEdges>(GET_USER_AVAILABLE_EDGES, {
    variables: { id: '1' }
  });
  const [addThought, { loading }] = useMutation<
    null,
    AddThoughtMutationVariables
  >(ADD_THOUGHT);

  const onFinish = async values => {
    try {
      const { date = moment(), edges } = values;
      // TODO: OMG QUE ES ESTO CAMBIALO POR FAVOR
      const newEdges = edges.map(edge => {
        const { id, label } = data.edges.find(fullEdge => edge === fullEdge.id);
        return { id, label };
      });
      await addThought({
        variables: {
          id: '1',
          input: { ...values, edges: newEdges, date: date.format('DD-MM-YYYY') }
        }
      });
      message.success('Se agrego con exito su pensamiento', 2.5);
    } catch (addThoughtError) {
      console.log('addThoughtError', addThoughtError);
    }
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="container">
      <Head>
        <title>Subir un pensamiento</title>
      </Head>
      <main style={{ padding: '1em' }}>
        <h2 style={{ textAlign: 'center' }}> Pensamiento</h2>
        <Form name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Titulo"
            name="title"
            rules={[{ required: true, message: 'Tenes que agregar un titulo' }]}
          >
            <Input placeholder="Titulo" />
          </Form.Item>

          <Form.Item
            label="Descripcion"
            name="description"
            rules={[
              { required: true, message: 'Tenes que agregar una descripción' }
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

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

          <FeelingsSelect />

          <Form.Item label="Fecha" name="date">
            <DatePicker defaultValue={moment()} />
          </Form.Item>

          <Form.Item style={{ textAlign: 'center' }}>
            <Button type="primary" htmlType="submit" disabled={loading}>
              Agregar
            </Button>
          </Form.Item>
        </Form>
      </main>
    </div>
  );
};

export default withApollo({ ssr: true })(Thought);
