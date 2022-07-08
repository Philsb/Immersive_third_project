import { Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import Footer from './components/Footer/Footer';

import './App.css';
import MainBody from './components/MainBody/MainBody';
import LoginModal from './components/LoginModal/LoginModal';


function App() {


  return (
    <>
      
        <Header
          logo = {{src:"/alfa-bank.svg", alt: "Bank Logo"}}
          companyName = "Alfa Bank"
          lettersLogoSrc = "/alfabankletters.svg"
          links ={[
            {title: "Services",to:"services",element:<i className="fa fa-th"/>},
            {title: "Profile",to:"/dashboard/profile",element: <i className="fa fa-user"/>}
          ]}  
          shoppingCart = {{title: "cart",to:"cart",element: <i className="fa fa-shopping-basket"/>}}
        />
        
        <Outlet/>
        
        
        {/*
        <Footer/>
        */}
        
        
        
      
    </>
  );
}

export default App;

