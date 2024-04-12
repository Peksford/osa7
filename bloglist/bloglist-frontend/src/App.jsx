import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import './index.css'
import './components/Togglable'
import Togglable from './components/Togglable'
import NewBlog from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import Users from './components/Users'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom'
import userService from './services/users'
import { SingleBlog } from './components/Blog'
import Menu from './components/Menu'
import { setComments } from './reducers/commentReducer'

const App = () => {
  const blogs = useSelector((state) => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const user = useSelector((state) => state.user)
  const [userInfo, setUserInfo] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      try {
        const user = JSON.parse(loggedUserJSON)
        dispatch(setUser(user))
        blogService.setToken(user.token)
      } catch (error) {
        console.error('Error', error)
      }
    }
  }, [dispatch])

  useEffect(() => {
    userService.getAll().then((users) => setUserInfo(users))
  }, [dispatch])

  useEffect(() => {
    if (user) {
      userService.getAll().then((users) => setUserInfo[users])
    }
  }, [user])

  const BlogList = () => {
    return (
      <div>
        <h2>blog app</h2>
        <h2>create new</h2>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <NewBlog />
        </Togglable>
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} buttonLabel="show" />
        ))}
      </div>
    )
  }

  const User = ({ userInfo }) => {
    const id = useParams().id

    const userToFind = userInfo.find((n) => n.id === id)

    if (!userToFind) {
      return null
    }

    return (
      <div>
        <h2>blogs</h2>
        <h2>{userToFind.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {userToFind.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
  }

  const blogFormRef = useRef()

  if (user === null) {
    return <LoginForm />
  }

  return (
    <div className="container">
      <Router>
        <Menu user={user} />
        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User userInfo={userInfo} />} />
          <Route
            path="/blogs/:id"
            element={<SingleBlog blogs={blogs} user={user} />}
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App
