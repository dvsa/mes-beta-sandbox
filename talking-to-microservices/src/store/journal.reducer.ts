
import * as jorunalActions from '../store/journal.actions';

const initialState = {
  isLoading: false,
};

export function journalReducer(state = initialState, action: jorunalActions.Types) {
  switch (action.type) {
    case jorunalActions.LOAD_JOURNAL:
      return {
        ...state,
        isLoading: true,
      };
    case jorunalActions.LOAD_JOURNAL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        journalData: action.payload,
      };
    case jorunalActions.LOAD_JOURNAL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default: 
      return state;
  }
}
