import React, { useContext } from 'react'
import styles from "./NavBar.module.css"
import imgNav from "../../assets/images/notesInfo.png"

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/Token';

export default function NavBar() {

  let {setToken} = useContext(TokenContext)

  const navigate = useNavigate()

  function logOut ()
  {
    localStorage.removeItem("userToken")
    setToken(null)
    navigate("/LogIn")
  }


  return (
  <>
   <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#001F3F" maxWidth='200px' >
      <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
  <figure> <img src= {imgNav}  className='w-100 text-white' alt="" /> </figure>
</CDBSidebarHeader>

        <CDBSidebarFooter style={{ padding: "10px "  }}>
          <NavLink to={"/home"}
            className="sidebar-btn-wrapper text-decoration-none fs-4 "
            style={{
              padding: '20px 5px',
               color: 'inherit' 
            }}
          >
         <i className="fa-solid fa-house-user"></i> Home
          </NavLink>
          
          
        </CDBSidebarFooter>
        <CDBSidebarFooter style={{ padding: "10px "  }}>
          <NavLink to={"home"}
            className="sidebar-btn-wrapper text-decoration-none fs-4 "
            style={{
              padding: '20px 5px',
               color: 'inherit' 
            }}
          >
        <i className="fa-solid fa-magnifying-glass"></i>  Search
          </NavLink>
          
          
        </CDBSidebarFooter>
        <CDBSidebarFooter style={{ padding: "10px "  }}>
          <span onClick={logOut}
            className="sidebar-btn-wrapper text-decoration-none fs-4  "
            style={{
              padding: '20px 5px',
               color: 'inherit' ,
               cursor: 'pointer'
            }}
          >
      <i className="fa-solid fa-right-from-bracket"></i>  LogOut
          </span>
          
          
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  
  </>
  )
}
