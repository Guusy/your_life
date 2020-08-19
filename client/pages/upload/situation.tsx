import Head from 'next/head';
import { Button, DatePicker, Form, Input, Layout, Select } from 'antd';
import React from 'react';
import moment from 'moment';
import { useApolloClient } from '@apollo/react-hooks';
import EdgesSelect from '../../src/components/edgesSelect/EdgesSelect';
import withApollo from '../../src/lib/apollo';
import FeelingsSelect from '../../src/components/feelingsSelect/FeelingsSelect';
import GoalsSelectModifier from '../../src/components/goalsSelectModifier/GoalsSelectModifier';
import { useAddSituationMutation } from '../../src/graphql/API';

const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const SituationPage = () => {
  const client = useApolloClient();
  const [addSituationMutation] = useAddSituationMutation({ client });
  const uploadSituation = async ({
    title,
    description,
    from,
    feelings,
    place,
    modifier,
    goal
  }) => {
    try {
      await addSituationMutation({
        variables: {
          id: '1',
          input: {
            title,
            description,
            from: from.format('DD-MM-YYYY'),
            feelings,
            place: { id: place },
            goalsModifiers: [{ goal, modifier: Number.parseInt(modifier, 10) }]
          }
        }
      });
    } catch (error) {
      console.log('se re pudrio todo', error);
    }
  };
  return (
    <div className="container">
      <Head>
        <title>Subir una situacion</title>
      </Head>
      <main>
        <h2 style={{ textAlign: 'center' }}> Situación</h2>
        <Layout>
          <Content style={{ padding: '1em' }}>
            <Form name="basic" onFinish={uploadSituation}>
              <Form.Item
                label="Titulo"
                name="title"
                rules={[
                  { required: true, message: 'Tenes que agregar un titulo' }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Descripcion"
                name="description"
                rules={[
                  {
                    required: true,
                    message: 'Tenes que agregar una descripción'
                  }
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>

              <EdgesSelect />

              <FeelingsSelect />

              <Form.Item label="Cuando" name="from" initialValue={moment()}>
                <DatePicker />
              </Form.Item>
              {
                // TODO: Hacer from y to
              }
              <Form.Item
                label="Lugar"
                name="place"
                rules={[
                  { required: true, message: 'Tenes que agregar un lugar' }
                ]}
              >
                <Select placeholder="Selecciona el lugar">
                  <Option value="house">Casa</Option>
                  <Option value="work">Trabajo</Option>
                </Select>
              </Form.Item>
              <GoalsSelectModifier />

              <Form.Item style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">
                  Agregar
                </Button>
              </Form.Item>
            </Form>
          </Content>
        </Layout>
      </main>
    </div>
  );
};

export default withApollo({ ssr: true })(SituationPage);

// title: "Se llama mimis", description: "La cago mordiendo",
// from: "14-08-2020",
// feelings: ["triste"],
// place: {id: "casa"},
// edges: [{edgeId: "work", modifier: 50}]}

/*
title = comi helado
description: "BASTA"
edges: ["cuerpo"]
feelings: (2) ["enojo", "decepción"]
from: Moment {_isAMomentObject: true, _isUTC: false, _pf: {…}, _locale: Locale, _d: Sun Aug 16 2020 23:11:37 GMT-0300 (Argentina Standard Time), …}
modifier: "-25"
place: "bajar_peso"
title: "Comi helado"
 */
