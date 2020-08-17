import Head from 'next/head';
import { useApolloClient } from '@apollo/react-hooks';
import withApollo from '../src/lib/apollo';
import Calendar from '../src/components/calendar/Calendar';
import { useGetUserQuery } from '../src/graphql/API';

function Home() {
  const client = useApolloClient();
  const { loading: queryLoading, error: queryError, data } = useGetUserQuery({
    variables: { id: '1' },
    client
  });

  return (
    <div className="container">
      <Head>
        <title>Hi</title>
      </Head>
      <main>
        <h1 className="title">Gonzalo</h1>
        {queryLoading && <p>Cargando tu información</p>}
        {queryError && <p>Hubo un error cargando tu información</p>}
        {data && data.getUser && (
          <div>
            <h4>Animos:</h4>
            {data.getUser.moods &&
              data.getUser.moods.map(mood => <Mood {...mood} />)}

            <h4>Pensamientos</h4>
            {/* <ThoughtsView thoughts={data.getUser.thoughts} /> */}

            <Calendar thoughts={data.getUser.thoughts} />
          </div>
        )}
      </main>
    </div>
  );
}

const Mood = ({ title, description, date, feelings }) => {
  return (
    <div style={{ border: '1px solid black', marginBottom: '2em' }}>
      <p>{title}</p>
      <p>{description}</p>
      <p>{date}</p>
      <p>
        Sentimientos:{' '}
        {feelings && feelings.map(feeling => <span>{feeling},</span>)}
      </p>
    </div>
  );
};

export default withApollo({ ssr: true })(Home);
