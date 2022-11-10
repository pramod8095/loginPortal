import { userConstants } from '../constants';

export function registration(state = {}, action) {
  console.log(action, 'registration reducer', action.payload);
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { registering: true };
    case userConstants.REGISTER_SUCCESS:
      // const x = { ...state, alertSuccess: action.payload };
       console.log(action.user, 'registration reduccer');
       return state = { ...state, alertSuccess: true };
      // state = {...state, alertSuccess:true}
      //return state = action.user;
    case userConstants.REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}