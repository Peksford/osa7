import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    increaseLike(state, action) {
      const id = action.payload
      return state.map((blog) =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      )
    },
    deleteBlogId(state, action) {
      const blogIdToDelete = action.payload
      return state.filter((blog) => blog.id !== blogIdToDelete)
    },
  },
})

export const { appendBlog, setBlogs, increaseLike, deleteBlogId } =
  blogSlice.actions

export const createBlog = (content) => {
  return async (dispatch) => {
    const NewBlog = await blogService.create(content)
    dispatch(appendBlog(NewBlog))
  }
}

export const blogLike = (blog) => {
  return async (dispatch) => {
    const likeIncrease = await blogService.put(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })
    dispatch(increaseLike(likeIncrease.id))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteBlog(id)
    dispatch(deleteBlogId(id))
  }
}

export default blogSlice.reducer
