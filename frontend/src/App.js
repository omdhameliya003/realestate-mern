
import './App.css';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PostProperty from './components/pages/PostProperty';
import Logout from './components/pages/Logout';
import {AlertProvider} from './components/common/AlertProvider';
import AllListing from './components/pages/AllListing';
function App() {
  return (
    <AlertProvider>
      
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path='/forgot-password' element=""/>
      <Route path='/register' element={< Register/>}/>
      <Route path='/' element={< Login/>}/>
      <Route path='/home' element={< Home/>}/>
      <Route path='/logout' element={< Logout/>}/>
      <Route path='/postProperty' element={< PostProperty/>}/>
      <Route path='/allListing' element={< AllListing/>}/>
    </Routes>
    </BrowserRouter>
    </div>
    </AlertProvider>
  );
}

export default App;
