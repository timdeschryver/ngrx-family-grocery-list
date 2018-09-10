import { createSelector, createFeatureSelector } from '@ngrx/store';

import { GroceriesState, State, groceries as fromGroceries } from '../reducers';
import { FamilyMemberGroceriesDict } from '../models';

export const groceriesState = createFeatureSelector<State, GroceriesState>(
  'groceries',
);

export const getGroceriesState = createSelector(
  groceriesState,
  state => state.groceries,
);

export const getGroceries = createSelector(
  getGroceriesState,
  fromGroceries.selectAll,
);

export const getVisiblityState = createSelector(
  groceriesState,
  state => state.visibility,
);

export const getShowCheckedOffGroceries = createSelector(
  getVisiblityState,
  state => state.showCheckedOffGroceries,
);

export const getGroceriesByFamilyMember = createSelector(
  getGroceries,
  groceries =>
    groceries.reduce<FamilyMemberGroceriesDict>(
      (groceriesByFamilyMember, grocery) => {
        groceriesByFamilyMember[grocery.familyMemberId] = (
          groceriesByFamilyMember[grocery.familyMemberId] || []
        ).concat(grocery);
        return groceriesByFamilyMember;
      },
      {},
    ),
);
