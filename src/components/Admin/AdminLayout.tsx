import React from 'react';
import {
  Box,
  Flex,
  Text,
  Link,
  VStack,
  Divider,
  useColorModeValue,
} from '@chakra-ui/react';
import { NavLink as RouterNavLink } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
  }
  
  const Sidebar = () => {
    return (
      <Box
        as="nav"
        w={{ base: 'full', md: '250px' }}  
        pos="fixed"
        left={0}
        top={0}
        h="100vh" 
        bg={useColorModeValue('gray.100', 'gray.900')}
        p={4}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        zIndex={1} 
      >
        <VStack align="stretch" spacing={4}>
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="gray.600">
              Modify content
            </Text>
            <Divider my={2} />
            <VStack align="stretch">
              <Link
                as={RouterNavLink}
                to="/admin"
                end
                px={3}
                py={2}
                rounded="md"
                _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                _activeLink={{ bg: useColorModeValue('blue.500', 'blue.700'), color: 'white' }}
              >
                Dashboard
              </Link>
              <Link
                as={RouterNavLink}
                to="/admin/practiscore"
                px={3}
                py={2}
                rounded="md"
                _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                _activeLink={{ bg: useColorModeValue('blue.500', 'blue.700'), color: 'white' }}
              >
                Practiscore
              </Link>
              <Link
                as={RouterNavLink}
                to="/admin/skahl"
                px={3}
                py={2}
                rounded="md"
                _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                _activeLink={{ bg: useColorModeValue('blue.500', 'blue.700'), color: 'white' }}
              >
                SKAHL
              </Link>
            </VStack>
          </Box>
  
          <Box mt={6}>
            <Text fontSize="lg" fontWeight="bold" color="gray.600">
              New content
            </Text>
            <Divider my={2} />
            <VStack align="stretch">
              <Link
                as={RouterNavLink}
                to="/admin/createProject"
                px={3}
                py={2}
                rounded="md"
                _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                _activeLink={{ bg: useColorModeValue('blue.500', 'blue.700'), color: 'white' }}
              >
                Add project
              </Link>
            </VStack>
          </Box>
        </VStack>
      </Box>
    );
  };
  
  const AdminLayout: React.FC<Props> = ({ children }) => {
    return (
      <Flex>
        <Sidebar />
        <Box ml={{ base: 0 }} p={4} flex="1">
          {children}
        </Box>
      </Flex>
    );
  };
  
  export default AdminLayout;
  