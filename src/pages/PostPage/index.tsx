import React from 'react'
import { useParams } from 'react-router-dom'
import Post from '../../components/Post'

const PostPage = () => {
  const {id} = useParams<{id: string}>()

  return <Post id={id} />
}

export default PostPage