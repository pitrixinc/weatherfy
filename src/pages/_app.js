import React from 'react'
import '../styles/globals.css'
import 'leaflet/dist/leaflet.css';
import GoogleTranslate from '@/components/GoogleTranslate';

function MyApp({ Component, pageProps }) {
  return (
  <>
   <Component {...pageProps} />
   <GoogleTranslate/>
  </>
  );
}

export default MyApp
