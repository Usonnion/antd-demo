import './list.less';

import React, { PureComponent } from 'react';
import { Row, Col, Form, Input, Select, Button, Table, Card, Dropdown, Icon } from 'antd';
import { connect } from 'react-redux';

const FormItem = Form.Item;
const { Option } = Select;

class OrderList extends PureComponent {

  state = {
    selectedRowKeys: [],
  };

  componentDidMount() {
    this.props.dispatch({
      type: '',
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
      dispatch({
        type: '',
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
            <FormItem label="消费日期">
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

  openReservation(e, record) {
    e.preventDefault();
    this.props.history.push(`/home/order/detail/${record.id}`);
  }

  addNewOrder() {
    this.props.history.push(`/home/order/edit/-1`);
  }

  render() {
    const columns = [{
      title: '消费单号',
      dataIndex: 'no',
    },{
      title: '客户名称',
      dataIndex: 'customerName',
    },{
      title: '客户电话',
      dataIndex: 'customerPhone',
    },{
      title: '客户微信号',
      dataIndex: 'customerWechat',
    },{
      title: '标准金额',
      dataIndex: 'standardAmount',
    },{
      title: '付款金额',
      dataIndex: 'actualAmount',
    },{
      title: '消费日期',
      dataIndex: 'date',
    },{
      title: '操作',
      render: (text, record) => (
        <div>
          <a href="" onClick={(e) => this.openReservation(e, record)}>详情</a>
        </div>
      ),
    },];

    const { data, orderLoading, pageSize, total, current } = this.props;
    const paginationProps = {
      current: current,
      pageSize: pageSize,
      total: total,
      onChange: (page, pageSize) => this.onPageChange(page, pageSize)
    };

    return (
      <Card>
        <div className='tableList'>
          <div className='tableListForm' style={{marginBottom: '20px'}}>
            {this.renderForm()}
          </div>
          <div className='tableListOperator'>
            <Button icon="plus" type="primary" onClick={() => this.addNewOrder()}>新建</Button>
          </div>
          <Table rowKey={(record) => record.id}
                 columns={columns}
                 loading={orderLoading}
                 dataSource={data.toArray()}
                 pagination={paginationProps} />
        </div>
      </Card>
    )
  }
}

function matchStateToProps(state) {
  return state.get('order').get('list').toObject();
}

export default connect(matchStateToProps)(Form.create()(OrderList));
