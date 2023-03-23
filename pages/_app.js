import '../styles/globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SessionProvider } from 'next-auth/react'


function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
  <SessionProvider session={session}>
  <Component {...pageProps} />
  </SessionProvider>
  )
}

export default MyApp
