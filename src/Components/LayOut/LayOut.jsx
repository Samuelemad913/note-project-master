import React from 'react'
import styles from "./LayOut.module.css"
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function LayOut() {
  return (
  <>

  <div className="container">
    
  </div>
<div className=' d-flex'>


<Outlet/>

</div>
{/* <Footer/> */}

  
  </>
  )
}
