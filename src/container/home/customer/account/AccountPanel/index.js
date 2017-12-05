import './index.less';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, Row, Col, Avatar, Button, Modal, Spin } from 'antd';
import RechargePanel from './RechargePanel';
import ChangeAccount from './ChangeAccount';
import IntegralChange from './IntegralChange';
import AccountChangedRecord from '../AccountChangedRecord';

const ButtonGroup = Button.Group;

class AccountPanel extends PureComponent {

  state = {
    modalType: 'recharge'
  };

  submitModalInfo(form) {
    const { dispatch } = this.props;
    form.validateFields((err, values) => {
      if (! err) {
        dispatch({
          type: 'customer/SubmitRechargeInfo',
        });
      }
    });
  }

  visibleModal(modalType) {
    this.setState({ modalType: modalType }, () => {
      // reset form default value
      // if (this.refs.changeAccountPanel) {
      //   const form = this.refs.changeAccountPanel.getForm();
      //   form.resetFields(['accountType', 'amount']);
      // }
      this.props.dispatch({
        type: 'customer/changeVisibleAccountModal',
        payload: true
      });
    });
  }

  render() {
    const { cashAccount, goldCoinAccount, silverCoinAccount, visibleAccountModal, rechargeModalLoading, dispatch, accountLoading } = this.props;

    const modalType = {
      recharge: {
        title: '账户充值',
        initForm: () => {
          if (this.refs.rechargePanel) {
            const form = this.refs.rechargePanel.getForm();
            form.resetFields(['accountType', 'amount']);
          }
        },
        getForm: () => this.refs.rechargePanel.getForm(),
        content: <RechargePanel ref='rechargePanel' />
      },
      changeAccount: {
        title: '账户金额变更',
        initForm: () => {
          if (this.refs.changeAccountPanel) {
            const form = this.refs.changeAccountPanel.getForm();
            form.resetFields(['accountType', 'amount']);
          }
        },
        getForm: () => this.refs.changeAccountPanel.getForm(),
        content: <ChangeAccount ref='changeAccountPanel' />
      },
      withdrawCash: {
        title: '提现',
        initForm: () => {
          if (this.refs.IntegralChange) {
            const form = this.refs.IntegralChange.getForm();
            form.resetFields(['comment', 'amount']);
            // form.setFields({ totalAmount: { value: goldCoinAccount } });
          }
        },
        getForm: () => this.refs.IntegralChange.getForm(),
        content: <IntegralChange ref='IntegralChange' totalAmount={goldCoinAccount} />
      },
      exchange: {
        title: '兑换',
        initForm: () => {
          if (this.refs.IntegralChange) {
            const form = this.refs.IntegralChange.getForm();
            form.resetFields(['comment', 'amount']);
            // form.setFields({ totalAmount: { value: silverCoinAccount } });
          }
        },
        getForm: () => this.refs.IntegralChange.getForm(),
        content: <IntegralChange ref='IntegralChange' totalAmount={silverCoinAccount} />
      }
    }

    const cardAction = <ButtonGroup className="cardActionsGroup">
      <Button type='danger' onClick={() => {
        modalType['changeAccount'].initForm();
        this.visibleModal('changeAccount')
      }}>变更账户金额</Button>
    </ButtonGroup>;
    return <div>
      <Spin delay={500} spinning={accountLoading}>
        <Card title={<div>账户余额{cardAction}</div>} bordered={false} style={{ marginTop: '24px' }}>
          <Row gutter={24}>
            <Col md={8}>
              <Card>
                <div className="accountMetaContent">
                  <div className="metaAvatar">
                    <Avatar size="middle" icon="user" />
                  </div>
                  <h2 className="metaContent">资金账户</h2>
                  <Button className='metaAction' type="primary" onClick={() => {
                    modalType['recharge'].initForm();
                    this.visibleModal('recharge');
                  }}>充值</Button>
                </div>
                <div className="accountAmountContent">
                  {cashAccount}
                </div>
              </Card>
            </Col>
            <Col md={8}>
              <Card>
                <div className="accountMetaContent">
                  <div className="metaAvatar">
                    <Avatar size="middle" icon="user" />
                  </div>
                  <h2 className="metaContent">金币账户</h2>
                  <Button className='metaAction' type="primary" onClick={() => {
                    modalType['withdrawCash'].initForm();
                    this.visibleModal('withdrawCash')
                  }}>提现</Button>
                </div>
                <div className="accountAmountContent">
                  {goldCoinAccount}
                </div>
              </Card>
            </Col>
            <Col md={8}>
              <Card>
                <div className="accountMetaContent">
                  <div className="metaAvatar">
                    <Avatar size="middle" icon="user" />
                  </div>
                  <h2 className="metaContent">银币账户</h2>
                  <Button className='metaAction' type="primary" onClick={() => {
                    modalType['exchange'].initForm();
                    this.visibleModal('exchange')
                  }}>兑换</Button>
                </div>
                <div className="accountAmountContent">
                  {silverCoinAccount}
                </div>
              </Card>
            </Col>
          </Row>

          <Modal
            title={modalType[this.state.modalType].title}
            visible={visibleAccountModal}
            confirmLoading={rechargeModalLoading}
            closable={false}
            onOk={() => {
              this.submitModalInfo(modalType[this.state.modalType].getForm())
            }}
            onCancel={() => {
              dispatch({
                type: 'customer/changeVisibleAccountModal',
                payload: false
              })
            }
            }
          >
            {modalType[this.state.modalType].content}
          </Modal>
        </Card>
      </Spin>
    </div>
  }
}

function matchStateToProps(state) {
  return state.get('customer').get('account').toObject()
}

export default connect(matchStateToProps)(AccountPanel);
