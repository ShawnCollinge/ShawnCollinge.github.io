import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Container,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import useAuthStatus from '../../hooks/useAuthStatus';
import { supabase } from '../../utils/supabaseClient';

interface Props {
  children: React.ReactNode;
}

const NavLink = (props: Props) => {
  const { children } = props;

  // Move useColorModeValue to the top level to avoid conditional hook issues
  const hoverBg = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: hoverBg,
      }}
      href={'#'}
    >
      {children}
    </Box>
  );
};

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const { user, loading } = useAuthStatus();

  // Ensure that all useColorModeValue calls are consistent
  const bg = useColorModeValue('gray.100', 'gray.900');
  const hoverBg = useColorModeValue('gray.200', 'gray.700');
  const activeBg = useColorModeValue('gray.300', 'gray.600');

  if (loading) {
    return null;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <Box bg={bg} px={4}>
      <Container maxW="container.xl" py={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Box>
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              _hover={{ bg: hoverBg }}
              _active={{ bg: activeBg }}
              px={4}
              py={2}
              fontSize="lg"
              fontWeight="bold"
            >
              Shawn Collinge
            </Button>
          </Box>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              {user ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={'0'}
                  >
                    <Avatar
                      size={'sm'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </MenuButton>
                  <MenuList alignItems={'center'}>
                    <br />
                    <Center>
                      <Avatar
                        size={'2xl'}
                        src={'https://avatars.dicebear.com/api/male/username.svg'}
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{user.email}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <NavLink>Profile</NavLink>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Button
                  onClick={() => navigate('/login')}
                  variant="solid"
                  colorScheme="blue"
                >
                  Login
                </Button>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
