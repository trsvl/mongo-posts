import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



interface stateI {
  name: string,
}

const initialState: stateI = {
  name: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    }
  }
})

export const { getName } = userSlice.actions

export default userSlice.reducer