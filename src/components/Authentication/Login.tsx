import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { PasswordField } from './PasswordField';
import { supabase } from '../../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (error) {
      toast({
        title: 'Login failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Login successful',
        description: "You've successfully logged in.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/');
    }
  };

  return (
    <Container
      maxW="lg"
      py={{ base: '12', md: '24' }}
      px={{ base: '0', sm: '8' }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
            <Heading size={{ base: 'xs', md: 'sm' }}>
              Log in to your account
            </Heading>
            <Text color="fg.muted">
              Don&apos;t have an account?{' '}
              <Link onClick={() => navigate('/register')}>Sign up</Link>
            </Text>
          </Stack>
        </Stack>
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg.surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
        >
          <form onSubmit={handleLogin}>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </FormControl>
                <PasswordField
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Stack>
              <HStack justify="space-between">
                <Checkbox defaultChecked>Remember me</Checkbox>
                <Button
                  variant="text"
                  size="sm"
                  onClick={() => navigate('/forgotPassword')}
                >
                  Forgot password?
                </Button>
              </HStack>
              <Stack spacing="6">
                <Button type="submit" isLoading={loading}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};
