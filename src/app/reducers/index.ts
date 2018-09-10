import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../../environments/environment';
import * as family from './family.reducer';

export interface State {
  family: family.State;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  family: family.reducer,
  router: routerReducer,
};

export const metaReducers = environment.production ? [] : [storeFreeze];

export { family, RouterReducerState };
