import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Layout from './components/Layout/Layout'
import { HashRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage';
import { AuthPageType } from './types/Auth';
import ProtectedRoute from './components/Authentication/ProtectedRoute';
import CreateProject from './pages/Admin/CreateProject';
import AdminLayout from './components/Admin/AdminLayout';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<AuthPage pageType={AuthPageType.LOGIN} />} />
          <Route path="/register" element={<AuthPage pageType={AuthPageType.REGISTER} />} />
          <Route path="/forgotPassword" element={<AuthPage pageType={AuthPageType.FORGOT_PASSWORD} />} />
          <Route path="*" element={<div>Not Found</div>} />
          <Route path="/project" element={
            <ProtectedRoute>
              <CreateProject />
          </ProtectedRoute>} />
          <Route path="/admin/createProject" element={
            <ProtectedRoute>
              <AdminLayout>
                <CreateProject />
              </AdminLayout>
          </ProtectedRoute>} />
        </Routes>
      </Layout>
      </HashRouter>
    </ChakraProvider>
  )
}

export default App
