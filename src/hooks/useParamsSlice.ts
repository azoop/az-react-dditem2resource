import { createSlice } from '@reduxjs/toolkit'

const useParamsSlice = (params: any) => {
  const initialState = params
  const paramsSlice = createSlice({
    name: 'az/dditem2resource/params',
    initialState,
    reducers: {
      paramsSet: (state, action) => {
        state = { ...state, ...action.payload }
      }
    }
  })

  return {
    paramsSlice
  }
}

export { useParamsSlice }
