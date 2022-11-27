import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import routes from './Routes/Routes/Routes';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthProvider from './Contex/AuthProvider';
import AOS from 'aos';


const App = () => {

  useEffect(() => {
    AOS.init();
    AOS.refresh()
  }, [])

  return (
    <AuthProvider>
      <RouterProvider router={routes}></RouterProvider>
    </AuthProvider>
  );
};

export default App;