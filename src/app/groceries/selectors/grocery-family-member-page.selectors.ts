import { createSelector } from '@ngrx/store';

import * as root from '../../selectors/index.selectors';
import {
  getGroceriesByFamilyMember,
  getShowCheckedOffGroceries,
} from './base.selectors';
import { GroceryViewModel } from '../models';

export const getActiveFamilyMemberId = createSelector(
  root.routerState,
  state =>
    state &&
    state.state &&
    state.state.root.firstChild.firstChild &&
    state.state.root.firstChild.firstChild.params.id,
);

export const getActiveFamilyMember = createSelector(
  root.getFamilyMembers,
  getActiveFamilyMemberId,
  (familyMembers, id) => familyMembers[id],
);

export const getActiveFamilyMemberGroceries = createSelector(
  getGroceriesByFamilyMember,
  getActiveFamilyMemberId,
  (groceries, familyMemberId) => groceries[familyMemberId] || [],
);

export const getVisibleActiveFamilyMemberGroceries = createSelector(
  getActiveFamilyMemberGroceries,
  getShowCheckedOffGroceries,
  (groceries, showCheckedOffGroceries): GroceryViewModel[] => {
    const visibleGroceries = showCheckedOffGroceries
      ? groceries
      : groceries.filter(grocery => !grocery.checkedOffOn);

    return visibleGroceries.map(grocery => ({
      ...grocery,
      checkedOff: !!grocery.checkedOffOn,
    }));
  },
);
