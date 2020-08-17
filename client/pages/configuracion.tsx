import { Input, Form, Button } from 'antd';
import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
  GetUserAvailableEdges,
  CreateEdgeMutationVariables
} from '../src/graphql/API_2';
import withApollo from '../src/lib/apollo';

import { GET_USER_AVAILABLE_EDGES } from '../src/graphql/queries';
import { CREATE_EDGE } from '../src/graphql/mutations';

const Config = () => {
  const { data: edgesData, loading: loadingEdges } = useQuery<
    GetUserAvailableEdges
  >(GET_USER_AVAILABLE_EDGES, { variables: { id: '1' } });

  const [createEdge] = useMutation<null, CreateEdgeMutationVariables>(
    CREATE_EDGE
  );

  const [addNewOne, setAddNewOne] = useState(false);
  const onFinish = async values => {
    try {
      await createEdge({
        variables: {
          id: '1',
          input: values
        }
      });
    } catch (error) {
      console.log('Error creating edge', error);
    }
  };

  if (loadingEdges) {
    return <p>Cargando informacion</p>;
  }

  return (
    <div>
      <div>
        <h2>Configuración</h2>
        <h4>Tus aristas de la vida</h4>
        {edgesData.edges && edgesData.edges.map(edge => <p> {edge.label}</p>)}
        {addNewOne ? (
          <Form name="basic" onFinish={onFinish}>
            <Form.Item
              label="Nombre"
              name="label"
              rules={[
                { required: true, message: 'Tenes que agregar un nombre' }
              ]}
            >
              <Input placeholder="Titulo" />
            </Form.Item>
            {
              // TODO: agregar una descripcion de esto y algunas cosas mas
            }
            <Form.Item style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">
                Agregar
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Button
            type="primary"
            htmlType="button"
            onClick={() => setAddNewOne(prev => !prev)}
          >
            Agregar una nueva
          </Button>
        )}
      </div>
    </div>
  );
};

export default withApollo({ ssr: true })(Config);
