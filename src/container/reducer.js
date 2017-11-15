/**
 * Created by Administrator on 2017-11-14.
 */
import * as actions from './actions';

export default(state = { loading: false }, action) => {
  console.log(action);
  switch (action.type) {
    case actions.START_LOADING:
      return { ...state, loading: true };
    case actions.STOP_LOADING:
      return { ...state, loading: false };
    default:
      return state;
  }
}
