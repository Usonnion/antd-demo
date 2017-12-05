import React, { PureComponent } from 'react';
import { Button, Card, Form, Input, Row, Col } from 'antd';
import { connect } from 'react-redux';
import CustomerInfo from '../../../../components/CustomerInfo';
import ReservationInfo from '../../../../components/ReservationInfo';
import TableForm from './TableForm'
import PageHeader from '../../../../components/PageHeader';
import FooterToolbar from '../../../../components/FooterToolbar';

const ButtonGroup = Button.Group;
const FormItem = Form.Item;
const { TextArea } = Input;

class EditOrder extends PureComponent {

  state = {
    customerInfo: null
  }

  addCustomer() {
    this.props.dispatch({
      type: 'home/CustomerSelectorModalVisible',
      payload: true,
      completionAction: 'order/SelectCustomerSuccess',
    });
  }

  addReservation() {
    this.props.dispatch({
      type: 'home/ReservationSelectorModalVisible',
      payload: true,
      completionAction: 'order/SelectReservationSuccess',
    })
  }

  render() {
    const { productList, customerInfo, reservation } = this.props;

    return <div>
      <PageHeader
        title='新增消费单'
        logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
      />
      {
        customerInfo ? <CustomerInfo extra={<Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={() => this.addCustomer()}
          icon="plus"
        >
          更换会员
        </Button>} /> : <Card title='客户信息' bordered={false} style={{ marginTop: '24px' }}>
          <Button
            style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
            type="dashed"
            onClick={() => this.addCustomer()}
            icon="plus"
          >
            添加会员
          </Button>
        </Card>
      }
      {
        reservation ? <ReservationInfo extra={<Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={() => this.addReservation()}
          icon="plus"
        >
          更换预约单
        </Button>} /> : <Card title='预约单' bordered={false} style={{ marginTop: '24px' }}>
          <Button
            style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
            type="dashed"
            onClick={() => this.addReservation()}
            icon="plus"
          >
            添加预约单
          </Button>
        </Card>
      }
      <Card title='商品信息' bordered={false} style={{ marginTop: '24px' }}>
        <TableForm value={productList.toArray()} dispatch={(action) => this.props.dispatch(action)} />
      </Card>
      <Card style={{ marginTop: '24px', marginBottom: '40px' }}>
        {/*<FormItem label="备注" style={{display: 'flex', margin: 0}}>*/}
        <div style={{ display: 'flex' }}>
          <label style={{ width: '40px' }}>备注:</label>
          <TextArea placeholder="请输入" />
        </div>
        {/*</FormItem>*/}
      </Card>
      <FooterToolbar>
        <Button type="primary" loading={false}>
          提交
        </Button>
      </FooterToolbar>
    </div>
  }
}

function matchStateToProps(state) {
  return state.get('order').get('editOrder').toObject();
}

export default connect(matchStateToProps)(EditOrder);
