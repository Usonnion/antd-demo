import React, { PureComponent } from 'react'
import { Card, Table, Select, DatePicker } from 'antd';
import { connect } from 'react-redux';

const Option = Select.Option;
const { RangePicker } = DatePicker;

class OrderRecord extends PureComponent {

  render() {
    const { data, orderRecordLoading } = this.props;
    const columns = [{
      title: '单据编号',
      dataIndex: 'no',
    }, {
      title: '标准金额',
      dataIndex: 'standardAmount',
    },{
      title: '付款金额',
      dataIndex: 'actualAmount',
    },{
      title: '时间',
      dataIndex: 'date',
    }, {
      title: '备注',
      dataIndex: 'comment',
    }];

    return <Card title={<div>消费记录<RangePicker style={{marginLeft: '10px'}}/></div>} bordered={false} style={{ marginTop: '24px' }}>
      <Table rowKey={(record) => record.id}
             columns={columns}
             loading={orderRecordLoading}
             pagination={false}
             dataSource={data.toArray()} />
    </Card>
  }
}

function matchStateToProps(state) {
  return state.get('customer').get('orderRecord').toObject();
}

export default connect(matchStateToProps)(OrderRecord);
