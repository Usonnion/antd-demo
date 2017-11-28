import './detail.less';
import React, { PureComponent } from 'react';
import { Button, Row, Col, Card } from 'antd';
import { connect } from 'react-redux';
import DescriptionList from '../../../../components/DescriptionList';

const ButtonGroup = Button.Group;
const { Description } = DescriptionList;

const action = (
  <div>
    <ButtonGroup>
      <Button>修改</Button>
      <Button>删除</Button>
    </ButtonGroup>
  </div>
);

const description = (
  <DescriptionList className='headerList' size="small" col="2">
    <Description term="创建人">王友生</Description>
    <Description term="创建时间">2017-07-07</Description>
    <Description term="生效日期">2017-07-07 ~ 2017-08-08</Description>
    <Description term="产品描述">送精油两瓶</Description>
    <Description term="备注">请于两个工作日内确认</Description>
  </DescriptionList>
);

const extra = (
  <Row>
    <Col xs={48} sm={48}>
      <div className='textSecondary'>订购次数</div>
      <div className='heading'>200</div>
    </Col>
  </Row>
);

class ProductDetail extends PureComponent {
  render() {
    return (
      <div>
        <div className='productDetailPageHeader'>
          <div className='productDetailLogo'>
            <img alt=""
                 src="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" />
          </div>
          <div className='productDetailMain'>
            <div className='productDetailRow'>
              <h1 className='productDetailTitle'>spa</h1>
              <div className='productDetailAction'>{action}</div>
            </div>
            <div className='productDetailRow'>
              <div className='productDetailContent'>{description}</div>
              <div className='productDetailExtraContent'>{extra}</div>
            </div>
          </div>
        </div>
        <Card title="产品展示" bordered={false} style={{marginTop: '24px'}}>
          <Row gutter={24}>
            <Col md={8}>
              <img alt="产品图片" style={{width: '100%',marginBottom: '24px'}} src='https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png' />
            </Col>
            <Col md={8}>
              <img alt="产品图片" style={{width: '100%', marginBottom: '24px'}} src='https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png' />
            </Col>
            <Col md={8}>
              <img alt="产品图片" style={{width: '100%', marginBottom: '24px'}} src='https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png' />
            </Col>
            <Col md={8}>
              <img alt="产品图片" style={{width: '100%', marginBottom: '24px'}} src='https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png' />
            </Col>
            <Col md={8}>
              <img alt="产品图片" style={{width: '100%', marginBottom: '24px'}} src='https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png' />
            </Col>
          </Row>
        </Card>
      </div>
    )
  }
}

function matchStateToProps(state) {
  return state.get('product').get('detail').toObject();
}

export default connect(matchStateToProps)(ProductDetail);
