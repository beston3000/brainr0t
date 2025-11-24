import '../styles/globals.css'
import { useEffect } from 'react';
import { io } from '../utils/socket';


export default function App({ Component, pageProps }) {
useEffect(() => {
// initialize single socket instance if desired
}, []);


return <Component {...pageProps} />
}
