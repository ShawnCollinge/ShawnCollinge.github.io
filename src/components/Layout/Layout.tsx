import React from 'react';
import { Box, Flex, Container } from '@chakra-ui/react';
import NavBar from './Navbar';
import Footer from './Foot';
import Sidebar from '../Admin/AdminLayout';
import { useLocation } from 'react-router-dom';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const sidebarPaths = ['/admin', '/admin/createProject', 'admin/editProject', '/admin/practiscore', '/admin/skahl'];
  const shouldShowSidebar = sidebarPaths.some((path) =>
    location.pathname.startsWith(path)
  );
  return (
    <Flex direction="column" minHeight="100vh">
      <NavBar />
      <Flex flex="1" width="100%">
        {shouldShowSidebar && <Sidebar />}
        <Box as="main" flex="1" p="4" overflow='hidden'>
          <Container maxW="container.xl" py={8}>
            {children}
          </Container>
        </Box>
      </Flex>
      <Footer />
    </Flex>
  );
};

export default Layout;
