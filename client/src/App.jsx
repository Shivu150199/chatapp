import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chat from './pages/Chat';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import MessageSection from './components/MessageSection';
function App() {
 

  return (
    <BrowserRouter>
    <Navbar/>
    <ToastContainer position="top-right"
autoClose={5000}/>
<Routes>
<Route path='/' element={<LandingPage/>}/>
<Route path='/signup' element={<Signup/>}/>
<Route path='/login' element={<Login/>}/>
<Route element={<PrivateRoute/>}>
<Route path='/chat' element={<Chat/>}/>

</Route>
<Route element={<PrivateRoute/>}>
<Route path='/chat/:id' element={<Chat/>}/>

</Route>
    
    
</Routes>


    </BrowserRouter>
  )
}

export default App
