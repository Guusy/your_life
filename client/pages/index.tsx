import Head from 'next/head';
import Hello from '../components/Hello';

type User = {
  name: string;
};
export default function Home() {
  const gonzalo: User = { name: 'Gonzalo !' };
  return (
    <div className="container">
      <Head>
        <title>Teach away registration</title>
      </Head>

      <main>
        <Hello />
        <h1 className="title">{gonzalo.name}</h1>
      </main>
    </div>
  );
}
