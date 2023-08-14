import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: "fiat han",user:[]
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state,action) => {
      state.value = "fiat login"
      state.user=action.payload
    },
    logout: (state) => {
      state.user=[]
      localStorage.clear('token')
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout, incrementByAmount } = userSlice.actions

export default userSlice.reducer