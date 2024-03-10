import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrl } from '../../utils/commonValues';
import { UserType } from "../../types/apps/account";

const API_URL = `http://${apiUrl}user`;

interface StateType {
  users: UserType[];
  searchQuery: string;
  error: string | null;
}

const initialState: StateType = {
  users: [],
  searchQuery: "",
  error: null,
};

// 유저 등록
export const registerUser = createAsyncThunk(
  "user/register",
  async (userData: UserType, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/SignUp`, userData);
      return response.data as UserType; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// 유저 삭제
export const deleteUsers = createAsyncThunk(
  'user/deleteMultiple',
  async (userIds: string[], { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/Delete`, { ids: userIds });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// 유저 정보 업데이트
export const updateUser = createAsyncThunk(
  "user/update",
  async (userData: UserType, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/Update`, userData); // 사용자의 ID를 기반으로 업데이트 요청
      return response.data as UserType; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);


// 유저 정보 가져오기
export const fetchUsers = createAsyncThunk(
  "user/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/List`);
      return response.data as UserType[]; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.users = state.users.filter(
          user => !action.payload.includes(user.user_email) // 삭제 로직은 user_email 또는 다른 식별자를 기준으로 수정해야 할 수 있음
        );
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        // 업데이트된 사용자 정보로 기존 사용자 정보를 교체
        state.users = state.users.map(user =>
          user.user_id === action.payload.user_id ? action.payload : user
        );
      })
      .addMatcher(
        action => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload as string;
        }
      );
  },
});

export const { setSearchQuery } = UserSlice.actions;

export default UserSlice.reducer;
