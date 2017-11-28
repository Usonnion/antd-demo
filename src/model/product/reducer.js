import { Map, List } from 'immutable';

const initState = Map({
  productLoading: false,
  list: List([1,2,3,4]),
  pageSize: 8,
  total: 0,
  current: 1,
  detail: Map({
    id: '',
    title: '',
  }),
  editProduct: Map({
    id: '-1'
  })
});

export default (state = initState, action) => {
  switch (action.type) {
    case 'product/changeProductLoading':
      return state.set('productLoading', action.payload);
    case 'product/fetchProductSuccess':
      return state.set('list', action.payload);
    default:
      return state;
  }
}
