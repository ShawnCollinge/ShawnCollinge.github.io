import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Layout from './components/Layout/Layout';
import { HashRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import { AuthPageType } from './types/Auth';
import ProtectedRoute from './components/Authentication/ProtectedRoute';
import CreateProject from './pages/Admin/CreateProject';  
import ProjectsPage from './pages/ProjectsPage';
import ViewProject from './pages/ProjectPage';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ContactPage from './pages/Contact';
import UpdateProject from './pages/Admin/UpdateProject';
import EditMainPage from './components/Admin/EditMainPage';

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
            <Route
              path="/login"
              element={<AuthPage pageType={AuthPageType.LOGIN} />}
            />
            <Route
              path="/register"
              element={<AuthPage pageType={AuthPageType.REGISTER} />}
            />
            <Route
              path="/forgotPassword"
              element={<AuthPage pageType={AuthPageType.FORGOT_PASSWORD} />}
            />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ViewProject />} />
            <Route path="*" element={<div>Not Found</div>} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/admin/createProject"
              element={
                <ProtectedRoute>
                  <CreateProject  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/editBio"
              element={
                <ProtectedRoute>
                  <EditMainPage  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/editProject/:id"
              element={
                <ProtectedRoute>
                  <UpdateProject />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </HashRouter>
    </ChakraProvider>
  );
}

export default App;
