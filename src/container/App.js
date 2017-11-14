import React, { Component } from 'react';
import './App.css';
import { Spin } from 'antd';
import CustomRoute from '../components/CustomRoute';

class App extends Component {
  render() {
    return (
      <div>
        <Spin spinning={true}
              delay={500}
              size="large"
              tip="数据加载中...">
          <CustomRoute {...this.props} />
        </Spin>
      </div>
    );
  }
}

export default App;
