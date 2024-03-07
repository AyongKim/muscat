import { apiUrl, execUrl } from '../utils/commonValues';
import { actionFormat } from '../utils/commonFunctions';

// Action Types 
const SET_INITIAL = "login/SET_INITIAL";
const CHECK_LOGIN = 'login/CHECK_LOGIN' as const;
const POST_LOGIN = 'login/POST_LOGIN' as const;
const LOGOUT = 'login/LOGOUT' as const;
const CHECK_EMAIL = 'login/CHECK_EMAIL';
const SAVE_FORM = 'login/SAVE_FORM';
const INIT_PWRESET = 'login/INIT_PWRESET';

// Actions
export const setInitial = () => actionFormat(SET_INITIAL);
export const getCheckLogin = () =>
  actionFormat(CHECK_LOGIN, null, 'get', `${apiUrl}Login/CheckLogin`);
export const postLogin = (params: any) =>
  actionFormat(POST_LOGIN, params, 'post', `${apiUrl}user/Login`);
export const getLogout = () =>
  actionFormat(LOGOUT, null, 'get', `${apiUrl}Login/Logout`);

export const getCheckEmail = (params: any) =>
  actionFormat(CHECK_EMAIL, params, 'get', `${execUrl}PasswdMail`);
export const saveForm = (params: any) => actionFormat(SAVE_FORM, params);
export const initPwreset = () => actionFormat(INIT_PWRESET);

// Initial state
interface stateType {
  step?: number;
  sessionTimeout?: number;
  loginResult?: number;
  loginMessage?: string;
  userData?: any;
  serviceNo?: any;
  passwordReset?: any;
  formStore?: any;
  send?: any;
}
const initialState: stateType = {
  step: 1,
  sessionTimeout: 0,
  loginResult: 0,
  loginMessage: '',
  userData: null,
  passwordReset: null,
  formStore: {
    userEmail: '',
    userPasswd: '',
  },
  send: {
    isExist: 0,
    isSend: 0,
  },
};

// Reducers
export default function login (state = initialState, action: any) {
  switch (action.type) { 
    case SET_INITIAL:
      return initialState;
    case CHECK_LOGIN:
      if (action.payload) {
        const { list } = action.payload.data;
        state = {
          ...state,
          sessionTimeout: list.sessionTimeout,
          userData: list.userData,
        };
      }
      return state;
    case POST_LOGIN:
      if (action.payload) {
        const { list } = action.payload.data;
        state = {
          ...state,
          // sessionTimeout: list.sessionTimeout,
          loginResult: list.loginResult,
          loginMessage: list.loginMessage,
          userData: list.userData,
        };
      } else {
        state = {
          ...state,
          loginResult: 2,
          loginMessage: 'Unable to connect to Server',
          userData: null,
        };
      }
      return state;
    case CHECK_EMAIL:
      if (action.payload) {
        const { list } = action.payload.data;
        state.send = list;
        if (list.isExist === 1) {
          state.step = 2;
        }
      }
      return state;
    case SAVE_FORM:
      if (action.payload) {
        state.formStore = action.payload;
      }
      return state;
    case INIT_PWRESET:
      state = {
        ...state,
        step: 1
      }
      return state;
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}
