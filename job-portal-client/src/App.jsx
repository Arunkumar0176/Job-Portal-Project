import React from 'react';
import './index.css';
import './App.css';
import { Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';


function App() {
  return (
   <>
    <Navbar/>
   
   <Outlet/>
  
   
  
   
   </>
  );
}

export default App;



