import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


const initialState = {
    isAuthenticated: false,
    user: {
        emai: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: ""
    }
};

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        runLoginAction: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers.
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        runGetAccountActon: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers.
            state.isAuthenticated = true;
            state.user = action.payload.user;
        },
        runLogoutAction: (state, action) => {
            state.isAuthenticated = false;
            localStorage.removeItem('access_token');
            state.user = {
                emai: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            }
        }
    },

    extraReducers: (builder) => {

    },
});

export const { runLoginAction, runGetAccountActon, runLogoutAction } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.counter.value;


export default counterSlice.reducer;
