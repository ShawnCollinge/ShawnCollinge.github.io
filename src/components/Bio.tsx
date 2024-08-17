import { useEffect, useState } from 'react';
import {
  Container,
  Stack,
  Flex,
  Box,
  Button,
  Image,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import HighlightedHeading from './utils/ContainerUtils';
import { supabase } from '../utils/supabaseClient';
import { Markdown } from '../utils/markdownUtils';
import { Blob } from '../utils/blob';
import { leftButton, rightButton } from '../utils/buttonProps';


export default function HomePageBio() {
  const [description, setDescription] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const bgColor = useColorModeValue('blue.50', 'blue.400')
  const bgColor2 = useColorModeValue('gray.500', 'gray.200')

  useEffect(() => {
    const fetchMainPageContent = async () => {
      const { data, error } = await supabase
        .from('home_page')
        .select('description, image_url')
        .returns<{ description: string; image_url: string }[]>()
        .single();

      if (error) {
        console.error('Failed to fetch main page content:', error.message);
      } else if (data) {
        setDescription(data.description);
        setImageUrl(data.image_url);
      }
      setLoading(false);
    };

    fetchMainPageContent();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" height="80vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Container maxW="7xl">
      <Stack
        align="center"
        direction={{ base: 'column', md: 'row' }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <HighlightedHeading>
            Welcome to my website!
          </HighlightedHeading>
          <Box color={bgColor2} fontSize="lg">
            <Markdown>{description}</Markdown>
          </Box>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: 'column', sm: 'row' }}
          >
            <Button
              {...leftButton}
              onClick={() => navigate('/projects')}
            >
              View My Projects
            </Button>
            <Button
              {...rightButton}
              onClick={() => navigate('/contact')}
            >
              Contact Me
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify="center"
          align="center"
          position="relative"
          w="full"
        >
          <Blob
            w="150%"
            h="150%"
            position="absolute"
            top="-20%"
            left={0}
            zIndex={-1}
            color={bgColor}
          />
          <Box
            position="relative"
            height="350px"
            rounded="2xl"
            boxShadow="2xl"
            width="full"
            overflow="hidden"
          >
            <Image
              alt="Hero Image"
              fit="cover"
              align="center"
              w="100%"
              h="100%"
              src={imageUrl || 'https://via.placeholder.com/600x400'}
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}