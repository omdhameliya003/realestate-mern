
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/pages/userLayout/Register';
import Login from './components/pages/userLayout/Login';
import Home from './components/pages/userLayout/Home';
import PostProperty from './components/pages/userLayout/PostProperty';
import Logout from './components/pages/userLayout/Logout';
import {AlertProvider} from './components/common/AlertProvider';
import AllListing from './components/pages/userLayout/AllListing';
import MyListing from './components/pages/userLayout/MyListing';
import UpdateProfile from './components/pages/userLayout/UpdateProfile';
import Filter from './components/pages/userLayout/Filter';
import AboutUs from './components/pages/userLayout/AboutUs';
import ViewProperty from './components/pages/userLayout/ViewProperty';
import SaveProperty from './components/pages/userLayout/SaveProperty';
import { SaveProvider } from './components/common/SaveContext';
import Comment from './components/pages/userLayout/Comment';
import Dashboard from './components/pages/userLayout/Dashboard';
import RequiestRecieved from './components/pages/userLayout/RequiestRecieved';
import RequiestSent from './components/pages/userLayout/RequiestSent';
import ContactUs from './components/pages/userLayout/ContacUs';
import Faq from './components/pages/userLayout/Faq';
import ProtectedRoute from './components/common/ProtectedRoute';
import { AuthProvider } from './components/common/AuthContext';
import AdminDashBoard from './components/pages/adminLayout/AdminDashBoard';
import ManageUser from './components/pages/adminLayout/ManageUser';
import Messages from './components/pages/adminLayout/Messages';
import ManageProperty from './components/pages/adminLayout/ManageProperty';
import MessageReply from './components/pages/adminLayout/MessageReply';
import UnauthorizedPage from './components/pages/userLayout/UnauthorizedPage';
import PageNotFound from './components/pages/userLayout/404-Page';
function App() {
  return (
    <AuthProvider>
    <AlertProvider>
    <SaveProvider>
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path='/register' element={< Register/>}/>
      <Route path='/' element={< Login/>}/>
      <Route path='/forgot-password' element=""/>
      <Route path='/user/home' element= { <ProtectedRoute role="user">< Home/></ProtectedRoute> }/>
      <Route path='/user/dashbord' element={<ProtectedRoute role="user"><Dashboard/></ProtectedRoute>}/>
      <Route path='/user/postProperty' element={<ProtectedRoute role="user">< PostProperty/></ProtectedRoute>}/>
      <Route path='/user/myListing' element={<ProtectedRoute role="user">< MyListing/></ProtectedRoute>}/>
      <Route path='/user/allListing' element={<ProtectedRoute role="user">< AllListing/></ProtectedRoute>}/>
      <Route path='/user/comment/:property_id' element={<ProtectedRoute role="user">< Comment/></ProtectedRoute>}/>
      <Route path='/user/viewProperty' element={<ProtectedRoute role="user">< ViewProperty/></ProtectedRoute>}/>
      <Route path='/user/filterSearch' element={<ProtectedRoute role="user">< Filter/></ProtectedRoute>}/>
      <Route path='/user/aboutUs' element={<ProtectedRoute role="user">< AboutUs/></ProtectedRoute>}/>
      <Route path='/user/contactUs' element={<ProtectedRoute role="user">< ContactUs/></ProtectedRoute>}/>
      <Route path='/user/faq' element={<ProtectedRoute role="user">< Faq/></ProtectedRoute>}/>
      <Route path='/user/saveProperty' element={<ProtectedRoute role="user"><SaveProperty/></ProtectedRoute>}/>
      <Route path='/user/updateProfile' element={<ProtectedRoute role="user">< UpdateProfile/></ProtectedRoute>}/>
      <Route path='/user/requiestReceived' element={<ProtectedRoute role="user">< RequiestRecieved/></ProtectedRoute>}/>
      <Route path='/user/requiestSent' element={<ProtectedRoute role="user">< RequiestSent/></ProtectedRoute>}/>
      <Route path='/logout' element={< Logout/>}/>
      <Route path='/admin/dashboard' element={<ProtectedRoute role="admin">< AdminDashBoard/></ProtectedRoute>}/>
      <Route path='/admin/manageuser' element={<ProtectedRoute role="admin">< ManageUser/></ProtectedRoute>}/>
      <Route path='/admin/messages' element={<ProtectedRoute role="admin">< Messages/></ProtectedRoute>}/>
      <Route path='/admin/messageReply' element={<ProtectedRoute role="admin">< MessageReply/></ProtectedRoute>}/>
      <Route path='/admin/manageproperty' element={<ProtectedRoute role="admin">< ManageProperty/></ProtectedRoute>}/>
      <Route path='/unauthorized' element={< UnauthorizedPage/>}/>
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    </BrowserRouter>
    </div>
    </SaveProvider>
    </AlertProvider>
    </AuthProvider>
  );
}

export default App;
