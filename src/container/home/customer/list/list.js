import './list.less';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { customerStatusMapping } from '../../../../common/const';
import { Row, Col, Form, Input, Select, Button, Table, Card, Dropdown, Icon, Menu } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

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
                  <Option value="">全部</Option>
                  <Option value={customerStatusMapping.unverified.key}>{customerStatusMapping.unverified.title}</Option>
                  <Option value={customerStatusMapping.verified.key}>{customerStatusMapping.verified.title}</Option>
                  <Option value={customerStatusMapping.partner.key}>{customerStatusMapping.partner.title}</Option>
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

  verifiedCustomer(e, record) {
    e.preventDefault();
    console.log(record)
  }

  render() {
    const { data, customerLoading, pageSize, total, current } = this.props;
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      getCheckboxProps: (record) => ({
        disabled: record.status !== customerStatusMapping.unverified.key,
      }),
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys) => this.onSelectChange(selectedRowKeys),
    };

    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      width: 100,
      fixed: 'left'
    }, {
      title: '微信号',
      dataIndex: 'wechat',
    }, {
      title: '手机号',
      dataIndex: 'phone',
    }, {
      title: '会员角色',
      dataIndex: 'role',
    }, {
      title: '注册日期',
      dataIndex: 'registerDate',
    }, {
      title: '推荐人',
      dataIndex: 'referee',
    }, {
      title: '备注',
      dataIndex: 'comment',
    }, {
      title: '操作',
      width: 100,
      fixed: 'right',
      render: (text, record) => {
        return <div>
          {
            record.status === customerStatusMapping.unverified.key && <div style={{display: 'inline-block'}}>
              <a href="" onClick={(e) => this.verifiedCustomer(e, record)}>审批</a>
              <span className="ant-divider" />
            </div>
          }
          <Link to={`/home/customer/detail/${record.id}`}>详情</Link>
        </div>
      }
    }];
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
                    <Button>批量审批</Button>
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
                 scroll={{ x: 1300 }}
                 rowSelection={rowSelection}
                 columns={columns}
                 loading={customerLoading}
                 dataSource={data.toArray()}
                 pagination={paginationProps} />
        </div>
      </Card>
    )
  }
}

function matchStateToProps(state) {
  return state.get('customer').get('list').toObject();
}

export default connect(matchStateToProps)(Form.create()(CustomerList));
