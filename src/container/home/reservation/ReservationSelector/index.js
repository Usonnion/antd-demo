import React, { PureComponent } from 'react';
import { Modal, Table, Form, Row, Col, Button, Input } from 'antd';
import { connect } from 'react-redux';

const FormItem = Form.Item;
const Search = Input.Search;

class ReservationSelector extends PureComponent {

  state = {
    selectedRowKeys: [],
    selectItems: [],
    searchKey: ''
  };

  // 当页面弹出或者是展示时，重置选择项
  componentWillReceiveProps(nextProps) {
    if ('modalVisible' in nextProps) {
      this.setState({
        selectedRowKeys: [],
        selectItems: [],
        searchKey: ''
      });
    }
  }

  onReservationSelect() {
    if (this.props.completionAction) {
      this.props.dispatch({
        type: this.props.completionAction,
        payload: this.state.selectItems
      });
    } else {
      this.props.dispatch({
        type: 'home/ReservationSelectorModalVisible',
        payload: false,
        completionAction: null
      });
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
        onChange={(e) => this.searchKeyChange(e)}
        onSearch={value => console.log(value)}
        style={{ marginBottom: '20px' }}
        enterButton
      />
    )
  }

  onSelectChanged(selectedRowKeys, selectItems) {
    this.setState({
      selectedRowKeys: [selectedRowKeys[selectedRowKeys.length - 1]],
      selectItems: [selectItems[selectItems.length - 1]]
    })
  }

  render() {
    const { dispatch, data, modalVisible } = this.props;
    const columns = [{
      title: '预约单号',
      dataIndex: 'no',
    }, {
      title: '客户名称',
      dataIndex: 'customerName',
    }, {
      title: '确认时间',
      dataIndex: 'date',
    }];

    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      onChange: (selectedRowKeys, selectItems) => this.onSelectChanged(selectedRowKeys, selectItems),
    };

    return (
      <Modal
        title="预订单选择"
        visible={modalVisible}
        closable={false}
        onOk={() => this.onReservationSelect()}
        onCancel={() => {
          dispatch({
            type: 'home/ReservationSelectorModalVisible',
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
  return state.get('home').get('reservationSelector').toObject();
}

export default connect(matchStateToProps)(ReservationSelector);
