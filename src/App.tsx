import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <div>Hello world</div>
    </ChakraProvider>
  )
}

export default App
