import '../styles/globals.css'
import Head from 'next/head'
import { ChakraProvider, CSSReset, ColorModeScript, extendTheme } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { TeamNameProvider } from '../context/TeamNameProvider'
import { CartTotalProvider } from '../context/CartTotalProvider'
import { CartItemsProvider } from '../context/CartItemsProvider'
import { ApprovedItemsProvider } from '../context/ApprovedItemsProvider'

import TeamNamePrompt from '../components/team/TeamNamePrompt'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}
const theme = extendTheme({ config })

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isTeacherView = router.pathname === '/teacherView';

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <ApprovedItemsProvider>
        <CartItemsProvider>
          <CartTotalProvider>
            <TeamNameProvider>
              <Head>
                <title>Rocket Revamp</title>
              </Head>

              {/* Only show the team-name modal on NON-teacher pages */}
              {!isTeacherView && <TeamNamePrompt />}

              <Component {...pageProps} />
            </TeamNameProvider>
          </CartTotalProvider>
        </CartItemsProvider>
      </ApprovedItemsProvider>
    </ChakraProvider>
  )
}

export default MyApp
