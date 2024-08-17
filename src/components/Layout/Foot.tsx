import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaMoon, FaSun } from 'react-icons/fa';


export default function Footer() {
  const { colorMode, toggleColorMode } = useColorMode()
  const buttonProps = {
    bg: useColorModeValue('blackAlpha.100', 'whiteAlpha.100'),
    rounded: "full",
    w: 8,
    h: 8,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background 0.3s ease",
    _hover: {
      bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
    }
  };

  const urlProps = {
    target: "_blank",
    rel: "noopener noreferrer"
  }

  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© 2024 Shawn Collinge</Text>
        <Stack direction="row" spacing={6}>
          <chakra.button
            {...buttonProps}
            onClick={toggleColorMode}
          >
            <VisuallyHidden>Github</VisuallyHidden>
            {colorMode === 'light' ? <FaMoon /> : <FaSun />}
          </chakra.button>
          <chakra.button
            {...buttonProps}
            as="a"
            href="https://github.com/ShawnCollinge"
            {...urlProps}
          >
            <VisuallyHidden>Github</VisuallyHidden>
            <FaGithub />
          </chakra.button>
          <chakra.button
            {...buttonProps}
            {...urlProps}
            as="a"
            href="https://github.com/ShawnCollinge"
          >
            <VisuallyHidden>LinkedIn</VisuallyHidden>
            <FaLinkedin />
          </chakra.button>
        </Stack>
      </Container>
    </Box>
  );
}
