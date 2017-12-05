import React, { Component } from 'react';
import './index.less';

export default class FooterToolbar extends Component {
  render() {
    const { children, extra, ...restProps } = this.props;
    return (
      <div
        className='toolbar'
        {...restProps}
      >
        <div className='left'>{extra}</div>
        <div className='right'>{children}</div>
      </div>
    );
  }
}
