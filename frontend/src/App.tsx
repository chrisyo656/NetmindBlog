import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layouts/default'
import IndexPage from './pages'
import LoginPage from './pages/login'
import SignUpPage from './pages/signup'
import NewPostPage from './pages/newPost'
import PostPage from './pages/post'
import { useAuthHydration } from './hooks/useAuthHydration'
import { AuthModal } from './components/authModal'

function App() {
  // Hidratar sesión de autenticación al cargar la app
  useAuthHydration();

  return (
    <>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<IndexPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="newPost" element={<NewPostPage />} />
          <Route path="post/:id" element={<PostPage />} />
        </Route>
      </Routes>
      <AuthModal />
    </>
  )
}

export default App
