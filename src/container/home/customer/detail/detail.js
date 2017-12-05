import './detail.less';

import EditPanel from './EditPanel';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { Button, Row, Col, Modal } from 'antd';
import PageHeader from '../../../../components/PageHeader';
import CustomRoute from '../../../../components/customRoute';
import DescriptionList from '../../../../components/DescriptionList';
import { customerStatusMapping, getStatusMappingTitleByKey } from '../../../../common/const';

const ButtonGroup = Button.Group;
const { Description } = DescriptionList;

const tabList = [{
  key: '',
  tab: '账户信息',
}, {
  key: '/consumption',
  tab: '消费信息',
}];


class CustomerDetail extends PureComponent {

  editCustomerBasicInfo() {
    this.props.dispatch({
      type: 'customer/changeVisibleEditModal',
      payload: true
    })
  }

  submitCustomerBasicInfo() {
    const { customerInfo, dispatch } = this.props;
    const form = this.refs.editPanel.getForm();
    form.validateFields((err, values) => {
      values.birthday = values.birthday.format('YYYY-MM-DD');
      if (! err) {
        dispatch({
          type: 'customer/submitCustomerInfo',
          payload: { ...values, ...{ id: customerInfo.get('id') } }
        })
      }
    });
  }

  renderAction(customerInfo) {
    const status = customerInfo.get('status');
    return <div>
      <ButtonGroup>
        <Button onClick={() => this.editCustomerBasicInfo()}>修改</Button>
        {status === customerStatusMapping.unverified.key && <Button>会员确认</Button>}
        {status !== customerStatusMapping.partner.key && <Button>成为伙伴</Button>}
        <Button>删除</Button>
      </ButtonGroup>
      <Button type="primary">消费</Button>
    </div>
  }

  renderBasicInfo(customerInfo) {
    return <DescriptionList className='headerList' size="small" col="2">
      <Description term="手机号">{customerInfo.get('phone')}</Description>
      <Description term="微信号">{customerInfo.get('wechat')}</Description>
      <Description term="生日">{customerInfo.get('birthday')}</Description>
      <Description term="注册日期">{customerInfo.get('registerDate')}</Description>
      <Description term="地址">{customerInfo.get('address')}</Description>
      <Description term="备注">{customerInfo.get('comment')}</Description>
    </DescriptionList>
  }

  renderExtra(customerInfo) {
    return <Row>
      <Col xs={24} sm={12}>
        <div className='textSecondary'>推荐人</div>
        <div className='heading'>{customerInfo.get('referee')}</div>
      </Col>
      <Col xs={24} sm={12}>
        <div className='textSecondary'>会员角色</div>
        <div className='heading'>{getStatusMappingTitleByKey(customerStatusMapping, customerInfo.get('status'))}</div>
      </Col>
    </Row>
  }

  tabChange(key) {
    const { history, match } = this.props;
    history.push(`${match.url}${key}`);
  }

  render() {
    const { customerInfo, visibleEditModal, dispatch, editModalLoading } = this.props;
    return <div>
      <PageHeader title={customerInfo.get('name')}
                  action={this.renderAction(customerInfo)}
                  description={this.renderBasicInfo(customerInfo)}
                  extra={this.renderExtra(customerInfo)}
                  tabList={tabList}
                  onTabChange={(key) => this.tabChange(key)} />
      <div className="customerDetailContent">
        <CustomRoute {...this.props} />
      </div>
      <Modal
        title="修改会员信息"
        visible={visibleEditModal}
        confirmLoading={editModalLoading}
        closable={false}
        onOk={() => {
          this.submitCustomerBasicInfo()
        }}
        onCancel={() => {
          dispatch({
            type: 'customer/changeVisibleEditModal',
            payload: false
          })
        }}
      >
        <EditPanel ref='editPanel' customerInfo={customerInfo} />
      </Modal>
    </div>
  }
}

function matchStateToProps(state) {
  return state.get('customer').get('detail').toObject();
}

export default connect(matchStateToProps)(CustomerDetail)
