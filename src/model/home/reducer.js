import { Map, List } from 'immutable';

const initState = Map({
  alertCount: 20,
  reservationLoading: false,
  reservationList: List([
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
  ]),
  dealReservation: Map({
    submitDealReservation: false,
    reservation: Map(),
    modalVisible: false,
  }),
  customerSelector: Map({
    modalVisible: false,
    completionAction: null,
    data: Map({
      1: List([{
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
        }]),
    }),

  }),
  reservationSelector: Map({
    modalVisible: false,
    data: Map({
      1: List([{
        id: 1,
        no: '25623566',
        status: '0',
        comment: '少放盐，多方辣',
        productTitle: '推拿',
        customerName: '王友生',
        customerPhone: '18801615551',
        customerWechat: '2563',
        date: '2017-5-8: 8:30'
      },{
        id: 2,
        no: '25623566',
        status: '0',
        comment: '少放盐，多方辣',
        productTitle: '推拿',
        customerName: '王友生',
        customerPhone: '18801615551',
        customerWechat: '2563',
        date: '2017-5-8: 8:30'
      },{
        id: 3,
        no: '25623566',
        status: '0',
        comment: '少放盐，多方辣',
        productTitle: '推拿',
        customerName: '王友生',
        customerPhone: '18801615551',
        customerWechat: '2563',
        date: '2017-5-8: 8:30'
      },{
        id: 4,
        no: '25623566',
        status: '0',
        comment: '少放盐，多方辣',
        productTitle: '推拿',
        customerName: '王友生',
        customerPhone: '18801615551',
        customerWechat: '2563',
        date: '2017-5-8: 8:30'
      }])
    })
  }),
  productSelector: Map({
    completionAction: null,
    data: Map({
      1: List([{
        id: 1,
        no: '256325632',
        name: '汤药1',
        unit: '盒'
      }, {
        id: 2,
        no: '256325632',
        name: '汤药2',
        unit: '盒'
      }, {
        id: 3,
        no: '256325632',
        name: '汤药3',
        unit: '盒'
      }, {
        id: 4,
        no: '256325632',
        name: '汤药4',
        unit: '盒'
      }, {
        id: 5,
        no: '256325632',
        name: '汤药5'
      }, {
        id: 6,
        no: '256325632',
        name: '汤药6',
        unit: '盒'
      }, {
        id: 7,
        no: '256325632',
        name: '汤药7',
        unit: '盒'
      }, {
        id: 8,
        no: '256325632',
        name: '汤药8',
        unit: '盒'
      },]),
    }),
    productLoading: false,
    modalVisible: false,
  })
});

export default (state = initState, action) => {
  switch (action.type) {
    case 'home/changeReservationLoading':
      return state.set('reservationLoading', action.payload);
    case 'home/fetchReservationSuccess':
      return state.set('reservationList', List(action.payload));
    case 'home/DealReservationModalVisible':
      return state.update('dealReservation', dealReservation => dealReservation.set('modalVisible', action.payload));
    case 'home/setDealReservation':
      return state.update('dealReservation', dealReservation => dealReservation.set('reservation', Map(action.payload)));
    case 'home/ProductSelectorModalVisible':
      return state.update('productSelector', productSelector =>
        productSelector.set('modalVisible', action.payload)
          .set('completionAction', action.completionAction));
    case 'home/CustomerSelectorModalVisible':
      return state.update('customerSelector', productSelector => productSelector.set('modalVisible', action.payload)
        .set('completionAction', action.completionAction));
    case 'home/ReservationSelectorModalVisible':
      return state.update('reservationSelector', productSelector => productSelector.set('modalVisible', action.payload)
        .set('completionAction', action.completionAction));
    default:
      return state;
  }
}
