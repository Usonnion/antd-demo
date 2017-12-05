import './list.less';

import React, { PureComponent } from 'react';
import { Row, Col, Form, Input, Select, Button, Table, Card, Dropdown, Icon, Menu } from 'antd';
import { connect } from 'react-redux';

const FormItem = Form.Item;
const { Option } = Select;

class ReservationList extends PureComponent {

  state = {
    selectedRowKeys: [],
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'reservation/fetchReservation',
    });
  }

  onSelectChange(selectedRowKeys) {
    this.setState({ selectedRowKeys });
  }

  onPageChange(page, pageSize) {
    this.props.dispatch({
      type: 'reservation/fetchReservation',
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
        type: 'reservation/fetchReservation',
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
            <FormItem label="处理状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">已处理</Option>
                  <Option value="1">未处理</Option>
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

  dealReservation(e, record) {
    e.preventDefault();
    this.props.dispatch({
      type: 'home/dealReservation',
      payload: record
    });
  }

  openReservation(e, record) {
    e.preventDefault();
    this.props.history.push(`/home/reservation/detail/${record.id}`);
  }

  render() {
    const columns = [{
      title: '预约单号',
      dataIndex: 'no',
    }, {
      title: '产品名称',
      dataIndex: 'productTitle',
    },{
      title: '客户名称',
      dataIndex: 'customerName',
    },{
      title: '客户电话',
      dataIndex: 'customerPhone',
    },{
      title: '客户预约时间',
      dataIndex: 'date',
    },{
      title: '确认时间',
      dataIndex: 'confirmDate',
    },{
      title: '操作',
      render: (text, record) => (
        <div>
          <a href="" onClick={(e) => this.openReservation(e, record)}>详情</a>
          <span className="ant-divider" />
          <a href="" onClick={(e) => this.dealReservation(e, record)}>处理</a>
        </div>
      ),
    },];

    const { data, reservationLoading, pageSize, total, current } = this.props;
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
                 loading={reservationLoading}
                 dataSource={data.toArray()}
                 pagination={paginationProps} />
        </div>
      </Card>
    )
  }
}

function matchStateToProps(state) {
  return state.get('reservation').get('list').toObject();
}

export default connect(matchStateToProps)(Form.create()(ReservationList));
