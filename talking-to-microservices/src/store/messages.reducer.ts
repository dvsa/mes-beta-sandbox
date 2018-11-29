
import * as messagesActions from './messages.actions';

const initialState = {
  msgs: [] 
};

export function messagesReducer(state = initialState, action: messagesActions.Types) {
  switch (action.type) {
    case messagesActions.ADD_MESSAGE:
      return {
        ...state,
        msgs: [
          ...state.msgs,
          action.payload,
        ],
      };

    default:
      return {
        ...state,
      };
  }
}