import React, { PureComponent } from 'react'
import { Card, Table, Select, DatePicker } from 'antd';
import { connect } from 'react-redux';

const Option = Select.Option;
const { RangePicker } = DatePicker;

class ReservationRecord extends PureComponent {

  dealReservation(e, record) {
    e.preventDefault();
    this.props.dispatch({
      type: 'home/dealReservation',
      payload: record
    });
  }

  render() {
    const { data, reservationLoading } = this.props;
    const columns = [{
      title: '项目名称',
      dataIndex: 'productName',
    }, {
      title: '预约时间',
      dataIndex: 'date',
    },{
      title: '确认时间',
      dataIndex: 'confirmDate',
    },{
      title: '处理状态',
      dataIndex: 'status',
    }, {
      title: '备注',
      dataIndex: 'comment',
    },{
      title: '操作',
      render: (text, record) => (
        <div>
          <a href="">详情</a>
          <span className="ant-divider" />
          <a href="" onClick={(e) => this.dealReservation(e, record)}>处理</a>
        </div>
      ),
    }];

    const accountTypeSelect = <Select
      showSearch
      defaultValue=""
      style={{width: '200px', float: 'right', marginTop: '10px'}}
      placeholder="请选择预约状态"
    >
      <Option value="">全部</Option>
      <Option value="1">未处理</Option>
      <Option value="2">已处理</Option>
      <Option value="3">已完成</Option>
    </Select>

    return <Card title={<div>预约记录<RangePicker style={{marginLeft: '10px'}}/>{accountTypeSelect}</div>} bordered={false} style={{ marginTop: '24px' }}>
      <Table rowKey={(record, index) => record.id}
             columns={columns}
             loading={reservationLoading}
             pagination={false}
             dataSource={data.toArray()} />
    </Card>
  }
}

function matchStateToProps(state) {
  return state.get('customer').get('reservationRecord').toObject();
}

export default connect(matchStateToProps)(ReservationRecord);
