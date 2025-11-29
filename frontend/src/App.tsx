import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layouts/default'
import IndexPage from './pages'
import DesignSystemArticlePage from './pages/blog/design-system'
import LoginPage from './pages/login'
import SignUpPage from './pages/signup'
import NewPostPage from './pages/newPost'
import { useAuthHydration } from './hooks/useAuthHydration'

function App() {
  // Hidratar sesión de autenticación al cargar la app
  useAuthHydration();

  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<IndexPage />} />
        <Route path="blog/design-system" element={<DesignSystemArticlePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="newPost" element={<NewPostPage />} />
      </Route>
    </Routes>
  )
}

export default App
