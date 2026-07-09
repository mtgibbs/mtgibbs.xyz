import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { VhsProvider } from '../context/VhsContext'
import { GPUProvider } from '../context/GPUContext'
import { useKonami } from '../hooks/use-konami'
import UmamiScript from '../components/analytics/UmamiScript'
import PhosphorTuner from '../components/dev/phosphor-tuner'

function MyApp({ Component, pageProps }: AppProps) {
  useKonami(() => {
    document.body.classList.toggle('high-contrast');
    // Easter egg feedback
    console.log('ACCESS GRANTED: High Contrast Protocol Engaged');
  });

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
