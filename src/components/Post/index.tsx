import React, { useEffect, useState } from 'react'
import s from './post.module.scss'

interface PostProps {
  id: string | undefined
}

interface Post {
  id: number,
  userId: number,
  title: string,
  body: string
}

interface Comment {
  id: number,
  postId: number,
  name: string,
  email: string,
  body: string
}

const Post = ({id}: PostProps) => {
  const [post, setPost] = useState<Post>()
  const [comments, setComments] = useState<Comment[]>([])

  useEffect(() => {
    const getPostAndComments = async () => {
      try {
        const responses = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        ])
        const [postData, commentsData] = await Promise.all(responses.map(response => response.json()))
        setPost(postData)
        setComments(commentsData)
      } catch (error) {
        console.log(error)
      }
    }

    getPostAndComments()
  }, [id])

  console.log(post, 'post')
  console.log(comments, 'comments')

  return (
    <div className={s.post}>
      <h1>Post {id}</h1>
      <h2>{post?.title}</h2>
      <p>{post?.body}</p>
      <h3>Comments:</h3>
      <ol>
        {comments?.map(comment => {
          return (
            <li key={comment.id}>
              <h4>{comment.name}</h4>
              <div>{comment.email}</div>
              <p>{comment.body}</p>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default Post