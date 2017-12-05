import React from 'react'
import { Card } from 'antd';
import DescriptionList from '../DescriptionList';

const { Description } = DescriptionList;

const CustomerInfo = (props) => <Card title='客户信息' bordered={false} style={{ marginTop: '24px' }}>
  <DescriptionList style={{ marginBottom: 24 }}>
    <Description term="客户姓名">王友生</Description>
    <Description term="微信号">2323644</Description>
    <Description term="手机号">18801615551</Description>
    <Description term="账户余额">300</Description>
    <Description term="金币余额">0</Description>
    <Description term="银币余额">800</Description>
    <Description term="注册日期">2017-8-9</Description>
  </DescriptionList>
  { props.extra && props.extra }
</Card>

export default CustomerInfo;

