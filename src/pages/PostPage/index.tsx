import { useNavigate, useParams } from 'react-router-dom'
import Post from '../../components/Post'
import { Button } from '@mui/material'
import s from './postPage.module.scss'

const PostPage = () => {
  const {id} = useParams<{id: string}>()
  const nav = useNavigate()

  return (
    <>
      <header className={s.header}>
        <Button variant='contained' size='small' onClick={() => nav(-1)}>&lt; Back</Button>
        <h1 className='title'>Post {id}</h1>
      </header>
      <Post id={id} />
    </>
  )
}

export default PostPage