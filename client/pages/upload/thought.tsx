import Head from 'next/head';
import { useMutation } from '@apollo/react-hooks';
import { Form, Input, Button, message } from 'antd';
import React from 'react';
import { ADD_THOUGHT } from '../../src/graphql/queries';
import { AddThoughtMutationVariables } from '../../src/graphql/API';
import FeelingsSelect from '../../src/components/feelingsSelect/FeelingsSelect';
import withApollo from '../../src/lib/apollo';

const { TextArea } = Input;

const Thought = () => {
  const [addThought, { loading }] = useMutation<
    null,
    AddThoughtMutationVariables
  >(ADD_THOUGHT);

  const onFinish = async values => {
    try {
      await addThought({ variables: { id: '1', input: values } });
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

          <FeelingsSelect />

          <Form.Item
            label="Descripcion"
            name="description"
            rules={[
              { required: true, message: 'Tenes que agregar una descripción' }
            ]}
          >
            <TextArea rows={4} />
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
