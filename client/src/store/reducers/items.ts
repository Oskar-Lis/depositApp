import { ClientErrorType, ItemType } from "../../global.types";
import { AppActionTypes } from "../actions/action.types";

const initialState: ItemsState = {
  items: [],
  loading: true,
  error: {},
};

const itemsReducer = (
  state: ItemsState = initialState,
  action: AppActionTypes
): ItemsState => {
  switch (action.type) {
    case "GET_ITEMS":
      return { ...state, loading: false, items: action.payload };

    default:
      return state;
  }
};

export default itemsReducer;

export interface ItemsState {
  items: ItemType[];
  loading: boolean;
  error: ClientErrorType | {};
}
