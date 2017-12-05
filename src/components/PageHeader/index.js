import './index.less';

import React, { PureComponent } from 'react';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

class PageHeader extends PureComponent {
  static defaultProps = {
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png'
  }

  onChange(key) {
    if (this.props.onTabChange) {
      this.props.onTabChange(key);
    }
  };

  render() {
    const { logo, title, action, description, extra, tabList } = this.props;

    const tabDefaultValue = tabList && (tabList.filter(item => item.default)[0] || tabList[0]);

    return <div className="pageHeaderWrapper">
    <div className='productDetailPageHeader'>
      <div className='productDetailLogo'>
        <img alt=""
             src={logo} />
      </div>
      <div className='productDetailMain'>
        <div className='productDetailRow'>
          {title && <h1 className='productDetailTitle'>{title}</h1> }
          {action && <div className='productDetailAction'>{action}</div>}
        </div>
        <div className='productDetailRow'>
          {description && <div className='productDetailContent'>{description}</div>}
          {extra && <div className='productDetailExtraContent'>{extra}</div>}
        </div>
      </div>
    </div>
      {
        tabList &&
        tabList.length &&
        <Tabs
          className='tabs'
          defaultActiveKey={(tabDefaultValue && tabDefaultValue.key)}
          onChange={(key) => this.onChange(key)}
        >
          {
            tabList.map(item => <TabPane tab={item.tab} key={item.key} />)
          }
        </Tabs>
      }
    </div>
  }
}

export default PageHeader;
