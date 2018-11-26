import { createFeatureSelector } from "@ngrx/store";

export const getCountState = createFeatureSelector<number>('count');
