import React from 'react'
import { Card } from 'antd';
import DescriptionList from '../DescriptionList';

const { Description } = DescriptionList;

const ReservationInfo = (props) => <Card title='客户信息' bordered={false} style={{ marginTop: '24px' }}>
  <DescriptionList style={{ marginBottom: 24 }}>
    <Description term="预约单号">256365998</Description>
    <Description term="预约时间">2017-8-9 8:00</Description>
    <Description term="确认时间">2017-8-9 8:00</Description>
    <Description term="备注">客户准时到店</Description>
  </DescriptionList>
  { props.extra && props.extra }
</Card>

export default ReservationInfo;

