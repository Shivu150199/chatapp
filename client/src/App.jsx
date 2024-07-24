import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chat from './pages/Chat';
import PrivateRoute from './components/PrivateRoute';
function App() {
 

  return (
    <BrowserRouter>
    <ToastContainer position="top-right"
autoClose={5000}/>
<Routes>
<Route path='/' element={<Home/>}/>
<Route path='/signup' element={<Signup/>}/>
<Route path='/login' element={<Login/>}/>
<Route element={<PrivateRoute/>}>
<Route path='/chat' element={<Chat/>}/>

</Route>
    
</Routes>


    </BrowserRouter>
  )
}

export default App
