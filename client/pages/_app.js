import 'antd/dist/antd.css';
import './styles.css';
import BottomNavbar from '../src/components/bottomNavbar/BottomNavbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="app">
        <Component {...pageProps} />
      </div>
      <BottomNavbar />
    </>
  );
}
export default MyApp;
