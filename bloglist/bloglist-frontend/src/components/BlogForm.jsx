import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  notificationHide,
  notificationShow,
} from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const NewBlog = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const dispatch = useDispatch()

  const createNew = (event) => {
    event.preventDefault()
    dispatch(
      createBlog({
        title: newTitle,
        author: newAuthor,
        url: newUrl,
      })
    )
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    dispatch(notificationShow(`you created a blog '${newTitle}'`))

    setTimeout(() => dispatch(notificationHide('')), 5000)
  }

  return (
    <form onSubmit={createNew}>
      <div>
        title:
        <input
          id="title"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          placeholder="input title"
        />
      </div>
      <div>
        author:
        <input
          id="author"
          value={newAuthor}
          onChange={(event) => setNewAuthor(event.target.value)}
          placeholder="input author"
        />
      </div>
      <div>
        url:
        <input
          id="url"
          value={newUrl}
          onChange={(event) => setNewUrl(event.target.value)}
          placeholder="input url"
        />
      </div>
      <div>
        <button id="create-button" type="submit">
          create
        </button>
      </div>
    </form>
  )
}

export default NewBlog
