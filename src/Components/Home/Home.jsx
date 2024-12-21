import React, { useEffect } from 'react'
import styles from "./Home.module.css"
import NavBar from '../NavBar/NavBar'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import axios from 'axios';
import Note from '../Note/Note';
import Swal from 'sweetalert2';
import Loader from '../Loader/Loader';


export default function Home() {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    noteFormik.resetForm(); 
  };
  
  const handleShow = () => {
    setShow(true);
    setMsgValid(null); 
  };
  
  

const [getNote , setGetNote] = useState([])
const [msgValid , setMsgValid]= useState(null)





 async function addNotes (values)
  {
 try {

  const {data} = await axios.post(`https://note-sigma-black.vercel.app/api/v1/notes` ,values ,{
    headers : { token : `3b8ny__${localStorage.getItem("userToken")}`}
  } )
  console.log(data);
  handleClose()
  getUserNote()
  setMsgValid(null)
 } catch (error) {
  console.log(error);

  setMsgValid (error.response.data.msg)
 }
  }

  const noteFormik = useFormik({
    initialValues : {
      title : "" , 
      content : ""
    } ,

    onSubmit : addNotes 
  })



async function getUserNote ()
{
try {
  const {data} = await axios.get(`https://note-sigma-black.vercel.app/api/v1/notes` , {
    headers : { token : `3b8ny__${localStorage.getItem("userToken")}`} ,
   
  })
  console.log(data.notes , "daaataa");
  setGetNote(data.notes)
} catch (error) {
  console.log(error);

}
}


function deleteNotes (id)
{
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success ms-2",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });
  swalWithBootstrapButtons.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "No, cancel!",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      deleteNotesId(id)
      swalWithBootstrapButtons.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    } else if (
    
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelled",
        text: "Your imaginary file is safe :)",
        icon: "error"
      });
    }
  });
}




async function deleteNotesId (id)
{
  const {data} = await axios.delete(`https://note-sigma-black.vercel.app/api/v1/notes/${id}` , {
    headers : {token : `3b8ny__${localStorage.getItem("userToken")}`}
  })
  console.log(data , "deleeeete");
  getUserNote()
}





useEffect (()=>{
  getUserNote()
} , [])











  return (
   <>


   <div className= {`container-fluid ${styles.hamada3}`}>
    <div className="row">
      <div className="col-md-2"> <div ><NavBar/> 
       
         </div> </div>
      <div className="col-md-10">
      <div  className='mt-5 me-5'> <button onClick={handleShow} className='btn   text-white ms-auto d-block  mt-5 fw-bold fs-5' style={{backgroundColor : "#4C6C92"}}> <i className="fa-solid fa-circle-plus m-2 "></i>Add New Note </button></div>
      <div className="row g-5">
      {getNote.map(ele => (
<Note key={ele._id} ele = {ele} deleteNotes = {deleteNotes} getUserNote = {getUserNote} setMsgValid = {setMsgValid} />
))}

      </div>
      </div>
    
    </div>
  
   </div>
   
 
  
 
  
   <Modal show={show}  onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='ms-auto fw-bold' >New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
          { msgValid ? <div className='alert alert-danger'> { msgValid } </div> : ""  }
            <input onChange={noteFormik.handleChange} type="text" id='title' name='title' className='form-control fw-semibold mb-2' placeholder='Note Title' />
            <textarea onChange={noteFormik.handleChange}  name="content" id="content" className='form-control fw-semibold' placeholder='Note Content' cols="30" rows="5"></textarea>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {;noteFormik.handleSubmit();}}>
            Add Note
          </Button>

        </Modal.Footer>
      </Modal>
   </>
  )
}