import React, { useEffect} from 'react';
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Layout from "./container/Layout/Layout";
import "./styles/main.scss";


function App(props) {


  return (
    <BrowserRouter>
    <HelmetProvider>
      <Layout />
    </HelmetProvider>
    </BrowserRouter>
  );
  
}

export default App;
