import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const commentSlice = createSlice({
  name: 'comments',
  initialState: [],
  reducers: {
    setComments(state, action) {
      console.log('reducers/commentReducer', action.payload)
      return action.payload
    },
    appendComment(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setComments, appendComment } = commentSlice.actions

export const addComment = (id, content) => {
  return async (dispatch) => {
    const comment = await blogService.newComment(id, content)
    dispatch(appendComment(comment))
    const comments = await blogService.getComments(id)
    dispatch(setComments(comments))
  }
}

export default commentSlice.reducer
