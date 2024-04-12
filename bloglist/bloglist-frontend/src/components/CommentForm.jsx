import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addComment, setComments } from '../reducers/commentReducer'
import blogService from '../services/blogs'

const NewComment = (id) => {
  const [newComment, setNewComment] = useState('')
  const blogId = id.id

  const dispatch = useDispatch()

  const createComment = async (event) => {
    event.preventDefault()
    dispatch(addComment(blogId, newComment))

    const updatedComments = await blogService.getComments(blogId)

    dispatch(setComments(updatedComments))

    setNewComment('')
  }

  return (
    <form onSubmit={createComment}>
      <div>
        <input
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
        />
        <button type="submit">add comment</button>
      </div>
    </form>
  )
}

export default NewComment
