import { Action } from '@ngrx/store';
import { FamilyDict } from '../models';

export interface State {
  familyMembers: FamilyDict;
}

export const initialState: State = {
  familyMembers: {},
};

export function reducer(state = initialState, _: Action): State {
  return state;
}
