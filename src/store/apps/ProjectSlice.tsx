import axios from 'axios';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ProjectType } from '../../types/apps/project'; // Assuming ProjectType is defined elsewhere
import { apiUrl } from '../../utils/commonValues';
import { dispatch } from '../Store';

const API_URL = `http://${apiUrl}project`; // Assuming project API endpoint is different

interface StateType {
  projects: ProjectType[]; // Assuming ProjectType is defined elsewhere
  searchQuery: string;
  error: string | null;
}

const initialState: StateType = {
  projects: [],
  searchQuery: "",
  error: null,
};

export const registerProject = createAsyncThunk(
  "project/Register",
  async (projectData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/Register`, projectData);
      return { ...response.data, projectData: { ...projectData, id: response.data.id } };
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteProjects = createAsyncThunk(
  'projects/deleteMultiple',
  async (projectIds: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/Delete`, {
        data: { str_ids: projectIds }
      });
      
      return { ...response.data, deletedProjectIds: projectIds};
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const fetchProjects = createAsyncThunk(
  "project/List",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/List`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data);
    }
  }
);

export const ProjectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setSearchQuery(state, action) {
      state.searchQuery = action.payload;
    }, 
  },
  extraReducers: (builder) => {
    builder 
      .addCase(registerProject.fulfilled, (state, action) => {
        const projectData = action.payload.projectData; 
        state.projects.push(projectData);
      })
      .addCase(deleteProjects.fulfilled, (state, action) => {
        if (action.payload.result === "SUCCESS") {
          const deletedProjectIds = action.payload.deletedProjectIds;
          state.projects = state.projects.filter(
            project => !deletedProjectIds.includes(project.id)
          );
        } else {
          // Handle deletion failure
        }
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projects = action.payload;
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
} = ProjectSlice.actions;
 

export default ProjectSlice.reducer;
