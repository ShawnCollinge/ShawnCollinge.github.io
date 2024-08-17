import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Text } from '@chakra-ui/react';

interface MarkdownProps {
  children: string;
}

export const Markdown: React.FC<MarkdownProps> = ({ children }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: (props) => <Text {...props} mb={4} />,
        br: () => <br />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};
