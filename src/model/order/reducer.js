import { Map, List } from 'immutable';

const initState = Map({
  list: Map({
    data: List([{
      id: 1,
      no: '25623566',
      status: '未处理',
      comment: '121351',
      customerName: '王友生',
      customerPhone: '18801615551',
      customerWechat: '2563',
      standardAmount: '20000',
      actualAmount: '18000',
      date: '2017-5-8: 8:30'
    }]),
    orderLoading: false,
    current: 1,
    pageSize: 5,
    total: 0,
  }),
  detail: Map({
    basicInfo: {
      no: '25623566',
      status: '未处理',
      comment: '121351',
      customerName: '王友生',
      customerPhone: '18801615551',
      customerWechat: '2563',
      standardAmount: '20000',
      actualAmount: '18000',
      date: '2017-5-8: 8:30'
    },
    productList: List([{
      id: 1,
      no: '1225463',
      name: '汤包',
      count: '2',
      unit: '盒',
      amount: 500,
      totalAmount: 1000,
    }, {
      id: 1,
      no: '12254634',
      name: '汤包',
      count: '2',
      unit: '盒',
      amount: 500,
      totalAmount: 1000,
    }, {
      id: 1,
      no: '12254635',
      name: '汤包',
      count: '2',
      unit: '盒',
      amount: 500,
      totalAmount: 1000,
    }])
  }),
  editOrder: Map({
    customerInfo: null,
    reservation: null,
    productList: List([])
  })
})

export default (state = initState, action) => {
  switch (action.type) {
    case 'order/setEditOrderProductList': {
      const oldProductList = state.get('editOrder').get('productList');
      const allSelectedProductList = List(action.payload);
      const newProductList = allSelectedProductList.filter(newProduct => oldProductList.filter(oldProduct => oldProduct.id === newProduct.id).count() === 0);
      const productList = oldProductList.concat(newProductList);
      return state.update('editOrder', editOrder => editOrder.set('productList', productList));
    }
    case 'order/editOrderDetailFieldChanged':
      return state.update('editOrder', editOrder =>
        editOrder.update('productList', productList =>
          productList.update(action.key, product => {
            product[action.fieldName] = action.value;
            return { ...product };
          })));
    case 'order/deleteEditOrderProduct':
      return state.update('editOrder', editOrder =>
        editOrder.update('productList', productList => productList.delete(action.payload)));
    case 'order/setEditOrderCustomerInfo':
      return state.update('editOrder', orderDetail => orderDetail.set('customerInfo', action.payload));
    case 'order/setEditOrderReservation':
      return state.update('editOrder', orderDetail => orderDetail.set('reservation', action.payload));
    default:
      return state;
  }
}
