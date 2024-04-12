import { useEffect, useState } from 'react'
import { blogLike, deleteBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  notificationHide,
  notificationShow,
} from '../reducers/notificationReducer'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom'
import { setUser } from '../reducers/loginReducer'
import Notification from './Notification'
import NewComment from './CommentForm'
import blogService from '../services/blogs'
import { setComments } from '../reducers/commentReducer'
import { Table } from 'react-bootstrap'

export const SingleBlog = ({ user }) => {
  const comments = useSelector((state) => state.comments)
  const blogs = useSelector((state) => state.blogs)

  const id = useParams().id
  const dispatch = useDispatch()
  const [newMessage, setMessage] = useState(null)

  const blogToFind = blogs !== undefined ? blogs.find((n) => n.id === id) : null
  const commentators = blogToFind !== undefined ? blogToFind.comments : null

  useEffect(() => {
    dispatch(setComments(commentators))
  }, [commentators, dispatch])

  if (!blogToFind) {
    return null
  }
  //dispatch(setComments(comments))
  if (!comments) {
    return null
  }

  const like = (blog) => {
    dispatch(blogLike(blog))
    dispatch(notificationShow(`you liked a blog '${blog.title}'`))

    setTimeout(() => dispatch(notificationHide('')), 5000)
  }

  const CommentList = (id) => {
    // if (comments[comments.length - 1] === undefined) {
    //   return null
    // }
    return (
      <div>
        <NewComment id={id} />
        <ul>
          {comments &&
            comments.map((comment, index) => (
              <li key={comment._id || index}>{comment.content}</li>
            ))}
        </ul>
      </div>
    )
  }

  //  console.log(
  //    'Why new comment is undefined?',
  //    comments.map((comment) => comment.content)
  //  )

  return (
    <div>
      <Notification message={newMessage} />
      <h2>blog app</h2>
      <h1>
        {blogToFind.title} {blogToFind.author}
      </h1>
      <p>
        <a href={`https://${blogToFind.url}`}>{blogToFind.url}</a>
      </p>
      <p>
        {blogToFind.likes} likes{' '}
        <button id="like-button" onClick={() => like(blogToFind)}>
          like
        </button>
      </p>
      <p>added by {blogToFind.user.name}</p>
      <h2>comments</h2>
      <CommentList id={blogToFind.id} />
    </div>
  )
}

const Blog = ({ blog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const dispatch = useDispatch()

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const like = (blog) => {
    dispatch(blogLike(blog))
    dispatch(notificationShow(`you liked a blog '${blog.title}'`))

    setTimeout(() => dispatch(notificationHide('')), 5000)
  }

  const handleDelete = (blog, id) => {
    console.log(id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(id))
      dispatch(notificationShow(`you deleted a blog '${blog.title}'`))

      setTimeout(() => dispatch(notificationHide('')), 5000)
    }
  }

  return (
    <div className="blog">
      <div>
        <Table striped>
          <tbody>
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}{' '}
                </Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      {/*<div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <br></br>
        {blog.url}
        <br></br>
        likes {blog.likes}{' '}
        <button id="like-button" onClick={() => like(blog)}>
          like
        </button>
        <br></br>
        {blog.user?.name ? (
          <div>{blog.user.name}</div>
        ) : (
          <div>User not available</div>
        )}
        {blog.user?.username === user.username ? (
          <button
            id="remove-button"
            onClick={() => handleDelete(blog, blog.id)}
          >
            remove
          </button>
        ) : (
          <div></div>
        )}
      </div>
        */}
    </div>
  )
}

export default Blog
