import { getLoggedIn, RootState } from './app.state.reducer';
import { createSelector, createFeatureSelector } from "@ngrx/store";

export class AppStateSelector {

  public getRootState = createFeatureSelector<RootState>('rootState');

  public getLoggedInState = createSelector(
    this.getRootState,
    getLoggedIn
  );

}
