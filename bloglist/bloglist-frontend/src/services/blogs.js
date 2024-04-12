import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const put = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  try {
    const response = await axios.put(baseUrl + '/' + id, newObject, config)
    console.log('Server response', response.data)
    return response.data
  } catch (error) {
    console.log('Error in put request:', error)
    throw error
  }
  //const object = { ...newObject, likes: newObject.likes + 1 }
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(baseUrl + '/' + id, config)
  return response.data
}

const newComment = async (id, comment) => {
  console.log('services/blog/test', id.id, comment)
  const config = {
    headers: { Authorization: token },
  }

  const newContent = { content: comment }
  const response = await axios.post(
    baseUrl + '/' + id.id + '/comments',
    newContent,
    config
  )
  return response.data
}

const getComments = async (id) => {
  const response = await axios.get(baseUrl + '/' + id.id + '/comments')
  return response.data
}

export default {
  getAll,
  create,
  setToken,
  put,
  deleteBlog,
  newComment,
  getComments,
}
