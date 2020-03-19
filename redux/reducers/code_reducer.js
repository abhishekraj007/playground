import { DID_UPDATE_CODE } from '../actions/types';

const INITIAL_STATE = '// Life, Universe, and Everything\nlet answer = 6 * 7\nanswer';

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DID_UPDATE_CODE:
    return action.payload
  default:
    return state;
  }
}
