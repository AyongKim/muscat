import axios from "../../utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUrl } from '../../utils/commonValues';
import { UserType } from "../../types/apps/account";

const API_URL = `http://${apiUrl}/user`;

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
      const response = await axios.post(`${API_URL}/register`, userData);
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
      const response = await axios.post(`${API_URL}/delete`, { ids: userIds });
      return response.data;
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
      const response = await axios.get(`${API_URL}`);
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
