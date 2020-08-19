import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/react-hooks';
import withApollo from '../../src/lib/apollo';
import { useGetUserGoalQuery } from '../../src/graphql/API';

const Goal = () => {
  const router = useRouter();
  const { goal } = router.query;
  const client = useApolloClient();
  const { data, loading } = useGetUserGoalQuery({
    variables: { id: '1', goalId: goal.toString() },
    client
  });
  if (loading) {
    return <p>Cargando tu meta</p>;
  }
  const { getUserGoal: goalData } = data;
  return (
    <div>
      soy la vista de una meta {goal}
      <div>
        <p>{goalData.title}</p>
        <p>{goalData.description}</p>
        <p>{goalData.starter_day}</p>
      </div>
    </div>
  );
};

export default withApollo({ ssr: true })(Goal);
