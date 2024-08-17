import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Container,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import useAuthStatus from '../../hooks/useAuthStatus';
import { supabase } from '../../utils/supabaseClient';

export default function NavBar() {
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuthStatus();

  const handleLogin = async () => {
    if (user) {
      await supabase.auth.signOut();
    } else {
      navigate('/login');
    }
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('gray.100', 'gray.900')}
        color={useColorModeValue('gray.600', 'white')}
        minH="60px"
        py={{ base: 2 }}
        borderBottom={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        align="center"
      >
        <Container maxW="container.xl">
          <Flex align="center">
            <Flex
              flex={{ base: 1, md: 'auto' }}
              ml={{ base: -2 }}
              display={{ base: 'flex', md: 'none' }}
            >
              <IconButton
                onClick={onToggle}
                icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                variant="ghost"
                aria-label="Toggle Navigation"
              />
            </Flex>
            <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
              <Text
                textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                fontFamily="heading"
                color={useColorModeValue('gray.800', 'white')}
                cursor="pointer"
                onClick={() => navigate('/')}
              >
                Shawn Collinge
              </Text>

              <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                <DesktopNav navigate={navigate} isAdmin={isAdmin} />
              </Flex>
            </Flex>

            <Stack
              flex={{ base: 1, md: 0 }}
              justify="flex-end"
              direction="row"
              spacing={6}
            >
              <Button
                onClick={() => void handleLogin()}
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg="blue.400"
                _hover={{
                  bg: 'blue.500',
                }}
              >
                {user ? 'Logout' : 'Login'}
              </Button>
            </Stack>
          </Flex>
        </Container>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav navigate={navigate} isAdmin={isAdmin} />
      </Collapse>
    </Box>
  );
}

interface NavItem {
  label: string;
  href: string;
}

const DesktopNav = ({ navigate, isAdmin }: { navigate: (href: string) => void; isAdmin: boolean }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');

  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Text
          key={navItem.label}
          fontSize="sm"
          fontWeight={500}
          color={linkColor}
          cursor="pointer"
          _hover={{
            textDecoration: 'none',
            color: linkHoverColor,
          }}
          onClick={() => navigate(navItem.href)}
        >
          {navItem.label}
        </Text>
      ))}
      {isAdmin && ADMIN_NAV_ITEMS.map((navItem) => (
        <Text
          key={navItem.label}
          fontSize="sm"
          fontWeight={500}
          color={linkColor}
          cursor="pointer"
          _hover={{
            textDecoration: 'none',
            color: linkHoverColor,
          }}
          onClick={() => navigate(navItem.href)}
        >
          {navItem.label}
        </Text>
      ))}
    </Stack>
  );
};

const MobileNav = ({ navigate, isAdmin }: { navigate: (href: string) => void; isAdmin: boolean }) => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <Text
          key={navItem.label}
          py={2}
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
          cursor="pointer"
          onClick={() => navigate(navItem.href)}
        >
          {navItem.label}
        </Text>
      ))}
      {isAdmin && NAV_ITEMS.map((navItem) => (
        <Text
          key={navItem.label}
          py={2}
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
          cursor="pointer"
          onClick={() => navigate(navItem.href)}
        >
          {navItem.label}
        </Text>
      ))}
    </Stack>
  );
};

const ADMIN_NAV_ITEMS: NavItem[] = [
  { label: 'Admin', href: '/admin' }
];

const NAV_ITEMS: NavItem[] = [
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];
