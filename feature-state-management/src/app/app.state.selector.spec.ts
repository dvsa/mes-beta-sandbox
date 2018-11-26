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
    const rootState = appStateSelector.getRootState()(appState);
    expect(rootState).toBe(appState.rootState);
  });

  it('getLoggedInState returns loggedIn', () => {
    const rootState = appStateSelector.getLoggedInState()(appState);
    expect(rootState).toBe(appState.rootState.loggedIn);
  });

});