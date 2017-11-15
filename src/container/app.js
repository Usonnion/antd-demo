import React, { Component } from 'react';
import './app.css';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import * as actions from './actions';
import PropTypes from 'prop-types';
import CustomRoute from '../components/customRoute';

class App extends Component {

  componentDidMount() {
    this.props.startLoading();
  }

  render() {
    return (
      <div>
        <Spin spinning={this.props.app.loading}
              delay={500}
              size="large"
              tip="数据加载中...">
          <CustomRoute {...this.props} />
        </Spin>
      </div>
    );
  }
}

App.propTypes = {
  startLoading: PropTypes.func,
  stopLoading: PropTypes.func,
}

const mapStateToProps = (state) => {
  return Object.assign({}, state);
}

const mapDispatchToProps = (dispatch) => (
  {
    startLoading: () => dispatch(actions.startLoading()),
    stopLoading: () => dispatch(actions.stopLoading())
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
