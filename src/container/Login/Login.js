import './login.css';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Checkbox } from 'antd'

const FormItem = Form.Item;

class Login extends PureComponent {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (! err) {
        this.props.dispatch({
          type: 'login/accountSubmit',
          payload: values,
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { submitting } = this.props;
    return <div className="login-wrapper">
      <div className="login-header">
        <span className="login-title">Ant Design</span>
      </div>
      <Form onSubmit={this.handleSubmit}
            className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" loading={submitting} htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    </div>
  }
}

const WrappedNormalLoginForm = Form.create()(Login);

const mapStateToProps = (state) => {
  return state.get('login').toObject();
}

export default connect(mapStateToProps)(WrappedNormalLoginForm);
