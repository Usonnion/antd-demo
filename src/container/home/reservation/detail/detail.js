import './detail.less';

import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import { Button, Row, Col, Card, Steps, Icon, Popover, Badge } from 'antd';
import PageHeader from '../../../../components/PageHeader';
import DescriptionList from '../../../../components/DescriptionList';
import CustomerInfo from '../../../../components/CustomerInfo';
import { reservationStatusMapping, getStatusMappingTitleByKey } from '../../../../common/const';

const { Step } = Steps;
const ButtonGroup = Button.Group;
const { Description } = DescriptionList;

const action = (
  <div>
    <ButtonGroup>
      <Button type='primary'>处理</Button>
    </ButtonGroup>
  </div>
);

const desc1 = (
  <div className='textSecondary stepDescription'>
    <div>
      曲丽丽
      <Icon type="dingding-o" style={{ marginLeft: 8 }} />
    </div>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div className='stepDescription'>
    <div>
      周毛毛
      <Icon type="dingding-o" style={{ color: '#00A0E9', marginLeft: 8 }} />
    </div>
    <div><a href="">催一下</a></div>
  </div>
);

const popoverContent = (
  <div style={{ width: 160 }}>
    吴加号
    <span className='textSecondary' style={{ float: 'right' }}>
      <Badge status="default" text={<span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>未响应</span>} />
    </span>
    <div className='textSecondary' style={{ marginTop: 4 }}>耗时：2小时25分钟</div>
  </div>
);

const customDot = (dot, { status }) => (status === 'process' ?
    <Popover placement="topLeft" arrowPointAtCenter content={popoverContent}>
      {dot}
    </Popover>
    : dot
);

class Detail extends PureComponent {
  render() {
    const { reservationBasicInfo } = this.props;
    const description = (
      <DescriptionList className='headerList' size="small" col="2">
        <Description term="预约项目">{reservationBasicInfo.get('productTitle')}</Description>
        <Description term="预约时间">{reservationBasicInfo.get('date')}</Description>
        <Description term="客户名称">{reservationBasicInfo.get('customerName')}</Description>
        <Description term="客户微信号">{reservationBasicInfo.get('customerWechat')}</Description>
        <Description term="客户电话">{reservationBasicInfo.get('customerPhone')}</Description>
        <Description term="备注">{reservationBasicInfo.get('comment')}</Description>
      </DescriptionList>
    );

    const extra = (
      <Row>
        <Col xs={48} sm={48}>
          <div className='textSecondary'>单据状态</div>
          <div className='heading'>{getStatusMappingTitleByKey(reservationStatusMapping, reservationBasicInfo.get('status'))}</div>
        </Col>
      </Row>
    );

    return <div>
      <PageHeader
        title={reservationBasicInfo.get('no')}
        action={action}
        description={description}
        extra={extra}
        logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
      />
      <Card title='流程进度' bordered={false} style={{ marginTop: '24px' }}>
        <Steps current={0}>
          <Step title="项目预约" description={reservationBasicInfo.get('date')}/>
          <Step title="预约确认" />
          <Step title="到店消费" />
          <Step title="完成" />
        </Steps>
      </Card>
      <CustomerInfo />
      <Card title='消费单' bordered={false} style={{ marginTop: '24px' }}>
        <DescriptionList style={{ marginBottom: 24 }}>
          <Description term="标准金额">5000</Description>
          <Description term="付款金额">2000</Description>
          <Description term="赠送积分">200</Description>
        </DescriptionList>
      </Card>
    </div>
  }
}

function matchStateTopProps(state) {
  return state.get('reservation').get('detail').toObject();
}

export default connect(matchStateTopProps)(Detail);
