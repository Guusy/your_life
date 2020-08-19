import React, { useState } from 'react';
import { Input, Form, Button, DatePicker } from 'antd';
import { useApolloClient } from '@apollo/react-hooks';
import moment from 'moment';
import Link from 'next/link';
import {
  useAddUserGoalMutation,
  useGetUserGoalsQuery
} from '../../graphql/API';

const { TextArea } = Input;
export default () => {
  const client = useApolloClient();
  const { data, loading } = useGetUserGoalsQuery({
    variables: { id: '1' },
    client
  });
  const [addGoalMutation] = useAddUserGoalMutation({ client });

  const [addNewOne, setAddNewOne] = useState(false);

  const addGoal = async ({ title, description, starter_day }) => {
    try {
      await addGoalMutation({
        variables: { id: '1', input: { title, description, starter_day } }
      });
    } catch (error) {
      console.log('Error', error);
    }
  };
  if (loading) {
    return <p>Estamos cargando tus metas</p>;
  }
  return (
    <div>
      <h4> Tus metas</h4>
      <div>
        {data.getUserGoals.map(goal => (
          <div>
            <Link href={`/goal/${goal.id}`}>
              <p> {goal.title}</p>
            </Link>
            {/* <p>{goal.description}</p> */}
            {/* <p>{goal.starter_day}</p> */}
          </div>
        ))}
        <Button onClick={() => setAddNewOne(true)}>
          Agregar una nueva meta
        </Button>
        {addNewOne && (
          <Form onFinish={addGoal}>
            <Form.Item
              label="Titulo"
              name="title"
              rules={[
                { required: true, message: 'Tenes que agregar un titulo' }
              ]}
            >
              <Input placeholder="Agrega un titulo" />
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

            <Form.Item
              label="Cuando"
              name="starter_day"
              initialValue={moment()}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">
                Agregar
              </Button>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};
