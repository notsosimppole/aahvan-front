import '../styles/globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SessionProvider } from 'next-auth/react'
// import localFont from 'next/font/local';

// const stencil = localFont({
//   src: [
//     {
//       path: './fonts/DINNextStencil-Regular.ttf',
//       weight: '400',
//       variable: '--stencil-regular',
//       style: 'normal',
//     },
//     {
//       path: './fonts/DINNextStencil-Medium.ttf',
//       weight: '500',
//       style: 'normal',
//     },
//     {
//       path: './fonts/DINNextStencil-Bold.ttf',
//       weight: '700',
//       variable: '--stencil-bold',
//       style: 'normal',
//     }
//   ],
// });

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
