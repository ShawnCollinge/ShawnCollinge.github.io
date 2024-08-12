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
  } from '@chakra-ui/react'
  import { useState } from 'react'
  import { PasswordField } from './PasswordField'
  import { supabase } from '../../utils/supabaseClient'
import { useNavigate } from 'react-router-dom'
  
  export const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const navigate = useNavigate();
  
    const handleRegister = async () => {
      setLoading(true)
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      setLoading(false)
  
      if (error) {
        toast({
          title: 'Registration failed',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      } else {
        toast({
          title: 'Registration successful',
          description: 'Please check your email for a confirmation link.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        navigate('/login');
    }
    }
  
    return (
      <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
        <Stack spacing="8">
          <Stack spacing="6">
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
              <Heading size={{ base: 'xs', md: 'sm' }}>Create your account</Heading>
              <Text color="fg.muted">
                Already have an account? <Link onClick={() => navigate('/login')}>Sign in</Link>
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
              <Stack spacing="5">
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <PasswordField
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Stack>
              <Stack spacing="6">
                <Button isLoading={loading} onClick={handleRegister}>
                  Register
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Container>
    )
  }
  