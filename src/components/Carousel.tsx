import React, { useState } from 'react';
import {
  Box,
  Flex,
  Image,
  IconButton,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface CarouselProps {
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const hoverColor = useColorModeValue('whiteAlpha.900', 'blackAlpha.900');
  const bgColor = useColorModeValue('whiteAlpha.800', 'blackAlpha.800');

  const prevSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const nextSlide = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <Box
      position="relative"
      width="full"
      maxW="800px"
      mx="auto"
      overflow="hidden"
    >
      <Flex>
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`Slide ${index}`}
            width="100%"
            height="auto"
            maxH="400px"
            objectFit="cover"
            display={index === currentIndex ? 'block' : 'none'}
            borderRadius="md"
          />
        ))}
      </Flex>
      {images.length > 1 && (
        <>
          <IconButton
            aria-label="Previous Slide"
            icon={<FaArrowLeft />}
            onClick={prevSlide}
            position="absolute"
            left="10px"
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            bg={bgColor}
            _hover={{ bg: hoverColor }}
          />
          <IconButton
            aria-label="Next Slide"
            icon={<FaArrowRight />}
            onClick={nextSlide}
            position="absolute"
            right="10px"
            top="50%"
            transform="translateY(-50%)"
            zIndex={2}
            bg={bgColor}
            _hover={{ bg: hoverColor }}
          />
        </>
      )}
    </Box>
  );
};

export default Carousel;
