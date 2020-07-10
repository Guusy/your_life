import Head from 'next/head';
import { Button } from 'antd';
import Router from 'next/router';

export default () => {
  function goToUploadMood() {
    Router.push('/upload/mood');
  }

  function goToUploadSituation() {
    Router.push('/upload/situation');
  }

  function goToThinking() {
    Router.push('/upload/thought');
  }

  return (
    <div className="container">
      <Head>
        <title>Menu de carga</title>
      </Head>
      <main>
        <h2 style={{ textAlign: 'center' }}> Que queres registrar ?</h2>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-evenly'
          }}
        >
          <Button type="primary" onClick={goToUploadMood}>
            Humor
          </Button>
          <Button type="primary" onClick={goToThinking}>
            Pensamiento
          </Button>
          <Button type="primary" onClick={goToUploadSituation}>
            Situacion
          </Button>
        </div>
      </main>
    </div>
  );
};
