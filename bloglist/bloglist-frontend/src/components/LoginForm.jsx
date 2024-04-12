import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setUser, userLogin } from '../reducers/loginReducer'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { Table, Form, Button } from 'react-bootstrap'
import {
  notificationHide,
  notificationShow,
  setNotification,
} from '../reducers/notificationReducer'

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return <div className="error">{message}</div>
}

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await dispatch(userLogin(username, password))
      console.log('TOKENI', user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch(setUser(user))
      dispatch(notificationShow(`Welcome ${user.name}!`))

      setTimeout(() => dispatch(notificationHide('')), 5000)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  handleLogin.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }

  return (
    <div className="container">
      <h2>Log in to JPs Web Page!</h2>
      <ErrorMessage message={errorMessage} />
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant="primary" id="login-button" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default LoginForm
