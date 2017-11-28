import './list.less';

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Form, Input, Button, Pagination, DatePicker, Modal } from 'antd';
import ProductGrid from '../../../../components/ProductGrid';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

class ProductList extends PureComponent {
  state = {
    deleteModalVisible: false,
    deleteProduct: {}
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'product/fetchProduct',
    });
  }

  handleSearch(e) {
    e.preventDefault();
    const { dispatch, form, pageSize } = this.props;
    form.validateFields((err, fieldsValue) => {
      dispatch({
        type: 'product/fetchProduct',
        payload: {
          ...fieldsValue,
          current: 1,
          pageSize: pageSize
        }
      })
    });
  }

  handleFormReset() {
    const { form } = this.props;
    form.resetFields();
  }

  addProduct() {
    this.props.history.push('/home/product/edit/-1')
  }

  renderForm() {
    const { getFieldDecorator } = this.props.form;
    const rangeConfig = {
      rules: [{ type: 'array', required: false, message: '请选择时间' }],
    };
    return (
      <Form onSubmit={(e) => this.handleSearch(e)} layout="inline">
        <Row gutter={24}>
          <Col md={8} sm={24} className='formItemWrapper'>
            <FormItem label="产品名称">
              {getFieldDecorator('title')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24} className='formItemWrapper'>
            <FormItem label="产品描述">
              {getFieldDecorator('description')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24} className='formItemWrapper'>
            <FormItem label="创建日期">
              {getFieldDecorator('range-time-picker', rangeConfig)(
                <RangePicker showTime format="YYYY-MM-DD" />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <span className='submitButtons'>
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={() => this.handleFormReset()}>重置</Button>
            </span>
          </Col>
        </Row>
      </Form>
    )
  }

  productEdit(product) {
    this.props.history.push(`/home/product/edit/${product.id}`)
  }

  productDelete(product) {
    Modal.confirm({
      title: '产品删除',
      content: `您确定要删除产品${product.title}`,
      okText: '确认',
      cancelText: '取消',
    });
  }

  onProductClick(product) {
    this.props.history.push(`/home/product/detail/${product.id}`)
  }

  render() {
    const { list, productLoading } = this.props;
    return (
      <div style={{ background: '#fff', padding: '24px' }}>
        <div className='tableListForm'>
          {this.renderForm()}
        </div>
        <div className='tableListOperator'>
          <Button icon="plus" type="primary" onClick={() => this.addProduct()}>新建</Button>
          <Button>批量操作</Button>
        </div>
        <ProductGrid
          productList={list}
          itemEdit={(product) => this.productEdit(product)}
          itemDelete={(product) => this.productDelete(product)}
          itemClick={(product) => this.onProductClick(product)}
          loading={productLoading} />
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Pagination defaultCurrent={6} total={500} />
        </div>
      </div>
    )
  }
}

function matchStateToProps(state) {
  return state.get('product').toObject();
}

export default connect(matchStateToProps)(Form.create()(ProductList));
