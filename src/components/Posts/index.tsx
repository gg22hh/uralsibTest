import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent } from '@mui/material';
import s from './posts.module.scss'
import { Link } from 'react-router-dom';
import LoadingGif from '../../assets/loading.gif'
import { IPost } from '../../types';

const Posts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        if (response.ok) {
          const json = await response.json()
          setPosts(json)
        }
      } catch (error) {
        setError(true)
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    getPosts()
  }, [])

  if (isLoading) {
    return (
      <div className='loading'><img src={LoadingGif} alt="Loading" /></div>
    )
  }
  
  if (error) {
    return (
      <div className='error'>Error geting posts</div>
    )
  }

  return (
    <div className={s.posts}>
      <div className={s.postsList}>
        {posts.map(post => {
          return (
            <Card key={post.id} variant='outlined' className={s.post}>
              <CardContent>
                <div>{post.id}</div>
                <div className={s.postInfo}>
                  <div>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                  </div>
                  <Link to={`/posts/${post.id}`}>
                    <Button variant='outlined' size='small'>View</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default Posts