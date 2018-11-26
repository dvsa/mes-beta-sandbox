import { LogIn } from './app.state.actions';
import { rootStateReducer, initialState, RootState } from "./app.state.reducer";

describe('rootStateReducer', () => {

  const rootState: RootState = initialState;

  it('should compute the correct state when a LogIn action occurs', () => {
    expect(rootStateReducer(rootState, new LogIn())).toEqual({
      ...rootState,
      loggedIn: 'true'
    });
  });

});