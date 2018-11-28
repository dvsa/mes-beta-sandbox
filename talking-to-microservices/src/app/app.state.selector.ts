import { RootState } from './app.state.reducer';
import { createSelector, createFeatureSelector } from "@ngrx/store";

export const getRootState = createFeatureSelector<RootState>('rootState');
const getLoggedIn = (state: RootState) => state.loggedIn;
export const getLoggedInState = createSelector(getRootState, getLoggedIn);
