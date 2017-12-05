import React from 'react'
import { Card, Table } from 'antd';
import DescriptionList from '../DescriptionList';

const { Description } = DescriptionList;

const columns = [{
  title: '商品编码',
  dataIndex: 'no',
}, {
  title: '商品名称',
  dataIndex: 'name',
}, {
  title: '厂家限价',
  dataIndex: 'amount',
},{
  title: '数量',
  dataIndex: 'count',
}, {
  title: '单位',
  dataIndex: 'unit',
}, {
  title: '单价',
  dataIndex: 'amount',
}, {
  title: '总价',
  dataIndex: 'totalAmount',
}];

const OrderProductList = (props) => <Card title='消费产品明细' bordered={false} style={{ marginTop: '24px' }}>
  <Table rowKey={(record) => record.no}
         columns={columns}
         dataSource={props.productList}
         pagination={false} />
</Card>

export default OrderProductList;
