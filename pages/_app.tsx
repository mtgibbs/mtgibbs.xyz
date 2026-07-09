import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { VhsProvider } from '../context/VhsContext'
import { GPUProvider } from '../context/GPUContext'
import UmamiScript from '../components/analytics/UmamiScript'
import PhosphorTuner from '../components/phosphor-tuner/phosphor-tuner'

function MyApp({ Component, pageProps }: AppProps) {
  // Konami code now opens the phosphor calibration deck (inside PhosphorTuner);
  // it replaced the old high-contrast toggle egg.
  return (
    <GPUProvider>
      <VhsProvider>
        <UmamiScript />
        <PhosphorTuner />
        <Component {...pageProps} />
      </VhsProvider>
    </GPUProvider>
  )
}

export default MyApp
