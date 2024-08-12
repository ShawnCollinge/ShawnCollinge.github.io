import React from 'react';
import {
  Box,
  Flex,
  Container,
} from '@chakra-ui/react';
import NavBar from './Navbar';
import Footer from './Foot';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (
    <Flex direction="column" minHeight="100vh">
      <NavBar />
        <Box as="main" flexGrow={1} p="4">
          <Container maxW="container.xl" py={8}>
            {children}
          </Container>
        </Box>
      <Footer />
    </Flex>
  );
};


export default Layout;