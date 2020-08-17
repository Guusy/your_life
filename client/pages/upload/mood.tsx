import Head from 'next/head';
import {
  Form,
  Input,
  Button,
  Col,
  Select,
  Row,
  Layout,
  DatePicker,
  TimePicker
} from 'antd';
import moment from 'moment';
import { useQuery, useMutation } from '@apollo/react-hooks';
import React, { useState } from 'react';
import withApollo from '../../src/lib/apollo';
import { GET_USER_AVAILABLE_FEELINGS } from '../../src/graphql/queries';
import {
  AddCustomFeelingMutationVariables,
  GetUserAvailableFeelingsData
} from '../../src/graphql/API_2';
import { ADD_CUSTOM_FEELING_USER, ADD_MOOD } from '../../src/graphql/mutations';

const { Option } = Select;
const { TextArea } = Input;
const { Content } = Layout;
const { RangePicker } = TimePicker;

type Mood = {
  title: string;

  feelings: [string];

  description: string;

  date: string;
};
function mood() {
  const [
    addMood,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(ADD_MOOD);

  const [addCustomFeeling, statusAddCustomFeeling] = useMutation<
    null,
    AddCustomFeelingMutationVariables
  >(ADD_CUSTOM_FEELING_USER);

  const { data, refetch: refreshAvailableFeelings } = useQuery<
    // loading: queryLoading, error: queryError
    GetUserAvailableFeelingsData
  >(GET_USER_AVAILABLE_FEELINGS, { variables: { id: '1' } });

  const [searchValue, setSearchValue] = useState('');

  const onFinish = values => {
    console.log('finishhh', values);
    addMood({ variables: { _id: '1', input: values } });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

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
    <div className="container">
      <Head>
        <title>Upload mood</title>
      </Head>

      <Layout>
        <Content style={{ padding: '1em' }}>
          <h1>Subi tu estado de animo</h1>
          <Row>
            <Col span={24}>
              <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
              >
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
                  label="Animo"
                  name="feelings"
                  rules={[
                    { required: true, message: 'Tenes que agregar un animo' }
                  ]}
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
                      data.feelings.map(feeling => (
                        <Option value={feeling}>{feeling}</Option>
                      ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Fecha"
                  name="date"
                  rules={[
                    { required: true, message: 'Tenes que agregar una fecha' }
                  ]}
                >
                  <DatePicker defaultValue={moment()} />
                </Form.Item>
                <Form.Item
                  label="Horario"
                  name="hour"
                  rules={[{ required: false }]}
                >
                  <RangePicker
                    picker="time"
                    placeholder={['Desde', 'Hasta']}
                    use12Hours
                    onChange={e => console.log(e)}
                  />
                </Form.Item>
                <Form.Item label="Descripcion" name="description">
                  <TextArea rows={4} />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Agregar
                  </Button>
                </Form.Item>
              </Form>
              {mutationLoading && <p>Subiendo su animo...</p>}
              {mutationError && <p>Error :( Intentelo nuevamente</p>}
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}

export default withApollo({ ssr: true })(mood);
