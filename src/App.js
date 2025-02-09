import {
  Route,
  BrowserRouter as Router,
  Routes
} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Homepage from './pages/homepage/Homepage';
import Register from './pages/register/Register';



// Toast Config
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BuyNow from './components/BuyNow';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUpdate from './pages/admin/AdminUpdate';
import Cart from './pages/Cart/Cart';
import Complete from './pages/Cart/Complete';
import ForgotPassword from './pages/forgot_password/ForgotPassword';
import Login from './pages/login/Login';
import Checkout from './pages/navbar/Checkout';
import Contact from './pages/navbar/Contact';
import Destination from './pages/navbar/Destination';
import Profile from './pages/profile/Profile';
import Sidebar from './pages/Sidebar/Sidebar';
import AdminRoutes from './protected_routes/AdminRoutes';
import UserRoutes from './protected_routes/UserRoutes';

import Blog from './pages/navbar/Blog';
import RouteDetail from './pages/navbar/RouteDetail';
import Trails from './pages/navbar/Trails';
import Settings from './pages/setting/Settings';







function App() {
  return (
    <Router>
      <Navbar  />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/settings' element={<Settings/>} />


        {/* Profile */}

        <Route element={<UserRoutes />}>
          <Route path='/profile' element={<Profile />} />
        </Route>


        {/* Admin Routes - Protected */}
        <Route element={<AdminRoutes />}>
          <Route path='/admin' element={<Sidebar />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/update/:id' element={<AdminUpdate />} />
        </Route>

        {/* Forgot Password */}
        <Route path='/forgot_password' element={<ForgotPassword/>} />

        {/* Destination */}
        <Route path='/destination' element={<Destination/>} />
        <Route path="/route/:routeName" element={<RouteDetail/>} /> {/* Dynamic route */}
        <Route path='/buynow/:id' element={<BuyNow/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/checkout' element={<Checkout/>} />
        <Route path='/complete' element={<Complete/>} />
        <Route path='/blog' element={<Blog/>} />
        <Route path='/trails' element={<Trails/>} />




        




      </Routes>
    </Router>
  );
}

export default App;
