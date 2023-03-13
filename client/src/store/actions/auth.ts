import { Dispatch } from "redux";
import {
  SetAlertType,
  LoginSuccessType,
  LoginFailType,
  LogoutType,
  ClearProfileType,
  UserNotLoadedType,
  SignupFailType,
  SignupSuccessType,
  UserLoadedType,
  AuthErrorType,
  CreateDepositType,
} from "./action.types";
import { ILoginParams, ISignupParams, UserType, DepositType } from "../../global.types";
import alertErrors from "../../utils/redux-alert-errors";
import axiosInstance from "../../axios.config";
import { CallHistoryMethodAction, push } from "connected-react-router";

export const loadUser = () => async (
  dispatch: Dispatch<UserLoadedType | AuthErrorType | UserNotLoadedType>
) => {
  const token = localStorage.getItem("token");
  if (!token) return dispatch({ type: "USER_NOT_LOADED" });
  try {
    const response = await axiosInstance.get<UserType>("/api/auth");

    const user = response.data;

    dispatch({
      type: "USER_LOADED",
      payload: user,
    } as UserLoadedType);
  } catch (error) {
    console.log(error);
    dispatch({
      type: "AUTH_ERROR",
    } as AuthErrorType);
  }
};

export const signup = ({ username, email, password, deposit }: ISignupParams) => async (
  dispatch: Dispatch<SignupSuccessType | SignupFailType | SetAlertType>
) => {
  const data = { username, email, password, deposit};

  try {
    const response = await axiosInstance.post<{ token: string }>(
      "/api/auth/register",
      data
    );

    dispatch({
      type: "SIGNUP_SUCCESS",
      payload: response.data,
    } as SignupSuccessType);

    // @ts-ignore
    dispatch(loadUser());
  } catch (error) {
    alertErrors(error);

    dispatch({
      type: "SIGNUP_FAIL",
    } as SignupFailType);
  }
};

export const login = ({ email, password }: ILoginParams) => async (
  dispatch: Dispatch<
    LoginSuccessType | LoginFailType | SetAlertType | UserLoadedType
  >
) => {
  const data = { email, password };
  try {
    const response = await axiosInstance.post<{ token: string }>(
      "/api/auth/login",
      data
    );
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: response.data,
    } as LoginSuccessType);

    // @ts-ignore
    dispatch(loadUser());
  } catch (error) {
    alertErrors(error);
    dispatch({
      type: "LOGIN_FAIL",
    } as LoginFailType);
  }
};

export const logout = () => (
  dispatch: Dispatch<LogoutType | ClearProfileType | CallHistoryMethodAction>
) => {
  localStorage.removeItem("token");
  dispatch({
    type: "CLEAR_PROFILE",
  } as ClearProfileType);
  dispatch(push("/"));
  dispatch({
    type: "LOGOUT",
  } as LogoutType);
};

export const createDeposit = (deposit: DepositType) => async (
	dispatch: Dispatch<CreateDepositType | SetAlertType>
) => {
	try {
		const response = await axiosInstance.post<DepositType>(
			"/api/auth/create-deposit",
			deposit
		);

		dispatch({ type: "CREATE_DEPOSIT", payload: response.data } as CreateDepositType);
	} catch (error) {
		alertErrors(error);
	}
};
