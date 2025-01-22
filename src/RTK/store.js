import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/authSlice';
import reportReducer from './Slices/reportSlice';
import roomReducer from './Slices/roomSlice';
import studentReducer from './Slices/studentSlice';
import paymentReducer from "./Slices/paymentSlice";
import expenseReducer from "./Slices/expenseSlice";
import requestReducer from './Slices/requestSlice';
const store = configureStore({
    reducer: {  
        auth: authReducer,
        report:reportReducer,
        rooms:roomReducer,
        students:studentReducer,
        payment:paymentReducer,
        expenses:expenseReducer,
        requests:requestReducer,
    },
});

export default store;
