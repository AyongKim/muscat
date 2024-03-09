import axios from "../../utils/axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CompanyType } from '../../types/apps/company'; 
import { apiUrl } from '../../utils/commonValues';

const API_URL = `http://${apiUrl}/company`;

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

export const registerCompany = createAsyncThunk(
  "company/register",
  async (companyData: CompanyType, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, companyData);
      return response.data as CompanyType; // 가정: 응답 데이터가 CompanyType에 맞는 형식
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteCompanies = createAsyncThunk(
  'companies/deleteMultiple',
  async (companyIds: string[], { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/delete`, { ids: companyIds });
      return response.data; // 성공 시, 삭제된 회사 ID들을 반환하는 것으로 가정
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchCompanies = createAsyncThunk(
  "company/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data as CompanyType[]; // API 응답이 CompanyType 배열인 것으로 가정
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const CompanySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerCompany.fulfilled, (state, action) => {
        state.companies.push(action.payload);
      })
      .addCase(deleteCompanies.fulfilled, (state, action) => {
        state.companies = state.companies.filter(
          company => !action.payload.includes(company.id)
        );
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies = action.payload;
      })
      .addMatcher(
        action => action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload as string;
        }
      );
  },
});

export const { setSearchQuery } = CompanySlice.actions;

export default CompanySlice.reducer;
