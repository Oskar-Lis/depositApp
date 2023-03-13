import { Dispatch } from "redux";
import axiosInstance from "../../axios.config";
import { ItemType } from "../../global.types";
import alertError from "../../utils/redux-alert-errors";
import {
	GetItemsType,
	CreateItemType,
	ItemErrorType,
	SetAlertType,
	UpdateItemsType,
} from "./action.types";

export const getItems = () => async (
	dispatch: Dispatch<GetItemsType | ItemErrorType>
) => {
	try {
		const response = await axiosInstance.get<ItemType[]>("api/item/all");
		dispatch({ type: "GET_ITEMS", payload: response.data });
	} catch (error) {
		dispatch({
			type: "ITEM_ERROR",
			payload: {
				status: null,
				statusText: null
			},
		});
	}
};

export const updateItem = (modaldata : ItemType) => async (
	dispatch: Dispatch<GetItemsType | ItemErrorType>
) => {
	try {	
		alert("clicked");
		const response = await axiosInstance.post<ItemType[]>(
			"api/item/update",
			modaldata,
		);
		dispatch({ type: "GET_ITEMS", payload: response.data });
	} catch(error){
		alertError(error)
	}
	
};
	
export const addItem = (item: ItemType) => async (
	dispatch: Dispatch<CreateItemType | SetAlertType>
) => {
	try {
		const response = await axiosInstance.post<ItemType>(
			"/api/item/create",
			item
		);

		dispatch({ type: "CREATE_ITEM", payload: response.data });
	} catch (error) {
		alertError(error);
	}
};











