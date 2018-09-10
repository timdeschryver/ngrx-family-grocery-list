export interface State {
  showCheckedOffGroceries: boolean;
}

export const TOGGLE_CHECKED_OFF_GROCERIES =
  '[Grocery Person Page] Toggle checked off groceries';
export const toggleCheckedOffGroceries = () => ({
  type: TOGGLE_CHECKED_OFF_GROCERIES as typeof TOGGLE_CHECKED_OFF_GROCERIES,
});

export type VisibilityActions = ReturnType<typeof toggleCheckedOffGroceries>;

export const initialState: State = {
  showCheckedOffGroceries: false,
};

export function reducer(
  state = initialState,
  action: VisibilityActions,
): State {
  switch (action.type) {
    case TOGGLE_CHECKED_OFF_GROCERIES:
      return {
        ...state,
        showCheckedOffGroceries: !state.showCheckedOffGroceries,
      };

    default:
      return state;
  }
}
