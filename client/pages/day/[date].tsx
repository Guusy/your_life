import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button } from 'antd';
import { useApolloClient } from '@apollo/react-hooks';
import withApollo from '../../src/lib/apollo';
import ThoughtsView from '../../src/components/thoughtsView/ThoughtsView';
import FeelingsPieChart from '../../src/components/feelingsPieChart/FeelingsPieChart';
import Calendar from '../../src/domain/Calendar';
import { useGetDateQuery } from '../../src/graphql/API';

const Date = () => {
  const router = useRouter();
  const { date } = router.query;
  const client = useApolloClient();

  const { data, loading } = useGetDateQuery({
    variables: {
      idUser: '1',
      date: date.toString()
    },
    client
  });
  const [viewThoughts, setViewThoughts] = useState<boolean>(false);

  if (loading) {
    return <p>Cargandooooo....</p>;
  }
  const {
    date: { thoughts }
  } = data;
  const calendar = new Calendar({ thoughts });

  const pieChartData = calendar.getListFeelingFromPieChart();

  const buttonLabel = viewThoughts
    ? 'Ocultar pensamientos'
    : 'Ver pensamientos';
  return (
    <div>
      <h2>Estas viendo el dia {date}</h2>
      <FeelingsPieChart data={pieChartData} />

      <Button type="primary" onClick={() => setViewThoughts(prev => !prev)}>
        {buttonLabel}
      </Button>
      {viewThoughts && <ThoughtsView thoughts={data.date.thoughts} />}
    </div>
  );
};

export default withApollo({ ssr: true })(Date);
