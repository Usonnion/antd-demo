import React, { PureComponent } from 'react';
import { Form, Input } from 'antd';

const FormItem = Form.Item;

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

class RechargePanel extends PureComponent {

  handleSubmit(e) {
    e.preventDefault();
  }

  checkAmount(rule, value, callback) {
    if (parseFloat(value || 0) < 0) {
      callback('输入金额必须大于0!');
      return;
    }
    callback();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return <Form onSubmit={(e) => this.handleSubmit(e)}
                 style={{ marginTop: 8 }}>
      <FormItem
        {...formItemLayout}
        label="充值金额"
      >
        {getFieldDecorator('cashAmount', {
          rules: [{
            required: true, message: '请输入充值金额',
          },{
            validator: (rule, value, callback) => this.checkAmount(rule, value, callback)
          }],
        })(
          <Input type="number" />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="赠送金额"
      >
        {getFieldDecorator('presentCashAmount', {
          rules: [{
            required: false, message: '请输入赠送金额',
          },{
            validator: (rule, value, callback) => this.checkAmount(rule, value, callback)
          }],
        })(
          <Input type="number" />
        )}
      </FormItem>
    </Form>
  }
}

export default Form.create()(RechargePanel);
