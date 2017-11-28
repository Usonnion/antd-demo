import './index.less';

import React, { PureComponent } from 'react';
import { Row, Col, Card, Tooltip, Icon } from "antd";
import { Spin } from 'antd';

class ProductGrid extends PureComponent {
  render() {
    const { productList, loading } = this.props;
    return <Spin spinning={loading} delay={500}>
      <Row gutter={24}>
        {productList.map((item, index) => <Col key={index} sm={24} md={6} style={{ marginBottom: '20px' }}>
          <Card bodyStyle={{ padding: 0 }} className='productCard'>
            <div onClick={() => this.props.itemClick(item)}>
              <div>
                <img alt="产品图片" src={item.imageUrl} />
              </div>
              <div className="textWrapper">
                <div className="productTitle">
                  <a href="#">{item.title}</a>
                </div>
                <div className="productDescription">
                  {item.description}
                </div>
              </div>
            </div>
            <ul className="action">
              <li onClick={() => this.props.itemEdit(item)}>
                <Tooltip title="修改">
                  <Icon type="edit" />
                </Tooltip>
              </li>
              <li onClick={() => this.props.itemDelete(item)}>
                <Tooltip title="删除">
                  <Icon type="delete" />
                </Tooltip>
              </li>
            </ul>
          </Card>
        </Col>)}
      </Row>
    </Spin>
  }
}

ProductGrid.defaultProps = {
  productList: [],
  loading: false,
  itemEdit: () => {
  },
  itemDelete: () => {
  },
  itemClick: () => {
  }
}

export default ProductGrid;
