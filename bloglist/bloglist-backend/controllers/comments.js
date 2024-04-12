const commentsRouter = require('express').Router()
const Blog = require('../models/blog')

commentsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body

  const commentData = {
    content: body.content,
  }

  const blogComment = await Blog.findById(request.params.id)
  blogComment.comments.push(commentData)

  const updatedBlog = await blogComment.save()

  response.status(200).json(updatedBlog)
})

commentsRouter.get('/:id/comments', async (request, response) => {
  const blogId = request.params.id
  const blog = await Blog.findById(blogId)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }
  const comments = blog.comments || []
  response.json(comments)
})

module.exports = commentsRouter
