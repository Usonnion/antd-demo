import { Map } from 'immutable';

export default (state = Map({ submitting: false }), action) => {
  switch (action.type) {
    case 'login/changeSubmitting':
      return state.set('submitting', action.payload);
    default:
      return state;
  }
}
