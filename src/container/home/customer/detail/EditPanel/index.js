import React, { PureComponent } from 'react';
import { Form, Input, DatePicker } from 'antd';
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

class EditPanel extends PureComponent {

  componentDidMount() {
    const { customerInfo, form } = this.props;
    form.setFields({
      'wechat': {
        value: customerInfo.get('wechat')
      },
      'name': {
        value: customerInfo.get('name')
      },
      'phone': {
        value: customerInfo.get('phone')
      },
      'address': {
        value: customerInfo.get('address')
      },
      'birthday': {
        value: moment(customerInfo.get('birthday'))
      },
      'comment': {
        value: customerInfo.get('comment')
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return <Form onSubmit={(e) => this.handleSubmit(e)}
                 style={{ marginTop: 8 }}>
      <FormItem
        {...formItemLayout}
        label="微信号"
      >
        {getFieldDecorator('wechat', {
          rules: [{
            required: false, message: '请输入微信号',
          }],
        })(
          <Input disabled />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="姓名"
      >
        {getFieldDecorator('name', {
          rules: [{
            required: true, message: '请输入姓名',
          }],
        })(
          <Input placeholder="请输入姓名" />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="手机号"
      >
        {getFieldDecorator('phone', {
          rules: [{
            required: true, message: '请输入手机号',
          }],
        })(
          <Input placeholder="请输入手机号" />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="生日"
      >
        {getFieldDecorator('birthday', {
          rules: [{ type: 'object', required: false, message: 'Please select time!' }],
        })(
          <DatePicker showToday={false} />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="地址"
      >
        {getFieldDecorator('address', {
          rules: [{
            required: false, message: '请输入地址',
          }],
        })(
          <TextArea style={{ minHeight: 32 }} placeholder="请输入地址" rows={4} />
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
  }
}

export default Form.create()(EditPanel);
