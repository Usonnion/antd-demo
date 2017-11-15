/**
 * Created by Administrator on 2017-11-13.
 */
import React, { Component } from 'react';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import CustomRoute from '../../components/customRoute';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
const { Header, Sider, Content } = Layout;

const breadcrumbNameMap = {
  '/home/dashboard/test': '测试',
};

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  toggleCollapsed() {
    this.setState({
      collapsed: ! this.state.collapsed,
    });
  }

  breadcrumbItemRender(route, params, routes, paths) {
    console.log(paths);
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
  }

  render() {
    const { location } = this.props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      const breadcrumbName = breadcrumbNameMap[url];
      return (
        breadcrumbName ? <Breadcrumb.Item key={url}>
          <Link to={url}>
            {breadcrumbNameMap[url]}
          </Link>
        </Breadcrumb.Item> : null
      );
    });

    const breadcrumbItems = [(
      <Breadcrumb.Item key="home">
        <Link to="/home/dashboard">主页</Link>
      </Breadcrumb.Item>
    )].concat(extraBreadcrumbItems);

    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div style={{ overflow: 'hidden', marginTop: '10px' }}>
            <Link to="/home/dashboard">
              <img src={Logo} alt="error" />
            </Link>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff' }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={() => this.toggleCollapsed()}
            />
          </Header>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ padding: '16px' }}>
              {breadcrumbItems}
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              <CustomRoute {...this.props} />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default Home;
