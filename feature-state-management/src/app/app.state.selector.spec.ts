import { getRootState, getLoggedInState } from "./app.state.selector";

describe('AppState selector', () => {

  const appState = {
    rootState: {
      loggedIn: 'false'
    }
  }

  it('getRootState returns rootState', () => {
    const resultState = getRootState(appState);
    expect(resultState).toBe(appState.rootState);
  });

  it('getLoggedInState returns loggedIn', () => {
    const resultState = getLoggedInState(appState);
    expect(resultState).toBe(appState.rootState.loggedIn);
  });

});