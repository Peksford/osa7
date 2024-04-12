import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/loginReducer'
import userService from '../services/users'
import { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
} from 'react-router-dom'

const Users = () => {
  const dispatch = useDispatch()
  const [userBlog, setUserBlog] = useState([])

  useEffect(() => {
    userService.getAll().then((userBlog) => setUserBlog(userBlog))
  }, [userBlog])

  return (
    <div>
      <h2>blog app</h2>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {userBlog.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/users/${blog.id}`}>{blog.name}</Link>
              </td>
              <td>{blog.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
