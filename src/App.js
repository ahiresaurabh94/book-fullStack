import React from 'react';
import './App.css';
import {BrowserRouter , Routes , Route} from "react-router-dom";
import Register from './components/registertion/registeration';
import Navbar from './components/post/navigation';
import LoginPage from './components/login/login'
import AddBook from './components/post/addbook';



function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<LoginPage/>}/>
    <Route path='/register' element={<Register/>} />
    <Route path='/posts' element={<Navbar/>} />
    <Route path="/addbook" element={<AddBook/>}/>
    

  </Routes>
  </BrowserRouter>
  );
}

export default App;
