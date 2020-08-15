import { UserOutlined, MenuOutlined, SettingOutlined } from '@ant-design/icons';
import Link from 'next/link';

export default () => {
  return (
    <div className="bottom-nav">
      <Link href="/">
        <div className="item">
          <UserOutlined />
        </div>
      </Link>
      <Link href="/upload/menu">
        <div className="item">
          <MenuOutlined />
        </div>
      </Link>
      <Link href="/configuracion">
        <div className="item">
          <SettingOutlined />
        </div>
      </Link>
    </div>
  );
};
