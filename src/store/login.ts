import { createAction, createReducer, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { apiUrl, execUrl } from '../utils/commonValues';

// 비동기 액션 생성자
export const postLogin = createAsyncThunk(
  'login/POST_LOGIN',
  async (params: object) => {
    const response = await axios.post(`${apiUrl}user/Login`, params);
    return response.data;
  }
);

// 동기 액션 생성자
export const setInitial = createAction('login/SET_INITIAL');
export const getCheckLogin = createAction('login/CHECK_LOGIN');
export const getLogout = createAction('login/LOGOUT');
export const getCheckEmail = createAction('login/CHECK_EMAIL');
export const saveForm = createAction('login/SAVE_FORM');
export const initPwreset = createAction('login/INIT_PWRESET');
interface StateType {
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

const initialState: StateType = {
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

const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setInitial, (state) => initialState)
    .addCase(getCheckLogin, (state, action) => {
      // CHECK_LOGIN 처리 로직 구현
    })
    .addCase(postLogin.fulfilled, (state, action) => {
      // POST_LOGIN 성공 처리 로직
      // action.payload에 서버로부터 받은 데이터가 포함됩니다.
    })
    .addCase(postLogin.rejected, (state, action) => {
      // POST_LOGIN 실패 처리 로직
    })
    // 나머지 액션들에 대한 처리 로직 추가...
    ;
});

export default loginReducer;
