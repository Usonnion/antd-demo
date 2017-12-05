import React, { PureComponent } from 'react';
import { Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;

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

  render() {
    const { getFieldDecorator } = this.props.form;
    return <Form onSubmit={(e) => this.handleSubmit(e)}
                 style={{ marginTop: 8 }}>
      <FormItem
        {...formItemLayout}
        label="账户类型"
      >
        {getFieldDecorator('accountType', {
          rules: [{
            required: true, message: '请选择账户类型',
          }],
        })(
          <Select
            showSearch
            placeholder="请选择账户类型"
          >
            <Option value="1">现金账户</Option>
            <Option value="2">金币账户</Option>
            <Option value="3">银币账户</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="变更金额"
      >
        {getFieldDecorator('amount', {
          rules: [{
            required: true, message: '请输入赠送金额',
          }],
        })(
          <Input type="number" />
        )}
      </FormItem>
      <FormItem
        {...formItemLayout}
        label="变更说明"
      >
        {getFieldDecorator('comment', {
          rules: [{
            required: true, message: '请输入变更说明',
          }],
        })(
          <TextArea style={{ minHeight: 32 }} placeholder="请输入变更说明" rows={4} />
        )}
      </FormItem>
    </Form>
  }
}

export default Form.create()(RechargePanel);
