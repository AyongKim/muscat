import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import EcommerceReducer from './apps/eCommerce/ECommerceSlice'; 
import CompanyReducer from './apps/CompanySlice'; 
import NotesReducer from './apps/notes/NotesSlice'; 
import TicketReducer from './apps/tickets/TicketSlice';  
import { combineReducers } from 'redux';
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import authReducer from './authSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customizer: CustomizerReducer,
    ecommerceReducer: EcommerceReducer,  
    notesReducer: NotesReducer, 
    ticketReducer: TicketReducer, 
    companyReducer: CompanyReducer, 
    
  },
});

const rootReducer = combineReducers({
  auth: authReducer,
  customizer: CustomizerReducer,
  ecommerceReducer: EcommerceReducer,  
  notesReducer: NotesReducer, 
  ticketReducer: TicketReducer, 
  companyReducer: CompanyReducer, 
});

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const { dispatch } = store;
export const useDispatch = () => useAppDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<AppState> = useAppSelector;

export default store;
