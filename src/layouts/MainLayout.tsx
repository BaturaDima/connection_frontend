import React, { ReactNode, useState } from 'react';
import './MainLayout.css';
import logo from '../logo.svg';
import { Layout, Menu, PageHeader } from 'antd';
import {
  ApartmentOutlined,
  AuditOutlined,
  CarOutlined,
  PlusCircleOutlined,
  ProfileOutlined,
  ShoppingCartOutlined,
  ToolOutlined,
  UserOutlined,
} from '@ant-design/icons';
import SubMenu from 'antd/lib/menu/SubMenu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AllAppRoutes, AppRoutes } from '../routes/routes.enum';

const URL_TO_MENU_MAP = new Map<string, [string, string]>([
  [`${AppRoutes.MANAGEMENT}/${AppRoutes.USERS}`, ['sub1', 'sub1-1']],
  [`${AppRoutes.MANAGEMENT}/${AppRoutes.ORDERS}`, ['sub1', 'sub1-2']],
  [
    `${AppRoutes.MANAGEMENT}/${AppRoutes.TRANSPORT_APPLICATIONS}`,
    ['sub1', 'sub1-3'],
  ],
  [`${AppRoutes.CUSTOMER}/${AppRoutes.CREATE_ORDER}`, ['sub2', 'sub2-1']],
  [
    `${AppRoutes.DRIVER}/${AppRoutes.CREATE_TRANSPORT_APPLICATION}`,
    ['sub3', 'sub3-1'],
  ],
  [AppRoutes.NOT_EXISTING_ROUTE, ['', '']],
]);

export const MainLayout: React.FC<{ children: ReactNode }> = (props: {
  children: ReactNode;
}) => {
  const { Header, Content, Footer, Sider } = Layout;

  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute =
    AllAppRoutes.find((route) => location.pathname.includes(route)) ??
    AppRoutes.NOT_EXISTING_ROUTE;
  const [, menuId] = URL_TO_MENU_MAP.get(currentRoute) ?? ['', ''];

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          overflow: 'auto',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <img src={logo} className="logo" alt={'logo'} />
        <Menu
          defaultOpenKeys={['sub1', 'sub2', 'sub3']}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[menuId]}
        >
          <SubMenu key="sub1" icon={<ToolOutlined />} title="Management">
            <Menu.Item icon={<UserOutlined />} key="sub1-1">
              <Link to={`/${AppRoutes.MANAGEMENT}/${AppRoutes.USERS}`}>
                Users
              </Link>
            </Menu.Item>
            <Menu.Item icon={<ShoppingCartOutlined />} key="sub1-2">
              <Link to={`/${AppRoutes.MANAGEMENT}/${AppRoutes.ORDERS}`}>
                Orders
              </Link>
            </Menu.Item>
            <Menu.Item icon={<AuditOutlined />} key="sub1-3">
              <Link
                to={`/${AppRoutes.MANAGEMENT}/${AppRoutes.TRANSPORT_APPLICATIONS}`}
              >
                Applications
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<ProfileOutlined />} title="Customer">
            <Menu.Item icon={<PlusCircleOutlined />} key="sub2-1">
              <Link to={`/${AppRoutes.CUSTOMER}/${AppRoutes.CREATE_ORDER}`}>
                Create Order
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub3" icon={<ApartmentOutlined />} title="Driver">
            <Menu.Item icon={<CarOutlined />} key="sub3-1">
              <Link
                to={`/${AppRoutes.DRIVER}/${AppRoutes.CREATE_TRANSPORT_APPLICATION}`}
              >
                Create Transport
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header
          className="site-layout-background"
          style={{ padding: 0, marginRight: '16px' }}
        >
          <PageHeader
            avatar={{ src: 'https://picsum.photos/200' }}
            onBack={() => navigate(-1)}
            title={'Connection'}
            subTitle={'Demo'}
          />
        </Header>
        <Content style={{ margin: '24px 16px 0 0', overflow: 'initial' }}>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 'calc(100vh - 160px)',
            }}
          >
            {props.children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
