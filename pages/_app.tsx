import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { VhsProvider } from '../context/VhsContext'
import VhsToggle from '../components/vhs-toggle/vhs-toggle'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <VhsProvider>
      <Component {...pageProps} />
    </VhsProvider>
  )
}

export default MyApp
