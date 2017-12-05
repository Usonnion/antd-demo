import './home.less';
import emptyNoticeIcon from '../../assets/empyNoticeIcon.svg';
import React, { PureComponent } from 'react';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import CustomRoute from '../../components/customRoute';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import NoticeIcon from '../../components/NoticeIcon'
import { connect } from 'react-redux';
import DealReservationPanel from './reservation/DealReservationPanel';
import ProductSelector from './order/ProductSelector';
import CustomerSelector from './customer/CustomerSelector';
import ReservationSelector from './reservation/ReservationSelector';

const { Header, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

const breadcrumbNameMap = {
  '/home/dashboard/test': '测试',
  '/home/customer': '客户',
  '/home/product': '产品',
  '/home/product/edit': '修改',
  '/home/product/detail': '产品详情',
  '/home/reservation': '预订单',
  '/home/customer/detail': '详情',
  '/home/reservation/detail': '详情',
  '/home/order': '消费单',
  '/home/order/detail': '详情',
  '/home/order/edit': '修改'
};

const menus = [
  {
    path: '/home/dashboard',
    title: '仪表盘',
    iconType: 'compass'
  },
  {
    path: '/home/customer',
    title: '会员管理',
    iconType: 'user'
  },
  {
    path: '/home/reservation',
    title: '预订单管理',
    iconType: 'shopping-cart'
  },
  {
    path: '/home/order',
    title: '消费清单管理',
    iconType: 'red-envelope'
  },
  {
    path: '/home/product',
    title: '产品管理',
    iconType: 'appstore-o'
  },
  {
    path: '/home/reservation',
    title: '系统设置',
    iconType: 'setting'
  },
]

class Home extends PureComponent {

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
    const last = routes.indexOf(route) === routes.length - 1;
    return last ? <span>{route.breadcrumbName}</span> : <Link to={paths.join('/')}>{route.breadcrumbName}</Link>;
  }

  handleNoticeVisibleChange(visible) {
    if (visible) {
      this.props.dispatch({
        type: 'home/fetchReservation',
      });
    }
  }

  onMenuItemClick(item) {
    this.props.history.push(menus[item.key].path)
  }

  renderMenuItem(item, index) {
    if (item.children) {
      return <SubMenu key={index} title={<span><Icon type={item.iconType} /><span>{item.title}</span></span>}>
        {item.children.map((child, index) => {
          return this.renderMenuItem(child, index);
        })}
      </SubMenu>
    }
    return <Menu.Item key={index}>
      <Icon type={item.iconType} />
      <span>{item.title}</span>
    </Menu.Item>
  }

  render() {
    const { location, reservationLoading, reservationList, alertCount } = this.props;
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
          style={{zIndex: '100'}}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo">
            <Link to="/home/dashboard">
              <img src={Logo} alt="error" />
              <h1>御众堂</h1>
            </Link>
          </div>
          <Menu theme="dark" mode="inline" inlineCollapsed={true}
                defaultSelectedKeys={['0']}
                onClick={(item) => this.onMenuItemClick(item)}>
            {
              menus.map((item, index) => {
                return this.renderMenuItem(item, index);
              })
            }
          </Menu>
        </Sider>
        <Layout>
          <Header className='header'>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={() => this.toggleCollapsed()}
            />
            <div className='right'>
              <NoticeIcon
                className='action'
                count={alertCount}
                onItemClick={(item, tabProps) => {
                  console.log(item, tabProps); // eslint-disable-line
                }}
                onPopupVisibleChange={(visible) => {
                  this.handleNoticeVisibleChange(visible)
                }}
                loading={reservationLoading}
                popupAlign={{ offset: [20, - 20] }}
              >
                <NoticeIcon.Tab
                  list={reservationList}
                  title="预约"
                  emptyText="你已查看所有预约"
                  emptyImage={emptyNoticeIcon}
                />
              </NoticeIcon>
            </div>
          </Header>
          <Layout>
            <div className="pageHeader">
              <Breadcrumb className='breadcrumb'>
                {breadcrumbItems}
              </Breadcrumb>
            </div>
            <Content style={{ margin: 24 }}>
              <CustomRoute {...this.props} />
            </Content>
          </Layout>
        </Layout>
        <DealReservationPanel />
        <ProductSelector />
        <CustomerSelector />
        <ReservationSelector />
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return state.get('home').toObject();
}

export default connect(mapStateToProps)(Home);
