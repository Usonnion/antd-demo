import { Map, List, fromJS } from 'immutable';

const initState = Map({
  list: Map({
    data: List(),
    pageSize: 6,
    total: 0,
    current: 1,
    customerLoading: false,
  }),
  detail: Map({
    customerInfo: Map({
      id: 1,
      name: '王友生',
      wechat: '22563',
      birthday: '1991-01-01',
      registerDate: '0',
      referee: '张天硕',
      phone: '18801615551',
      status: '0',
      address: '将搭建开发回款单据安徽开封后 合肥的课教案浩丰科技的是客户科技发多少',
      comment: '234'
    }),
    visibleEditModal: false,
    editModalLoading: false
  }),
  account: Map({
    accountLoading: false,
    cashAccount: '10000',
    goldCoinAccount: '20000',
    silverCoinAccount: '30000',
    visibleAccountModal: false,
    rechargeModalLoading: false
  }),
  accountChangeRecord: Map({
    data: List([{
      id: 1,
      type: '现金账户',
      amount: '1000',
      changedType: '充值',
      date: '2017-7-8',
      comment: '充值500元，赠送500'
    }]),
    recordLoading: false
  }),
  reservationRecord: Map({
    data: List([
      {
        id: 1,
        productName: '全身推拿',
        date: '2017-7-8: 8:00',
        status: '未处理',
        comment: '121351'
      },
      {
        id: 2,
        productName: '全身推拿',
        date: '2017-7-8: 8:00',
        status: '未处理',
        comment: '121351'
      }
    ]),
    reservationLoading: false,
  }),
  orderRecord: Map({
    data: List([{
      id: 1,
      no: '2563256321456',
      date: '2017-8-3',
      standardAmount: '20000',
      actualAmount: '18000',
      comment: '123',
    }]),
    orderRecordLoading: false
  })
});

export default (state = initState, action) => {
  switch (action.type) {
    case 'customer/changeCustomerLoading':
      return state.update('list', list => list.set('customerLoading', action.payload));
    case 'customer/fetchCustomerSuccess':
      return state.update('list', list => (
        list.set('current', action.current)
          .set('data', action.payload)
          .set('total', action.total)
      ));
    case 'customer/changeVisibleEditModal':
      return state.update('detail', detail => detail.set('visibleEditModal', action.payload));
    case 'customer/changeEditModalLoading':
      return state.update('detail', detail => detail.set('editModalLoading', action.payload));
    case 'customer/changeCustomerInfo':
      return state.update('detail', detail => detail.update('customerInfo', customerInfo => customerInfo.merge(fromJS(action.payload))));
    case 'customer/changeVisibleAccountModal':
      return state.update('account', account => account.set('visibleAccountModal', action.payload));
    case 'customer/changeRechargeModalLoading':
      return state.update('account', account => account.set('rechargeModalLoading', action.payload));
    case 'customer/changeAccountLoading':
      return state.update('account', account => account.set('accountLoading', action.payload));
    default:
      return state;
  }
}
