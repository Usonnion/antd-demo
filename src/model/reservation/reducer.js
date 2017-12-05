import { Map, List } from 'immutable';

const initState = Map({
  list: Map({
    data: List([{
      id: 1,
      no: '25623566',
      status: '未处理',
      comment: '121351',
      productTitle: '推拿',
      customerName: '王友生',
      customerPhone: '18801615551',
      customerWechat: '2563',
      date: '2017-5-8: 8:30'
    }]),
    reservationLoading: false,
    current: 1,
    pageSize: 5,
    total: 0,
  }),
  detail: Map({
    detailLoading: false,
    orderLoading: false,
    reservationBasicInfo: Map({
      id: 1,
      no: '25623566',
      status: '0',
      comment: '少放盐，多方辣',
      productTitle: '推拿',
      customerName: '王友生',
      customerPhone: '18801615551',
      customerWechat: '2563',
      date: '2017-5-8: 8:30'
    }),
  })
})

export default (state = initState, action) => {
  switch (action.type) {
    case 'reservation/changeReservationLoading':
      return state.update('list', list => list.set('reservationLoading', action.payload));
    default:
      return state;
  }
}
