import { createSelector } from '@ngrx/store';

import * as root from '../../selectors/index.selectors';
import { getGroceriesByFamilyMember } from './base.selectors';
import { FamilyMemberGroceryViewModel } from '../models';

export const getFamilyMembersGroceries = createSelector(
  root.getFamilyMembers,
  getGroceriesByFamilyMember,
  (familyMembers, groceries): FamilyMemberGroceryViewModel[] =>
    Object.keys(familyMembers).map(familyMemberId => {
      const familyMember = familyMembers[familyMemberId];
      const familyMemberGroceries = groceries[familyMemberId] || [];
      const visibleFamilyMemberGroceries = familyMemberGroceries.filter(
        grocery => !grocery.checkedOffOn,
      );

      return {
        familyMember,
        groceries: visibleFamilyMemberGroceries.map(grocery => ({
          ...grocery,
          checkedOff: !!grocery.checkedOffOn,
        })),
      };
    }),
);
