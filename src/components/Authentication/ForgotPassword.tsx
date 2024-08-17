import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
  Link,
} from '@chakra-ui/react';
import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handlePasswordReset = async () => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    setLoading(false);

    if (error) {
      toast({
        title: 'Password reset failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Password reset email sent',
        description: 'Please check your email for the reset link.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/login');
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
              Forgot your password?
            </Heading>
            <Text color="fg.muted">
              Enter your email to receive a password reset link.
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
          <Stack spacing="6">
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </FormControl>
            <Stack spacing="6">
              <Button isLoading={loading} onClick={handlePasswordReset}>
                Send reset link
              </Button>
            </Stack>
          </Stack>
        </Box>
        <Text textAlign="center" color="fg.muted">
          Remembered your password?{' '}
          <Link onClick={() => navigate('/login')}>Sign in</Link>
        </Text>
      </Stack>
    </Container>
  );
};
