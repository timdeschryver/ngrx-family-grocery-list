import { FamilyMember } from '../../models';

export interface Grocery {
  id: string;
  description: string;
  familyMemberId: string;
  importance: number;
  createdOn: number;
  checkedOffOn?: number;
}

export interface FamilyMemberGroceriesDict {
  [id: string]: Grocery[];
}

export interface GroceryViewModel {
  id: string;
  description: string;
  familyMemberId: string;
  importance: number;
  createdOn: number;
  checkedOffOn?: number;
  checkedOff: boolean;
}

export interface FamilyMemberGroceryViewModel {
  familyMember: FamilyMember;
  groceries: GroceryViewModel[];
}
