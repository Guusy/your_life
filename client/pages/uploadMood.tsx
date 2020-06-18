import Head from 'next/head';
import {
  Form,
  Input,
  Button,
  Col,
  Select,
  Row,
  Layout,
  DatePicker
} from 'antd';
import moment from 'moment';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import withApollo from '../src/lib/apollo';

const { Option } = Select;
const { TextArea } = Input;
const { Content } = Layout;

const ADD_MOOD = gql`
  mutation AddMood($_id: ID!, $input: AddMoodInput!) {
    addMood(_id: $_id, input: $input) {
      title
      feelings
      description
      date
    }
  }
`;

type Mood = {
  title: string;

  feelings: [string];

  description: string;

  date: string;
};
function uploadMood() {
  const [
    addMood,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(ADD_MOOD);

  const onFinish = values => {
    console.log('Success:', values);

    addMood({ variables: { _id: '1', input: values } });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  const handleChange = change => {
    console.log('handleChange:', change);
  };

  const onChangeDate = (date, dateString) => {
    console.log(date, dateString);
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
                initialValues={{ remember: true }}
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
                    onChange={handleChange}
                  >
                    <Option value="felicidad">Felicidad</Option>
                    <Option value="enojo">Enojo</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Fecha"
                  name="date"
                  rules={[
                    { required: true, message: 'Tenes que agregar una fecha' }
                  ]}
                >
                  <DatePicker defaultValue={moment()} onChange={onChangeDate} />
                </Form.Item>

                <Form.Item label="Situacion" name="description">
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

export default withApollo({ ssr: true })(uploadMood);
