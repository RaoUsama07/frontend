// pages/_app.tsx
import React from 'react';
import HomePage from './HomePage'; // Import HomePage component
import '@/styles/styles.css';
function MyApp({ Component : any , pageProps : any }) {
  // You can add global providers or layouts here if needed
  return (
    <div>
      {/* Render HomePage component */}
      <HomePage />
      {/* Render other pages/components based on routing */}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
