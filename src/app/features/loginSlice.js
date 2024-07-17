import { createSlice } from "@reduxjs/toolkit"





const initialState = {
    users:[],
    username:"",
    token:"",
    loading:false,
    error:false,
}



const loginSlice = createSlice({
    name:"login",initialState,
    reducers:{
        fetchLoginStart:state=>{
            state.loading = true;
            state.error = false;
        },
        fetchLoginFail : state => {
            state.loading = false;
            state.error = true;
        },
        fetchUsersSuccess : (state,{payload})=> {
            state.loading=false;
            state.users = payload;
        },
        fetchLoginSuccess : (state,{payload})=> {
            state.loading=false;
            state.username = payload?.username;
            state.token = payload?.accessToken;
        },
        fetchRegisterSuccess:state => {
            state.loading = false;
        },
        fetchLogoutSuccess: state => {
            state.loading = false;
            state.username = "";
            state.token = "";
        }
    }
})


export const {fetchLoginStart,fetchLoginFail,fetchUsersSuccess, fetchLoginSuccess,fetchRegisterSuccess,fetchLogoutSuccess} = loginSlice.actions;
export default loginSlice.reducer;