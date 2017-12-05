import React, { PureComponent } from 'react';
import { Form, Input, DatePicker, Modal } from 'antd';
import { connect } from 'react-redux';
import moment from 'moment';

const FormItem = Form.Item;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

class DealReservationPanel extends PureComponent {

  componentWillReceiveProps(newProps) {
    if (this.props.reservation.no !== newProps.no) {
      this.props.form.resetFields(['confirmDate', 'comment'])
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { reservation, modalVisible, submitDealReservation, dispatch } = this.props;
    const { getFieldDecorator } = this.props.form;
    return <Modal
      title="预约单处理"
      visible={modalVisible}
      confirmLoading={submitDealReservation}
      closable={false}
      onOk={() => {
      }}
      onCancel={() => {
        dispatch({
          type: 'home/DealReservationModalVisible',
          payload: false
        })
      }}>
      <Form onSubmit={(e) => this.handleSubmit(e)}
            style={{ marginTop: 8 }}>
        <FormItem
          {...formItemLayout}
          label="预约单号"
        >
          <Input value={reservation.get('no')} disabled />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="微信号"
        >
          <Input value={reservation.get('customerWechat')} disabled />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="姓名"
        >
          <Input value={reservation.get('customerName')} disabled />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="手机"
        >
          <Input value={reservation.get('customerPhone')} disabled />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="预约时间"
        >
          <Input value={reservation.get('date')} disabled />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="确认时间"
        >
          {getFieldDecorator('confirmDate', {
            rules: [{
              required: false, message: '',
            }],
          })(
            <DatePicker placeholder="请选择确认时间" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="备注"
        >
          {getFieldDecorator('comment', {
            rules: [{
              required: false, message: '请输入备注',
            }],
          })(
            <TextArea style={{ minHeight: 32 }} placeholder="请输入备注" rows={4} />
          )}
        </FormItem>
      </Form>
    </Modal>
  }
}

function matchStateToProps(state) {
  return state.get('home').get('dealReservation').toObject();
}

export default connect(matchStateToProps)(Form.create()(DealReservationPanel));
