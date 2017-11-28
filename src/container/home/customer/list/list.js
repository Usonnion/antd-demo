import './list.less';

import React, { PureComponent } from 'react';
import { Row, Col, Form, Input, Select, Button, Table, Card, Dropdown, Icon, Menu } from 'antd';
import { connect } from 'react-redux';

const FormItem = Form.Item;
const { Option } = Select;

const columns = [{
  title: '姓名',
  dataIndex: 'name',
}, {
  title: '微信号',
  dataIndex: 'age',
}, {
  title: '地址',
  dataIndex: 'address',
}];

class CustomerList extends PureComponent {

  state = {
    selectedRowKeys: [],
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'customer/fetchCustomer',
    });
  }

  onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }

  onPageChange(page, pageSize) {
    this.props.dispatch({
      type: 'customer/fetchCustomer',
    });
  }

  handleFormReset() {
    const { form } = this.props;
    form.resetFields();
  }

  handleSearch(e) {
    e.preventDefault();
    const { dispatch, form, pageSize } = this.props;
    form.validateFields((err, fieldsValue) => {
      console.log(fieldsValue);
      dispatch({
        type: 'customer/fetchCustomer',
        payload: {
          ...fieldsValue,
          current: 1,
          pageSize: pageSize
        }
      })
    });
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={(e) => this.handleSearch(e)} layout="inline">
        <Row gutter={24}>
          <Col md={8} sm={24} className='formItemWrapper'>
            <FormItem label="微信昵称">
              {getFieldDecorator('wechat')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24} className='formItemWrapper'>
            <FormItem label="微信账号">
              {getFieldDecorator('wechatAccount')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24} className='formItemWrapper'>
            <FormItem label="手机账号">
              {getFieldDecorator('phone')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24} className='formItemWrapper'>
            <FormItem label="会员状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">审核</Option>
                  <Option value="1">未审核</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <span className='submitButtons'>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={() => this.handleFormReset()}>重置</Button>
            </span>
          </Col>
        </Row>
      </Form>
    )
  }

  handleMenuClick() {

  }

  render() {
    const { list, customerLoading, pageSize, total, current } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys) => this.onSelectChange(selectedRowKeys),
    };
    const paginationProps = {
      current: current,
      pageSize: pageSize,
      total: total,
      onChange: (page, pageSize) => this.onPageChange(page, pageSize)
    };
    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    );

    return (
      <Card>
        <div className='tableList'>
          <div className='tableListForm'>
            {this.renderForm()}
          </div>
          <div className='tableListOperator'>
            {
              selectedRowKeys.length > 0 && (
                <span>
                    <Button>批量操作</Button>
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </span>
              )
            }
          </div>
          <Table rowKey={(record) => record.id}
                 rowSelection={rowSelection}
                 columns={columns}
                 loading={customerLoading}
                 dataSource={list.toArray()}
                 pagination={paginationProps} />
        </div>
      </Card>
    )
  }
}

function matchStateToProps(state) {
  return state.get('customer').toObject();
}

export default connect(matchStateToProps)(Form.create()(CustomerList));
