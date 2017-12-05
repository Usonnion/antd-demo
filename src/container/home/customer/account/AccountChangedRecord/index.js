import React, { PureComponent } from 'react'
import { Card, Table, Select, DatePicker } from 'antd';
import { connect } from 'react-redux';

const Option = Select.Option;
const { RangePicker } = DatePicker;

class AccountChangedRecord extends PureComponent {

  render() {
    const { data } = this.props;
    const columns = [{
      title: '账户类型',
      dataIndex: 'type',
    }, {
      title: '变更金额',
      dataIndex: 'amount',
    }, {
      title: '变更类型',
      dataIndex: 'changedType',
    }, {
      title: '日期',
      dataIndex: 'date',
    }, {
      title: '备注',
      dataIndex: 'comment',
    }];

    const accountTypeSelect = <Select
      showSearch
      defaultValue=""
      style={{width: '200px', float: 'right', marginTop: '10px'}}
      placeholder="请选择账户类型"
    >
      <Option value="">全部账户</Option>
      <Option value="1">现金账户</Option>
      <Option value="2">金币账户</Option>
      <Option value="3">银币账户</Option>
    </Select>

    return <Card title={<div>账户变更记录<RangePicker style={{marginLeft: '10px'}}/>{accountTypeSelect}</div>} bordered={false} style={{ marginTop: '24px' }}>
      <Table rowKey={(record) => record.id}
             columns={columns}
             loading={false}
             pagination={false}
             dataSource={data.toArray()} />
    </Card>
  }
}

function matchStateToProps(state) {
  return state.get('customer').get('accountChangeRecord').toObject();
}

export default connect(matchStateToProps)(AccountChangedRecord);
