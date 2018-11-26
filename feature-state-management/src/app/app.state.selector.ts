import { getLoggedIn, RootState } from './app.state.reducer';
import { createSelector, createFeatureSelector } from "@ngrx/store";

export class AppStateSelector {

  public getRootState() {
    return createFeatureSelector<RootState>('rootState');
  }

  public getLoggedInState() {
    return createSelector(
      this.getRootState(),
      getLoggedIn
    )
  }

}
