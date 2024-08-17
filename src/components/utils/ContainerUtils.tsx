import React from 'react';
import { Heading, Text, HeadingProps } from '@chakra-ui/react';

interface HighlightedHeadingProps extends HeadingProps {
  highlightColor?: string;
  children: React.ReactNode;
}

const HighlightedHeading: React.FC<HighlightedHeadingProps> = ({
  highlightColor = 'blue.400',
  children,
  ...headingProps
}) => {
  return (
    <Heading
      lineHeight={1.1}
      fontWeight={600}
      fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
      {...headingProps}
    >
      <Text
        as="span"
        position="relative"
        _after={{
          content: "''",
          width: 'full',
          height: '30%',
          position: 'absolute',
          bottom: 1,
          left: 0,
          bg: highlightColor,
          zIndex: -1,
        }}
      >
        {children}
      </Text>
    </Heading>
  );
};

export default HighlightedHeading;
