import { createSlice } from '@reduxjs/toolkit'
interface stateI {
  checkUser: boolean | null,
  author: string,
  firstName: string,
  lastName: string,
  updatePosts: boolean,
}

const initialState: stateI = {
  checkUser: null,
  author: "",
  firstName: "",
  lastName: "",
  updatePosts: false,
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
    getUpdatePosts: (state) => {
      state.updatePosts = !state.updatePosts;
    },
  }
})

export const { CheckUserFalse, CheckUserTrue, getUserId, getFirstName, getLastName, getUpdatePosts } = userSlice.actions

export default userSlice.reducer