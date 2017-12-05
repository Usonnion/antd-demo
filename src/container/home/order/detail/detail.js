import './detail.less';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../../../../components/PageHeader';
import DescriptionList from '../../../../components/DescriptionList';
import { Button, Row, Col, Card, Table } from 'antd';
import CustomerInfo from '../../../../components/CustomerInfo';
import OrderProductList from '../../../../components/OrderProductList';

const { Description } = DescriptionList;

class Order extends PureComponent {

  render() {
    const { productList } = this.props;
    const description = (
      <DescriptionList className='headerList' size="small" col="2">
        <Description term="客户名称">王友生</Description>
        <Description term="标准金额">100000</Description>
        <Description term="消费日期">2017-5-6</Description>
        <Description term="备注">客户非常满意</Description>
      </DescriptionList>
    );

    const extra = (
      <Row>
        <Col xs={48} sm={48}>
          <div className='textSecondary'>消费金额</div>
          <div className='heading'>2000</div>
        </Col>
      </Row>
    );

    return (
      <div>
        <PageHeader
          title='254698965'
          description={description}
          extra={extra}
          logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
        />
        <OrderProductList productList={productList.toArray()} />
        <CustomerInfo />
        <Card title='相关预约单' bordered={false} style={{ marginTop: '24px' }}>
          <DescriptionList style={{ marginBottom: 24 }}>
            <Description term="预约单号">256365998</Description>
            <Description term="预约时间">2017-8-9 8:00</Description>
            <Description term="确认时间">2017-8-9 8:00</Description>
            <Description term="备注">客户准时到店</Description>
          </DescriptionList>
        </Card>
      </div>
    )
  }
}

function matchStateToProps(state) {
  return state.get('order').get('detail').toObject();
}

export default connect(matchStateToProps)(Order);
