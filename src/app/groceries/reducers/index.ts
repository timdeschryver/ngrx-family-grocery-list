import { ActionReducerMap } from '@ngrx/store';

import * as groceries from './groceries.reducer';
import * as visibility from './visibility.reducer';
import * as root from '../../reducers';

export interface GroceriesState {
  groceries: groceries.State;
  visibility: visibility.State;
}

export interface State extends root.State {
  groceries: GroceriesState;
}

export const reducers: ActionReducerMap<GroceriesState> = {
  groceries: groceries.reducer,
  visibility: visibility.reducer,
};

export { groceries, visibility };
