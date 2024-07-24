import {createSlice} from '@reduxjs/toolkit'


const initialState={
    loading:false,
    error:null,
    user:null
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
    }
})


export const {signInPending,signInRejected,signInSuccess}=authSlice.actions

export default authSlice.reducer