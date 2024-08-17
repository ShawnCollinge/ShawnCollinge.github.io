import React from 'react';
import { Box, Container, Heading, Text, Link, VStack, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const ContactPage: React.FC = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'gray.100');
  const iconColor = useColorModeValue('blue.500', 'blue.300');

  return (
    <Container
      maxW="container.lg"
      py={10}
      px={5}
      borderRadius="lg"
      boxShadow="lg"
      bgColor={bgColor}
    >
      <VStack spacing={6} align="start">
        <Heading as="h1" size="2xl" color={textColor}>
          Contact Me
        </Heading>
        <Text fontSize="lg" color={textColor}>
          Get in Touch
        </Text>
        <Text fontSize="lg" color={textColor}>
          Feel free to reach out to me via email or connect with me on LinkedIn and GitHub.
        </Text>

        <VStack spacing={4} align="start">
          <Box>
            <Icon as={FaEnvelope} color={iconColor} mr={2} />
            <Link href="mailto:shawnc6@cs.uw.edu" color="teal.500" fontSize="lg">
              shawnc6 at cs.uw.edu
            </Link>
          </Box>

          <Box>
            <Icon as={FaLinkedin} color={iconColor} mr={2} />
            <Link href="https://www.linkedin.com/in/s-collinge" isExternal color="teal.500" fontSize="lg">
              LinkedIn
            </Link>
          </Box>

          <Box>
            <Icon as={FaGithub} color={iconColor} mr={2} />
            <Link href="https://github.com/ShawnCollinge" isExternal color="teal.500" fontSize="lg">
              GitHub
            </Link>
          </Box>
        </VStack>
      </VStack>
    </Container>
  );
};

export default ContactPage;
