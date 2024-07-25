import {createSlice} from '@reduxjs/toolkit'


const initialState={
    loading:false,
    error:null,
    user:null,
    onlineUser:[],
    socketConnection:null
}

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        signInPending: (state) => {
            state.loading = true
          },
          signInSuccess: (state, action) => {
            state.loading = false
            state.error = null
            state.user = action.payload
            // toast(action.payload.message)
          },
          signInRejected: (state, action) => {
            state.loading = false
            state.error = action.payload
            // toast(action.payload.message)
          },
          setOnlineUser:(state,action)=>{
            state.onlineUser=action.payload
          },
          setSocketConnection:(state,action)=>{
            state.socketConnection=action.payload;
          },
          handleLogOut:(state,action)=>{
            state.user=null
          }
    }
})


export const {signInPending,signInRejected,signInSuccess,setOnlineUser,setSocketConnection,handleLogOut}=authSlice.actions

export default authSlice.reducer