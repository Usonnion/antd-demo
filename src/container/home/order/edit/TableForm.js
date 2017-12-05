import React, { PureComponent } from 'react';
import { Table, Button, Input, message, Popconfirm } from 'antd';
import './TableForm.less';

export default class TableForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      data: props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      this.setState({
        data: nextProps.value,
      });
    }
  }

  remove(key) {
    this.props.dispatch({
      type: 'order/deleteEditOrderProduct',
      payload: key
    })
  }

  addNewProduct() {
    this.props.dispatch({
      type: 'home/ProductSelectorModalVisible',
      payload: true,
      completionAction: 'order/SelectProductSuccess'
    });
  }

  handleFieldChange(e, fieldName, key) {
    this.props.dispatch({
      type: 'order/editOrderDetailFieldChanged',
      key,
      fieldName: fieldName,
      value: e.target.value,
    });
  }

  render() {
    const columns = [{
      title: '商品编码',
      dataIndex: 'no',
      key: 'no',
      width: '18%'
    }, {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      width: '20%'
    }, {
      title: '数量',
      dataIndex: 'count',
      key: 'count',
      render: (text, record, index) => {
        return (
          <Input
            type='number'
            style={{ width: '200px' }}
            value={text}
            onChange={e => this.handleFieldChange(e, 'count', index)}
            placeholder="数量"
            addonAfter={record.unit}
          />
        );
      },
    }, {
      title: '单价',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record, index) => {
        return (
          <Input
            type='number'
            style={{ width: '200px' }}
            value={text}
            onChange={e => this.handleFieldChange(e, 'amount', index)}
            placeholder="数量"
          />
        );
      },
    }, {
      title: '总价',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (text, record, index) => {
        return record.amount * record.count || 0
      }
    }, {
      title: '操作',
      key: 'action',
      width: '18%',
      render: (text, record, index) => {
        return (
          <span>
            <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(index)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        );
      },
    }];
    return (
      <div>
        <Table rowKey={(record, index) => index}
               columns={columns}
               dataSource={this.state.data}
               pagination={false}
               rowClassName={(record) => {
                 return record.editable ? 'editable' : '';
               }}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={() => this.addNewProduct()}
          icon="plus"
        >
          添加商品
        </Button>
      </div>
    );
  }
}
