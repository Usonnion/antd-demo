import React, { PureComponent } from 'react';
import { Modal, Table, Form, Row, Col, Button, Input } from 'antd';
import { connect } from 'react-redux';

const FormItem = Form.Item;
const Search = Input.Search;

class ProductSelector extends PureComponent {

  state = {
    selectedRowKeys: [],
    selectItems: [],
    searchKey: ''
  }

  componentWillReceiveProps(nextProps) {
    if('modalVisible' in  nextProps) {
      this.setState({
        selectedRowKeys: [],
        selectItems: [],
        searchKey: ''
      })
    }
  }

  searchKeyChange(e) {
    this.setState({ searchKey: e.target.value })
  }

  renderForm() {
    return (
      <Search
        value={this.state.searchKey}
        placeholder="请输入关键字"
        onSearch={value => console.log(value)}
        style={{ marginBottom: '20px' }}
        enterButton
      />
    )
  }

  productSelected() {
    if (this.props.completionAction) {
      this.props.dispatch({
        type: this.props.completionAction,
        payload: this.state.selectItems
      });
    } else {
      this.props.dispatch({
        type: 'home/ProductSelectorModalVisible',
        payload: false,
        completionAction: null
      });
    }
  }

  onSelectChanged(selectedRowKeys, selectItems) {
    this.setState({ selectedRowKeys, selectItems })
  }

  render() {
    const { dispatch, data, modalVisible } = this.props;
    const columns = [{
      title: '商品编码',
      dataIndex: 'no',
      width: 150,
    }, {
      title: '商品名称',
      dataIndex: 'name',
      width: 150,
    }];

    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectItems) => this.onSelectChanged(selectedRowKeys, selectItems),
    };

    return (
      <Modal
        title="商品选择"
        visible={modalVisible}
        closable={false}
        onOk={() => this.productSelected()}
        onCancel={() => {
          dispatch({
            type: 'home/ProductSelectorModalVisible',
            payload: false,
            completionAction: null
          })
        }}>
        {this.renderForm()}
        <Table rowKey={(record) => record.id}
               rowSelection={rowSelection}
               columns={columns}
               loading={false}
               dataSource={data.get('1').toArray()} />
      </Modal>
    )
  }
}

function matchStateToProps(state) {
  return state.get('home').get('productSelector').toObject();
}

export default connect(matchStateToProps)(ProductSelector);
