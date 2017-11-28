import { Map, List } from 'immutable';

const initState = Map({
  customerLoading: false,
  list: List(),
  pageSize: 6,
  total: 0,
  current: 1,
});

export default (state = initState, action) => {
  switch (action.type) {
    case 'customer/changeCustomerLoading':
      return state.set('customerLoading', action.payload);
    case 'customer/fetchCustomerSuccess':
      return state.set('list', action.payload)
        .set('current', action.current)
        .set('total', action.total);
    default:
      return state;
  }
}
