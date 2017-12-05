import React, { PureComponent } from 'react';
import { Form, Input } from 'antd';

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

class IntegralChange extends PureComponent {

  componentWillReceiveProps(newProps) {
    const { getFieldValue, setFieldsValue  } = this.props.form;
    if (newProps.totalAmount !== getFieldValue('totalAmount')) {
      setFieldsValue({totalAmount: newProps.totalAmount})
    }
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  checkAmount(rule, value, callback) {
    const { totalAmount } = this.props;
    if (parseFloat(value || 0) > parseFloat(totalAmount)) {
      callback('输入金额不能大于总金额!');
      return;
    }
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
        label="总金额"
      >
        {getFieldDecorator('totalAmount', {
          rules: [{
            required: false, message: '请输入金额',
          }],
        })(
          <Input type="number" disabled />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="金额"
      >
        {getFieldDecorator('amount', {
          rules: [{
            required: true, message: '请输入金额',
          },{
            validator: (rule, value, callback) => this.checkAmount(rule, value, callback)
          }],
        })(
          <Input type="number" />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="说明"
      >
        {getFieldDecorator('comment', {
          rules: [{
            required: false, message: '说明',
          }],
        })(
          <TextArea style={{ minHeight: 32 }} placeholder="请输入说明" rows={4} />
        )}
      </FormItem>
    </Form>
  }
}

export default Form.create()(IntegralChange);
