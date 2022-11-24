import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routes from './Routes/Routes/Routes';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthProvider from './Contex/AuthProvider';


const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={routes}></RouterProvider>
    </AuthProvider>
  );
};

export default App;