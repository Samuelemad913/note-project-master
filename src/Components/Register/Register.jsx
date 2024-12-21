import React from 'react'
import styles from "./Register.module.css"
import img1 from "../../assets/images/notesBlack.png"
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';



export default function Register() {

  const navigate = useNavigate()

  async function getUserData(values) {
    try {
      const {data} = await axios.post('https://note-sigma-black.vercel.app/api/v1/users/signUp', values);
      console.log(data);
      if (data.msg==="done"){
        navigate("/LogIn")
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  const validationSchema = Yup.object({
    name : Yup.string().min(3,"name is too short").max(8,"name is too long").required("name is required") ,
    email : Yup.string().email("email not valid").required("email is required") ,
    password : Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/ , "invalid password").required("password is required") ,
    age : Yup.number().min(16,"Age should be at least 16 years old").max(90 , "Age should not exceed 90 years old").required("age is required") ,
    phone : Yup.string().matches(/^01[0125][0-9]{8}$/ , "invalid number").required("phone is required")
  })

const registerFormik = useFormik({
  initialValues : {
  
      name:"",
      email:"",
      password:"",
      age:"",
      phone:""
  }, validationSchema ,

  onSubmit : getUserData
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

 
 <div className= { `container-fluid ${styles.hamada} ` }>
  <div className="row">
    <div className="col-md-7 ms-5">

      <div className='min-vh-100 d-flex justify-content-center align-items-center'>

        <div className='bg-secondary p-3 shadow shadow-lg rounded-2 bg-info-subtle '  style={{ width: "55%"  }} >
        <h2 className='text-center fw-bold rounded-2 my-4 m-auto'>Sign Up Now!</h2>
        <form onSubmit={registerFormik.handleSubmit}>
         <div className="form-group">
          <label htmlFor="name"></label>
         <input type="text" id='name' name='name' value={registerFormik.values.name} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur} placeholder='Name :' className='form-control my-2' />
         { registerFormik.errors.name && registerFormik.touched.name ?<div className='alert bg-danger-subtle text-danger  '>  { registerFormik.errors.name  }  </div> : ""   }
        
         </div>
         <div className="form-group">
          <input type="email" id='email' name='email' value={registerFormik.values.email} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}  placeholder='Email :' className='form-control my-2' />
          { registerFormik.errors.email && registerFormik.touched.email ?<div className='alert bg-danger-subtle text-danger  '>  { registerFormik.errors.email  }  </div> : ""   }
        
         </div>
         <div className="form-group">
          <input type="password" id='password' name='password' value={registerFormik.values.password} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}  placeholder='Password :' className='form-control my-2' />
          { registerFormik.errors.password && registerFormik.touched.password ?<div className='alert bg-danger-subtle text-danger  '>  { registerFormik.errors.password  }  </div> : ""   }
        
         </div>
         <div className="form-group">
          <input type="number" id='age' name='age' value={registerFormik.values.age} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}  placeholder='Age :' className='form-control my-2' />
          { registerFormik.errors.age && registerFormik.touched.age ?<div className='alert bg-danger-subtle text-danger  '>  { registerFormik.errors.age  }  </div> : ""   }
        
         </div>
         <div className="form-group">
          <input type="tel" id='phone' name='phone' value={registerFormik.values.phone} onChange={registerFormik.handleChange} onBlur={registerFormik.handleBlur}  placeholder='Phone :' className='form-control my-2' />
          { registerFormik.errors.phone && registerFormik.touched.phone ?<div className='alert bg-danger-subtle text-danger  '>  { registerFormik.errors.phone  }  </div> : ""   }
        
         </div>
         <button type='submit' className='btn w-100 text-white d-block ms-auto btn-info my-3' disabled = {!(registerFormik.isValid&&registerFormik.dirty  )}> Register </button>
        </form>
        <div>
          <p>Have already an account? <Link className='text-decoration-none ' to={"/login"} > LogIn   </Link> </p>
        </div>
        </div>
      </div>
    </div>
  </div>
</div>

 
 </>
  )
}
