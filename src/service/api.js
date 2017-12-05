import { request } from '../utils/request';
import { delay } from '../utils/utils';

export async function accountLogin(params) {
  return request('http://10.60.1.193:8888/zytech/chanpin/phone/dealers/getYanzheng.action', {
    method: 'POST',
    body: params
  });
}

export async function fetchReservationNoticeData(params) {
  // return request()
  return [
    {
      id: 1,
      description: '王友生预约了我们的产品1',
      datetime: '2014-2-5'
    },
    {
      id: 2,
      description: '王友生预约了我们的产品2',
      datetime: '2014-2-5'
    },
    {
      id: 3,
      description: '王友生预约了我们的产品3',
      datetime: '2014-2-5'
    },
    {
      id: 4,
      description: '王友生预约了我们的产品4',
      datetime: '2014-2-5'
    },
    {
      id: 5,
      description: '王友生预约了我们的产品5',
      datetime: '2014-2-5'
    },
  ]
}

export async function fetchCustomerData(params) {
  return {
    current: 2,
    total: 100,
    data: [
      {
        id: 1,
        name: '王友生',
        wechat: '22563',
        birthday: '1991-01-01',
        registerDate: '0',
        referee: '张天硕',
        phone: '18801615551',
        status: '准会员',
        comment: '将搭建开发回款单据安徽开封后 合肥的课教案浩丰科技的是客户科技发多少',
      },
      {
        id: 2,
        name: '王友生',
        wechat: '22563',
        birthday: '1991-01-01',
        registerDate: '0',
        referee: '张天硕',
        phone: '18801615551',
        status: '准会员',
        comment: '将搭建开发回款单据安徽开封后 合肥的课教案浩丰科技的是客户科技发多少',
      }, {
        id: 3,
        name: '王友生3',
        wechat: '22563',
        birthday: '1991-01-01',
        registerDate: '0',
        referee: '张天硕',
        phone: '18801615551',
        status: '准会员',
        comment: '将搭建开发回款单据安徽开封后 合肥的课教案浩丰科技的是客户科技发多少',
      }, {
        id: 4,
        name: '王友生4',
        wechat: '22563',
        birthday: '1991-01-01',
        registerDate: '0',
        referee: '张天硕',
        phone: '18801615551',
        status: '准会员',
        comment: '将搭建开发回款单据安徽开封后 合肥的课教案浩丰科技的是客户科技发多少',
      },{
        id: 5,
        name: '王友生4',
        wechat: '22563',
        birthday: '1991-01-01',
        registerDate: '0',
        referee: '张天硕',
        phone: '18801615551',
        status: '准会员',
        comment: '将搭建开发回款单据安徽开封后 合肥的课教案浩丰科技的是客户科技发多少',
      }, {
        id: 6,
        name: '王友生4',
        wechat: '22563',
        birthday: '1991-01-01',
        registerDate: '0',
        referee: '张天硕',
        phone: '18801615551',
        status: '准会员',
        comment: '将搭建开发回款单据安徽开封后 合肥的课教案浩丰科技的是客户科技发多少',
      },
    ]
  }
}

export async function fetchProductData(params) {
  return {
    current: 2,
    total: 100,
    data: [
      {
        id:1,
        imageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
        title: 'spa1',
        description: '推拿一小时，精油两瓶，还送精美礼物',
      },{
        id:2,
        imageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
        title: 'spa2',
        description: '推拿一小时，精油两瓶，还送精美礼物',
      },{
        id:3,
        imageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
        title: 'spa3',
        description: '推拿一小时，精油两瓶，还送精美礼物',
      },{
        id:4,
        imageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
        title: 'spa4',
        description: '推拿一小时，精油两瓶，还送精美礼物',
      },{
        id:5,
        imageUrl: 'https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png',
        title: 'spa5',
        description: '推拿一小时，精油两瓶，还送精美礼物',
      }
    ]
  }
}
