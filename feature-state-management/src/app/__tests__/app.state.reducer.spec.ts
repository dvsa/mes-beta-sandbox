import { LogIn } from '../app.state.actions';
import { rootStateReducer, initialAppState, RootState } from "../app.state.reducer";

describe('rootStateReducer', () => {

  const rootState: RootState = initialAppState;

  it('should compute the correct state when a LogIn action occurs', () => {
    expect(rootStateReducer(rootState, new LogIn())).toEqual({
      ...rootState,
      loggedIn: 'true'
    });
  });

});