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

export const ADD_GROCERY_STORAGE = '[Grocery Storage] Add grocery to list';
export const addGroceryStorage = ({
  id = uuid(),
  description = '',
  familyMemberId = '',
  importance = 0,
  checkedOffOn = null,
  createdOn = Date.now(),
}) => {
  return {
    type: ADD_GROCERY_STORAGE as typeof ADD_GROCERY_STORAGE,
    payload: {
      id,
      description,
      familyMemberId,
      importance,
      createdOn,
      checkedOffOn,
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

export const CHECK_OFF_GROCERY_STORAGE = '[Grocery Storage] Check off grocery';
export const checkOffGroceryStorage = ({
  id = '',
  checkedOffOn = Date.now(),
}) => ({
  type: CHECK_OFF_GROCERY_STORAGE as typeof CHECK_OFF_GROCERY_STORAGE,
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

export const REMOVE_CHECKED_OFF_GROCERIES_STORAGE =
  '[Grocery Storage] Remove checked off groceries from list';
export const removeCheckedOffGroceriesStorage = ({ familyMemberId = '' }) => ({
  type: REMOVE_CHECKED_OFF_GROCERIES_STORAGE as typeof REMOVE_CHECKED_OFF_GROCERIES_STORAGE,
  payload: { familyMemberId },
});

// REMOVE_CHECKED_OFF_GROCERIES,

export type GroceriesActions =
  | ReturnType<typeof addGrocery>
  | ReturnType<typeof checkOffGroceryPersonPage>
  | ReturnType<typeof checkOffGroceryFamilyPage>
  | ReturnType<typeof removeCheckedOffGroceries>
  | ReturnType<typeof addGroceryStorage>
  | ReturnType<typeof checkOffGroceryStorage>
  | ReturnType<typeof removeCheckedOffGroceriesStorage>;

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
    case ADD_GROCERY_STORAGE:
      return adapter.addOne(action.payload, state);

    case CHECK_OFF_GROCERY_PERSON_PAGE:
    case CHECK_OFF_GROCERY_FAMILY_PAGE:
    case CHECK_OFF_GROCERY_STORAGE:
      return adapter.updateOne(
        { id: action.payload.id, changes: action.payload },
        state,
      );

    case REMOVE_CHECKED_OFF_GROCERIES:
    case REMOVE_CHECKED_OFF_GROCERIES_STORAGE:
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

export function updateStateReducer(_reducer: ActionReducer<State>) {
  return (state: State | undefined, action: Action) => {
    if (action.type === 'UPDATE_GROCERIES_STATE') {
      return (<any>action).payload.newState;
    }

    return _reducer(state, action);
  };
}

export const reducer = updateStateReducer(persistStateReducer(stateReducer));

export const { selectIds, selectEntities, selectAll } = adapter.getSelectors();
