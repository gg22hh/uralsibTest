import Home from './pages/Home'
import { Routes, Route } from 'react-router-dom'
import PostPage from './pages/PostPage'
import './App.css'

function App() {

  return (
    <main>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/posts/:id' element={<PostPage />} />
      </Routes>
    </main>
  )
}

export default App
