import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';

export default function Note( {ele , deleteNotes , getUserNote} ) {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



  async  function updateNotes (values)
    {
   try {
    const {data} = await axios.put(`https://note-sigma-black.vercel.app/api/v1/notes/${ele._id}` , values , {
      headers : { token : `3b8ny__${localStorage.getItem("userToken")}` }
    })
    console.log(data , "mariam");
    if (data.msg ==="done")
    {
toast.success("Updated successfully")
    }
    getUserNote()
    
   } catch (error) {
    console.log(error);
   }
    }
    
    


    const updFormik = useFormik({
        initialValues : {
          title : ele.title , 
          content : ele.content ,
        } ,
      
        onSubmit : updateNotes
      })
      


    
  return (
  <>
  
  
  <div className="col-md-6"> 
    <div className=' p-3   rounded-3 mt-5'style={{backgroundColor : "#ADD8E6", }}>
      <div className='d-flex justify-content-between align-items-center border-bottom border-1 border-dark pb-2'>
        <h5 className='fw-bolder text-black text-capitalize titlee'>{ele.title}</h5>
        <div className='d-flex'>
          <i style={{ cursor: "pointer" }} onClick={()=>deleteNotes(ele._id)} className='fa fa-trash-can fs-5 me-3'></i>
          <i style={{ cursor: "pointer" }} onClick={handleShow}  className='fa-solid fa-pen-to-square fs-5'></i>
        </div>
      </div>
      <p className='mt-3 contentt '>{ele.content}</p>
    </div>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='ms-auto fw-bold' >update Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <input onChange={updFormik.handleChange} defaultValue={ele.title} type="text" id='title' name='title' className='form-control fw-semibold mb-2' placeholder='Note Title' />
            <textarea onChange={updFormik.handleChange} defaultValue={ele.content}  name="content" id="content" className='form-control fw-semibold' placeholder='Note Content' cols="30" rows="5"></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {handleClose();updFormik.handleSubmit();}}>
           update Notes
          </Button>

        </Modal.Footer>
      </Modal>
  </div>
  
  
  </>
  )
}
