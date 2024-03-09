import axios from "../../utils/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CompanyType } from '../../types/apps/company'; 
// 비동기 액션을 위한 API 경로
const API_URL = "/api/data/eCommerce/CompanyData";
 
interface StateType {
  companies: CompanyType[];
  searchQuery: string;
  error: string | null;
}

const initialState: StateType = {
  companies: [],
  searchQuery: "",
  error: null,
};

// 회사 정보를 등록하는 비동기 액션
export const registerCompany = createAsyncThunk(
  "company/register",
  async (companyData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, companyData);
      return response.data;
    } catch (error : any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 회사 정보를 삭제하는 비동기 액션
export const deleteCompany = createAsyncThunk(
  "company/delete",
  async (companyId: string, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${companyId}`);
      return companyId;
    } catch (error : any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 회사 정보를 검색하는 액션(동기)
// 비동기 API 호출이 아니라, 클라이언트 측에서의 검색을 가정함

// 회사 정보를 얻는 비동기 액션
export const fetchCompanies = createAsyncThunk(
  "company/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error : any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const CompanySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    // 검색 쿼리를 설정하는 동기 액션
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCompany.fulfilled, (state, action) => {
        state.companies.push(action.payload);
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.companies = state.companies.filter(
          (company) => company.id !== action.payload
        );
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload;
        }
      );
  },
});

export const { setSearchQuery } = CompanySlice.actions;

export default CompanySlice.reducer;
