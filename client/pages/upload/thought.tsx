import Head from 'next/head';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import { Form, Input, Button, message, DatePicker } from 'antd';
import React from 'react';
import moment from 'moment';
import { AddThoughtMutationVariables } from '../../src/graphql/API_2';
import FeelingsSelect from '../../src/components/feelingsSelect/FeelingsSelect';
import withApollo from '../../src/lib/apollo';
import { ADD_THOUGHT } from '../../src/graphql/mutations';
import EdgesSelect from '../../src/components/edgesSelect/EdgesSelect';
import { useGetUserAvailableEdgesQuery } from '../../src/graphql/API';

const { TextArea } = Input;

const Thought = () => {
  const client = useApolloClient();
  const { data } = useGetUserAvailableEdgesQuery({
    variables: { id: '1' },
    client
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

          <EdgesSelect />

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
