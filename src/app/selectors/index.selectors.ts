import { createFeatureSelector, createSelector } from '@ngrx/store';

import { family, RouterReducerState, State } from '../reducers';

export const routerState = createFeatureSelector<State, RouterReducerState>(
  'router',
);

// grab the `family` piece of state from the state tree
export const familyState = createFeatureSelector<State, family.State>('family');

// select the `familyMembers` property from `family`
export const getFamilyMembers = createSelector(
  familyState,
  state => state.familyMembers,
);
