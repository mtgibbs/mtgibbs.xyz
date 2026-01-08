import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { VhsProvider } from '../context/VhsContext'
import { GPUProvider } from '../context/GPUContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GPUProvider>
      <VhsProvider>
        <Component {...pageProps} />
      </VhsProvider>
    </GPUProvider>
  )
}

export default MyApp
