import { useDispatch, useSelector } from 'react-redux'
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
import { Alert, Navbar } from 'react-bootstrap'
import { Nav } from 'react-bootstrap'

const Menu = (user) => {
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch()
  const padding = {
    paddingRight: 5,
  }

  const style = {
    padding: 10,
    borderWidth: 1,
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logging out with', user)

    window.localStorage.removeItem('loggedBlogappUser', JSON.stringify(user))

    dispatch(setUser(null))
  }

  return (
    <div className="container">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                blogs
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                users
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user.user.name} logged in
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <button type="button" onClick={handleLogout}>
        logout
      </button>
      {notification && (
        <Alert variant="success">
          <Notification />
        </Alert>
      )}
    </div>
  )
}

export default Menu
