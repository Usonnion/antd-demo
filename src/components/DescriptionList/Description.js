import React from 'react';
import classNames from 'classnames';
import { Col } from 'antd';
import './index.less';
import responsive from './responsive';

const Description = ({ term, column, className, children, ...restProps }) => {
  const clsString = classNames('description', className);
  return (
    <Col className={clsString} {...responsive[column]} {...restProps}>
      {term && <div className='term'>{term}</div>}
      {children && <div className='detail'>{children}</div>}
    </Col>
  );
};

export default Description;
