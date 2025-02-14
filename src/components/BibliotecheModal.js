import React from 'react'

import {
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalBody,
    MDBCard,
    MDBCardBody,
    MDBCardTitle, 
    MDBListGroup, 
    MDBListGroupItem,
    MDBModalTitle,
    MDBIcon,
    MDBBtn
 } from 'mdb-react-ui-kit';

 import { useNavigate } from 'react-router-dom';

const Modal = ({listaEsperti,listaClub,email,citta,via,recapitoTelefonico,nomeBiblioteca,show,setShow}) => {
  
  const navigate = useNavigate();
 
  return (
    <MDBModal show={show} setShow={setShow} tabIndex='-1'>
        <MDBModalDialog size='xl'>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle> <MDBIcon fas icon="info-circle" size="lg" /><b className='ms-3'>La nostra biblioteca...</b></MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={()=>{setShow(false)}}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody style={{backgroundColor:"#E3F2FD"}}>
              <div className='container-fluid bd-example-row'>
                <div className='row'>
                  <MDBCard className="mt-3 shadow bg-opacity-100"> 
                    <MDBCardBody>
                    <div className='row'>
                      <MDBCardTitle><h2><b>Biblioteca {nomeBiblioteca}</b></h2></MDBCardTitle>
                    </div>
                    <div className='row'>
                      <div className='col-md-7'>
                        <MDBListGroup className='mt-3 shadow '>
                          <MDBListGroupItem><MDBIcon fas icon="map-pin" /><i className='ms-2'>Via: </i><h5> <b>{via}, {citta}</b></h5></MDBListGroupItem>
                          <MDBListGroupItem><MDBIcon fas icon="phone-alt" className='ms-0' /><i className='ms-1'>Tel: </i><h5><b>{recapitoTelefonico}</b></h5></MDBListGroupItem>
                          <MDBListGroupItem><MDBIcon fas icon="at" /><i className='ms-2'>email: </i><h5><b>{email}</b></h5></MDBListGroupItem>
                      </MDBListGroup>
                      </div>
                      <div className='col-md-5 text-center shadow mt-3 rounded' onClick={()=>navigate('/bookList/'+email)}>
                        <MDBIcon fas icon="book" size="8x" className="mt-3"/>
                        <h5 className='mt-3'><b>Prenota un libro presso la nostra biblioteca</b></h5>
                      </div>
                    </div>
                    </MDBCardBody>
                  </MDBCard>
                </div>
                <div className='row'>
                  <MDBCard className="mt-3 shadow"> 
                    <MDBCardBody>
                    <div className='row'>
                      <MDBCardTitle><h3><b>I nostri esperti..</b></h3></MDBCardTitle>
                    </div>
                    <div className='row'>
                       <tr>
                       {
                        listaEsperti.map((esperto)=>{
                          return(
                            <td> <div className='text-center ms-2 rounded-pill p-1 shadow'><MDBIcon fas icon="user-circle" size="4x" /> <p><b>{esperto.nome}</b></p></div></td>
                            )
                        })
                      } 
                      </tr> 
                    </div>
                    </MDBCardBody>
                  </MDBCard>
                </div>
                <div className='row'>
                <MDBCard className="mt-3 shadow"> 
                    <MDBCardBody>
                    <div className='row'>
                      <MDBCardTitle><h3><b>I nostri club..</b></h3></MDBCardTitle>
                    </div>
                    <div className='row'>
                       <tr>
                       {
                        listaClub.map((club)=>{
                          return(
                            <td> <div className='text-center ms-2 rounded-circle p-2 shadow'><MDBIcon fas icon="book-reader" size="4x" /> <p><b>{club.nome}</b></p></div></td>
                            )
                        })
                      } 
                      </tr> 
                    </div>
                    </MDBCardBody>
                  </MDBCard> 
                </div>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
    </MDBModal>
  )
}

export default Modal