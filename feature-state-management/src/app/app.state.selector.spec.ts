import { AppStateSelector } from './app.state.selector';

describe('AppState selector', () => {

  let appStateSelector: AppStateSelector;
  const appState = {
    rootState: {
      loggedIn: 'false'
    }
  }

  beforeEach(() => {
    appStateSelector = new AppStateSelector();
  });

  it('getRootState returns rootState', () => {
    const resultState = appStateSelector.getRootState()(appState);
    expect(resultState).toBe(appState.rootState);
  });

  it('getLoggedInState returns loggedIn', () => {
    const resultState = appStateSelector.getLoggedInState()(appState);
    expect(resultState).toBe(appState.rootState.loggedIn);
  });

});