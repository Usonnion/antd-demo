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
  ])
});

export default (state = initState, action) => {
  switch (action.type) {
    case 'home/changeReservationLoading':
       return state.set('reservationLoading', action.payload);
    case 'home/fetchReservationSuccess':
      return state.set('reservationList', List(action.payload));
    default:
      return state;
  }
}
