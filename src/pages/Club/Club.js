import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import useAuth from"../../contexts/useAuth";
import IscrittiModal from '../../components/IscrittiModal';
import EventiModal from '../../components/EventiModal';

import {
    MDBContainer, 
    MDBRow,  
    MDBBtn, 
    MDBIcon, 
    MDBCol,
    MDBCard,
    MDBCardTitle,
    MDBCardText,
    MDBCardBody,
    MDBCardGroup,
    MDBCardImage } from 'mdb-react-ui-kit';

const Club = () => {

    const {id} =useParams();
    const [iscritto,setIscritto]= useState(false)
    const [info, setInfo] = useState(null);
    const [modalData, setModalData] = useState(null);
    const [show, setShow] = useState(false);
    const [modalEventiData, setModalEventiData] = useState(null);
    const [showEventi, setShowEventi] = useState(false);
    const {state: { token } } = useAuth();

    useEffect(() => {
        async function fetchData(){
            const result = await (axios.get("http://localhost:8080/club-del-libro/"+id));
            setInfo(result.data);
            if(token){
                const AuthStr = 'Bearer '.concat(token);
                const iscritto=await axios.get("http://localhost:8080/club-del-libro/partecipazione-lettore/?idClub="+id,{ headers: { Authorization: AuthStr } });
                setIscritto(iscritto.data);
            }
        }      
        fetchData();       
    }, [])

    const showModal= async()=>{

        const iscritti = await axios.post("http://localhost:8080/club-del-libro/lettori-club/?id="+id)
        setModalData(iscritti.data);
        setShow(true);

    }

    const showModalEventi= async()=>{

        const eventi = await axios.post("http://localhost:8080/club-del-libro/eventi-club?id="+id)
        setModalEventiData(eventi.data.eventi);
        setShowEventi(true);

    }

    return (
        <>
        <MDBContainer fluid className="p-0 pb-5" style={{backgroundColor:"#E3F2FD"}}>
            <NavBar  />
            {modalData && <IscrittiModal modalData={modalData} show={show} setShow={setShow} />}
            {modalEventiData && <EventiModal modalEventiData={modalEventiData} showEventi={showEventi} setShowEventi={setShowEventi} />}
            <MDBRow className='me-5 ms-5 mt-5'>
                {/* <MDBCard style={{ maxWidth: '540px' }}> */}
                {info&&
                <MDBCard className='shadow' >
                    {/* <MDBRow className='g-0'> */}
                    <MDBRow>
                        <MDBCol md='4' className='d-flex justify-content-center align-items-center'>
                            <MDBCardImage height="300" width="400" src='https://mdbootstrap.com/img/new/slides/017.webp'  alt='...' />
                        </MDBCol>
                        <MDBCol md='4'>
                            <MDBCardBody className='text-center mt-4'>
                            <MDBCardTitle className='mt-5'><h2><b>{info.Club.nome}</b></h2></MDBCardTitle>
                            <MDBCardText className='mt-4'>
                            <h4><i>{info.Club.descrizione}</i></h4>
                            </MDBCardText>
                            {token&&!iscritto&&<MDBBtn className='btn-dark btn-rounded btn-lg ms-3 mt-2' style={{backgroundColor:"#004AAD"}}> Iscriviti</MDBBtn>}
                            {token&&iscritto&&<MDBBtn className='btn-dark btn-rounded btn-lg ms-3 mt-2' style={{backgroundColor:"#004AAD"}}> Abbandona</MDBBtn>}
                            </MDBCardBody>
                        </MDBCol>
                        <MDBCol md='4'>
                            <MDBCardBody className='shadow mt-2 mb-2'>
                            <MDBCardTitle><h3><b>Informazioni</b></h3></MDBCardTitle>
                            <hr></hr>
                            <MDBCardText className='mt-4'>
                                <p><h6><MDBIcon fas icon="user-tie" /> esperto:</h6> <h4><b>{info.Esperto.nome} {info.Esperto.cognome}</b></h4></p>
                                <p><h6><MDBIcon fas icon="at" /> email di contatto:</h6> <h4><b>{info.Esperto.email}</b></h4></p>
                            </MDBCardText>
                            <MDBCardText className='mt-5'>
                            <large className='text-muted'>I nostri generi: {info.Club.generi.map((genere)=>{return(<b>{genere} </b>)})}</large>
                            </MDBCardText>
                            </MDBCardBody>
                        </MDBCol>
                    </MDBRow>
                </MDBCard>}
            </MDBRow>
            <MDBRow className='me-5 ms-5 mt-5'>
                <MDBCardGroup>
                    <MDBCard>
                        <MDBCardBody>
                        <MDBCardTitle ><h3><b >Iscrizioni</b></h3></MDBCardTitle>
                        <hr></hr>
                        <MDBCardText>
                            <h5>Visualizza gli <a className="text-decoration-none" onClick={()=>{showModal()}}>iscritti</a> al club</h5>     
                        </MDBCardText>
                        <div className='text-center'></div>               
                        </MDBCardBody>
                    </MDBCard>
                    <MDBCard>
                        <MDBCardBody>
                        <MDBCardTitle><h3><b>Eventi</b></h3></MDBCardTitle>
                        <hr></hr>
                        <MDBCardText>
                            <h5>Visualizza gli <a onClick={()=>{showModalEventi()}} className="text-decoration-none">eventi</a> del club</h5>     
                        </MDBCardText>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCardGroup>
            </MDBRow>
        </MDBContainer>
        <MDBRow className='me-0'>
                <Footer />
        </MDBRow>
        
        </>
    )
}

export default Club