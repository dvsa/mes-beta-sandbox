import { getCountState } from '../feature-page.selector';


describe('AppState selector', () => {

  const appState = {
    rootState: {
      loggedIn: 'false'
    },
    count: 0
  }

  it('getCountState returns count', () => {
    const resultState = getCountState(appState);
    expect(resultState).toBe(appState.count);
  });

});