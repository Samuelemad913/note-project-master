import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LayOut from './Components/LayOut/LayOut';
import Home from './Components/Home/Home';
import NotFound from './Components/NotFound/NotFound';
import Register from './Components/Register/Register';
import LogIn from './Components/LogIn/LogIn';
import { useContext, useEffect } from 'react';
import { TokenContext } from './Context/Token';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';

function App() {


  let {setToken} = useContext(TokenContext)

 const routes =  createBrowserRouter([
  { path : "" , element : <LayOut/> , children : [
    {  path : "home" , element : <ProtectedRoutes><Home/> </ProtectedRoutes>  } ,
    {  path : "" , element : <ProtectedRoutes><Home/> </ProtectedRoutes>  } ,
    {  path : "register" , element : <Register/>  } ,
    {  path : "login" , element : <LogIn/>  } ,
    {  path : "*" , element : <NotFound/>  } ,
  ]   }
])


useEffect( ()=>{
  if (localStorage.getItem("userToken") !=null)
  {
  setToken(localStorage.getItem("userToken"))
  }
} , [] )



  return <RouterProvider router={routes} >   </RouterProvider>
}

export default App;
