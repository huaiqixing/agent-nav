import '../styles/globals.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.asPath}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.05, y: -20 }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.1, 0.25, 1]
        }}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  )
}
