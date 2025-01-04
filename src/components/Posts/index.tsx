import React, { useEffect, useState } from 'react'
import { Button, Card, CardContent } from '@mui/material';
import s from './posts.module.scss'
import { Link } from 'react-router-dom';

interface Post {
  id: number,
  userId: number,
  title: string,
  body: string
}

const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')
        if (response.ok) {
          const json = await response.json()
          setPosts(json)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getPosts()
  }, [])

  return (
    <div className={s.posts}>
      <h1 className={s.postsTitle}>Posts</h1>
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