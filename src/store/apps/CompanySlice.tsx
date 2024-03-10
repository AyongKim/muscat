import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CompanyType } from '../../types/apps/company'; 
import { apiUrl } from '../../utils/commonValues';
import { dispatch } from '../Store';

const API_URL = `http://${apiUrl}company`;

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
  async (companyData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, companyData);
      return response.data ; 
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
  "company/List",
  async (_, { rejectWithValue }) => {
    try {
      console.log(`${API_URL}/List`);
      const response = await axios.post(`${API_URL}/List`);
      return response.data;
    } catch (error: any) {
      console.log(error);
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

export const {  
  setSearchQuery, 
} = CompanySlice.actions;
 

export default CompanySlice.reducer;
