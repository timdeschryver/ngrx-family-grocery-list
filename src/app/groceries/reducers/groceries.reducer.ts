import { ActionReducer, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import uuid from 'uuid';

import { Grocery } from '../models';

export interface State extends EntityState<Grocery> {}

export const ADD_GROCERY = '[Grocery Person Page] Add grocery to list';
export const addGrocery = ({
  id = uuid(),
  description = '',
  familyMemberId = '',
  createdOn = Date.now(),
}) => {
  let descriptionPayload = description;
  while (descriptionPayload.startsWith('!')) {
    descriptionPayload = descriptionPayload.substr(1);
  }

  return {
    type: ADD_GROCERY as typeof ADD_GROCERY,
    payload: {
      id,
      description: descriptionPayload.trim(),
      familyMemberId,
      importance: description.length - descriptionPayload.length,
      createdOn,
      checkedOffOn: null,
    },
  };
};

export const CHECK_OFF_GROCERY_PERSON_PAGE =
  '[Grocery Person Page] Check off grocery';
export const checkOffGroceryPersonPage = ({
  id = '',
  checkedOffOn = Date.now(),
}) => ({
  type: CHECK_OFF_GROCERY_PERSON_PAGE as typeof CHECK_OFF_GROCERY_PERSON_PAGE,
  payload: {
    id,
    checkedOffOn,
  },
});

export const CHECK_OFF_GROCERY_FAMILY_PAGE =
  '[Grocery Family Page] Check off grocery';
export const checkOffGroceryFamilyPage = ({
  id = '',
  checkedOffOn = Date.now(),
}) => ({
  type: CHECK_OFF_GROCERY_FAMILY_PAGE as typeof CHECK_OFF_GROCERY_FAMILY_PAGE,
  payload: {
    id,
    checkedOffOn,
  },
});

export const REMOVE_CHECKED_OFF_GROCERIES =
  '[Grocery Person Page] Remove checked off groceries from list';
export const removeCheckedOffGroceries = ({ familyMemberId = '' }) => ({
  type: REMOVE_CHECKED_OFF_GROCERIES as typeof REMOVE_CHECKED_OFF_GROCERIES,
  payload: { familyMemberId },
});

export type GroceriesActions =
  | ReturnType<typeof addGrocery>
  | ReturnType<typeof checkOffGroceryPersonPage>
  | ReturnType<typeof checkOffGroceryFamilyPage>
  | ReturnType<typeof removeCheckedOffGroceries>;

export const adapter: EntityAdapter<Grocery> = createEntityAdapter<Grocery>({
  sortComparer: (a, b) => {
    const delta = b.importance - a.importance;
    if (delta !== 0) {
      return delta;
    }

    return a.createdOn - b.createdOn;
  },
});

export const initialState: State = adapter.getInitialState();

export function stateReducer(
  state = initialState,
  action: GroceriesActions,
): State {
  switch (action.type) {
    case ADD_GROCERY:
      return adapter.addOne(action.payload, state);

    case CHECK_OFF_GROCERY_PERSON_PAGE:
    case CHECK_OFF_GROCERY_FAMILY_PAGE:
      return adapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        state,
      );

    case REMOVE_CHECKED_OFF_GROCERIES:
      const idsToDelete = (<string[]>state.ids)
        .map(groceryId => state.entities[groceryId])
        .filter(
          grocery =>
            grocery.familyMemberId === action.payload.familyMemberId &&
            grocery.checkedOffOn !== null,
        )
        .map(grocery => grocery.id);

      return adapter.removeMany(idsToDelete, state);

    default:
      return state;
  }
}

export function persistStateReducer(_reducer: ActionReducer<State>) {
  const localStorageKey = '__groceries';
  return (state: State | undefined, action: Action) => {
    if (state === undefined) {
      const persisted = localStorage.getItem(localStorageKey);
      return persisted ? JSON.parse(persisted) : _reducer(state, action);
    }

    const nextState = _reducer(state, action);
    localStorage.setItem(localStorageKey, JSON.stringify(nextState));
    return nextState;
  };
}

export const reducer = persistStateReducer(stateReducer);

export const { selectIds, selectEntities, selectAll } = adapter.getSelectors();
