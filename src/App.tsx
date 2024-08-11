import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import Layout from './components/Layout/Layout'
import { HashRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        </HashRouter>
      </Layout>
    </ChakraProvider>
  )
}

export default App
