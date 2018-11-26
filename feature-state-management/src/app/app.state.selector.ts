import { getLoggedIn, RootState } from './app.state.reducer';
import { createSelector, createFeatureSelector } from "@ngrx/store";

export const getRootState = createFeatureSelector<RootState>('rootState');

export const getLoggedInState = createSelector(getRootState, getLoggedIn);
