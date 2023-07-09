import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



interface stateI {
  checkUser: boolean | null,
  author: string,
  firstName: string,
  lastName: string,
}

const initialState: stateI = {
  checkUser: null,
  author: "",
  firstName: "",
  lastName: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    CheckUserFalse: (state) => {
      state.checkUser = false
    },
    CheckUserTrue: (state) => {
      state.checkUser = true
    },
    getUserId: (state, action) => {
      state.author = action.payload
    },
    getFirstName: (state, action) => {
      state.firstName = action.payload
    },
    getLastName: (state, action) => {
      state.lastName = action.payload
    },
  }
})

export const { CheckUserFalse, CheckUserTrue, getUserId, getFirstName, getLastName } = userSlice.actions

export default userSlice.reducer