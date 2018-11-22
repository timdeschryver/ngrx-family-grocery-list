import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { fromEvent, EMPTY } from 'rxjs';
import { tap, filter, map } from 'rxjs/operators';
import {
  GroceriesActions,
  ADD_GROCERY,
  CHECK_OFF_GROCERY_PERSON_PAGE,
  CHECK_OFF_GROCERY_FAMILY_PAGE,
  REMOVE_CHECKED_OFF_GROCERIES,
  ADD_GROCERY_STORAGE,
  CHECK_OFF_GROCERY_STORAGE,
  REMOVE_CHECKED_OFF_GROCERIES_STORAGE,
} from '../groceries/reducers/groceries.reducer';

@Injectable()
export class LocalStorageEffects {
  // change this to `dispatch: true` to sync state with actions
  @Effect({ dispatch: false })
  onChange = fromEvent<StorageEvent>(window, 'storage').pipe(
    filter(evt => evt.key === '__bus'),
    filter(evt => evt.newValue !== null),
    map(evt => {
      const [{ type, payload }] = JSON.parse(evt.newValue);
      switch (type) {
        case ADD_GROCERY:
          return { type: ADD_GROCERY_STORAGE, payload };
        case CHECK_OFF_GROCERY_PERSON_PAGE:
        case CHECK_OFF_GROCERY_FAMILY_PAGE:
          return { type: CHECK_OFF_GROCERY_STORAGE, payload };
        case REMOVE_CHECKED_OFF_GROCERIES:
          return { type: REMOVE_CHECKED_OFF_GROCERIES_STORAGE, payload };
        default:
          return EMPTY;
      }
    }),
  );

  @Effect({ dispatch: false })
  storeActions = this.actions.pipe(
    ofType(
      ADD_GROCERY,
      CHECK_OFF_GROCERY_PERSON_PAGE,
      CHECK_OFF_GROCERY_FAMILY_PAGE,
      REMOVE_CHECKED_OFF_GROCERIES,
    ),
    tap(action => {
      const storedActions = window.localStorage.getItem('__bus');
      const actions = storedActions ? JSON.parse(storedActions) : [];
      const newActions = [action, ...actions];
      window.localStorage.setItem('__bus', JSON.stringify(newActions));
    }),
  );

  // change this to `dispatch: true` to sync state with state
  @Effect({ dispatch: true })
  updateState = fromEvent<StorageEvent>(window, 'storage').pipe(
    filter(evt => evt.key === '__groceries'),
    filter(evt => evt.newValue !== null),
    map(evt => {
      const newState = JSON.parse(evt.newValue);
      return { type: 'UPDATE_GROCERIES_STATE', payload: { newState } };
    }),
  );

  constructor(private actions: Actions<GroceriesActions>) {}
}
