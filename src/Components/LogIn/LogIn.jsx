import React, { useContext, useState } from 'react'
import img1 from "../../assets/images/notesBlack.png"
import styles from "./LogIn.module.css"
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TokenContext } from '../../Context/Token';
import {  ColorRing } from 'react-loader-spinner';




export default function LogIn() {

  const [isLoading , setIsLoading] = useState(false)

let {setToken} = useContext(TokenContext)


const navigate = useNavigate()

  async function logInData(values) {
    setIsLoading(true)
    try {
      const {data} = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signIn', values);
      console.log(data);
      if (data.msg==="done")
      {
        localStorage.setItem("userToken" , data.token)
        setToken(data.token)
        setIsLoading(false)
        navigate("/Home")
      }
  
    } catch (error) {
      console.error('Error:', error);
    }
  }


  const validationSchema = Yup.object({
    email : Yup.string().email("email not valid").required("email is required") ,
    password : Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/ , "invalid password").required("password is required") ,
  })

const logInFormik = useFormik({
  initialValues : {
      email:"",
      password:"",
      
  }, validationSchema ,

  onSubmit : logInData
})



  return (
 <>
 
 <section>

<li className=' fixed-top d-flex w-100  me-auto ps-5 '>

<div>
<img src= { img1 } className='w-50' alt="" />

</div>
</li>



 </section>

 <div className={`container-fluid ${styles.hamada2}`}>

  <div className="row">
    <div className="col-md-7 ms-5">

      <div className='min-vh-100 d-flex justify-content-center align-items-center'>

        <div className='bg-secondary p-3 shadow shadow-lg rounded-2 bg-info-subtle '  style={{ width: "55%"  }} >
        <h2 className='text-center fw-bold rounded-2 my-4 m-auto'>LogIn Now!</h2>
        <form onSubmit={logInFormik.handleSubmit}>
  
      <div className="form-group">
          <input type="email" id='email' name='email' value={logInFormik.values.email} onChange={logInFormik.handleChange} onBlur={logInFormik.handleBlur}  placeholder='Email :' className='form-control my-2' />
          { logInFormik.errors.email && logInFormik.touched.email ?<div className='alert bg-danger-subtle text-danger  '>  { logInFormik.errors.email  }  </div> : ""   }
        
        </div>
      <div className="form-group">
          <input type="password" id='password' name='password' value={logInFormik.values.password} onChange={logInFormik.handleChange} onBlur={logInFormik.handleBlur}  placeholder='Password :' className='form-control my-2' />
          { logInFormik.errors.password && logInFormik.touched.password ?<div className='alert bg-danger-subtle text-danger  '>  { logInFormik.errors.password  }  </div> : ""   }
        
        </div>
      
        <button type='submit' className='btn w-100 text-white d-block ms-auto btn-info my-3' disabled = {!(logInFormik.isValid&&logInFormik.dirty  )}> {
          isLoading ? <ColorRing
          visible={true}
          height="40"
          width="40"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          /> : "LogIn"
        } </button>
        </form>
        <div>
          <p> Don't have an account? <Link className='text-decoration-none ' to={"/register"} > Register   </Link> </p>
        </div>
        </div>
      </div>
    </div>
  </div>
</div>

 
 </>
  )
}
