import { useEffect, useState } from 'react'
import LoadingGif from '../../assets/loading.gif'
import s from './post.module.scss'
import { IComment, IPost } from '../../types'

interface PostProps {
  id: string | undefined
}

const Post = ({id}: PostProps) => {
  const [post, setPost] = useState<IPost>()
  const [comments, setComments] = useState<IComment[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const getPostAndComments = async () => {
      setIsLoading(true)
      try {
        const responses = await Promise.all([
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}`),
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
        ])
        const [postData, commentsData] = await Promise.all(responses.map(response => response.json()))
        setPost(postData)
        setComments(commentsData)
      } catch (error) {
        setError(true)
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    getPostAndComments()
  }, [id])

  if (isLoading) {
    return (
      <div className='loading'><img src={LoadingGif} alt="Loading" /></div>
    )
  }

  if (error) {
    return (
      <div className='error'>Error geting post</div>
    )
  }

  return (
    <div className={s.post}>
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