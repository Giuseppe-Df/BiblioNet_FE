import React, {useEffect, useState} from 'react'
import useAuth from"../../contexts/useAuth";
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBInput
  } from 'mdb-react-ui-kit';
import NavBar from "../../components/NavBar"
import { MDBCardHeader } from 'mdbreact';
import config from '../../config';
import axios from 'axios';
import {ValidateLettore,ValidatePassword} from "./Validate"

const ModificaLettore = () => {

    const { state: {token,email} } = useAuth();
    const [datiUtente,setDatiUtente]=useState({});
    const[password,setPassword]=useState({confermaNuovaPassword:"",vecchiaPassword:"",nuovaPassword:""});
    const[error,setError]=useState({nomeErr:false,cognomeErr:false,usernameErr:false,emailErr:false,viaErr:false,recapitoTelefonicoErr:false})
    const[passwordError,setPasswordError]=useState({passwordErr:false,confermaPasswordErr:false})
    const[vpErr,setVpErr]=useState(false);

    useEffect(() => {
        async function getData(){
            const AuthStr = 'Bearer '.concat(token);
            const response =  await axios.post("http://"+config.ip+":"+config.port+'/lettore/informazioni',{}, { headers: { Authorization: AuthStr } });
            const {password,generi,...newItem}=response.data;
        
            setDatiUtente(newItem);
        }      

        getData();
        document.title="Modifica Dati Lettore";

    }, []);

    const handleInputChange=(e)=>{
        const {name,value}=e.target;
        if (name.slice(-8)==="Password"){
            setPassword({...password,[name]:value})
        }else{
            setDatiUtente({...datiUtente,[name]:value})
        }
    }

    const handleSubmitPassword=async(e)=>{
        const{state,error}=ValidatePassword(password)
        if(!state){
            var formData = new FormData();
            for (const [key, value] of Object.entries(password)) {
                formData.append(key,value)
            }
            const AuthStr = 'Bearer '.concat(token);
            const response =  await axios.post("http://"+config.ip+":"+config.port+'/area-utente/modifica-password',formData, { headers: { Authorization: AuthStr } });
            if(response.data.payload.descrizione==="Errore!"){
                setVpErr(true);
            }else if(response.data.statusOk){
                alert("modifica password ok")
                setPassword({confermaNuovaPassword:"",vecchiaPassword:"",nuovaPassword:""});
            }
        }else{
            setPasswordError(error);
        }
        
    }

    const handleSubmitData=async(e)=>{
        const{state,error}=ValidateLettore(datiUtente)
        var formData = new FormData();
        if(!state){
            for (const [key, value] of Object.entries(datiUtente)) {
                formData.append(key,value)
            }
            formData.append("password","casualpswd")
            const AuthStr = 'Bearer '.concat(token);
            const response =  await axios.post("http://"+config.ip+":"+config.port+'/area-utente/modifica-lettore',formData, { headers: { Authorization: AuthStr } });
            if(response.data.statusOk){
                alert("modifica ok")
            }
        }else{
            setError(error);
        }
        
    }

  return (
    <>
    <NavBar/>
    <MDBRow className='m-5'>
        <MDBCard className='p-0 shadow'>
            <MDBCardHeader className='text-primary fs-5 ' style={{backgroundColor:"#ECEFF1"}}><b> Dati di base</b></MDBCardHeader>
            <MDBCardBody>
                <MDBRow>
                    {datiUtente&&
                    <>
                    <MDBCol size="8">
                        {error.emailErr&&<label className='fs-10 mb-2 text-danger'>Indirizzo email non valido</label>}
                        <MDBInput  type="text" wrapperClass='mb-3' label='Indirizzo email' name="email" value={datiUtente.email} onChange={handleInputChange}/>
                        {error.nomeErr&&<label className='fs-10 mb-2 text-danger'>Nome non valido</label>}
                        <MDBInput type="text" wrapperClass='mb-3' label='Nome' name="nome" value={datiUtente.nome} onChange={handleInputChange}/>
                        {error.cognomeErr&&<label className='fs-10 mb-2 text-danger'>Cognome non valido</label>}
                        <MDBInput type="text" wrapperClass='mb-3' label='Cognome' name="cognome" value={datiUtente.cognome} onChange={handleInputChange}/>
                        {error.usernameErr&&<label className='fs-10 mb-2 text-danger'>Username non valido</label>}
                        <MDBInput type="text" wrapperClass='mb-3' label='Username' name="username" value={datiUtente.username} onChange={handleInputChange}/>
                        <MDBInput type="text" wrapperClass='mb-3' label='Provincia' name="provincia" value={datiUtente.provincia} onChange={handleInputChange}/> 
                        <MDBInput type="text" wrapperClass='mb-3' label='Città' name="citta" value={datiUtente.citta} onChange={handleInputChange}/> 
                        {error.viaErr&&<label className='fs-10 mb-2 text-danger'>Indirizzo non valido</label>}
                        <MDBInput type="text" wrapperClass='mb-3' label='Via' name="via" value={datiUtente.via} onChange={handleInputChange}/> 
                        {error.recapitoTelefonicoErr&&<label className='fs-10 mb-2 text-danger'>Recapito telefonico non valido</label>}
                        <MDBInput type="text" wrapperClass='mb-3' label='Recapito telefonico' name="recapitoTelefonico" value={datiUtente.recapitoTelefonico} onChange={handleInputChange}/>
                    </MDBCol>
                    </>
                    }
                    <MDBCol size="4" className='d-flex align-items-center justify-content-center '>
                        <MDBBtn className='p-3 btn-dark btn-rounded btn-lg ' style={{backgroundColor:"#004AAD"}} type='button' id="modificaDatiLett"onClick={(e)=>{handleSubmitData(e)}} >Modifica Dati</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>
        </MDBCard>
    </MDBRow>
    <MDBRow className='m-5'>
        <MDBCard className='p-0 shadow'>
            <MDBCardHeader className='text-primary fs-5 ' style={{backgroundColor:"#ECEFF1"}}><b> Password</b></MDBCardHeader>
            <MDBCardBody>
                <MDBRow>
                    <MDBCol size="8">
                        {vpErr&&<label className='fs-10 mb-2 text-danger'>Vecchia password errata</label>}
                        <MDBInput type="password" wrapperClass='mb-3' label='Vecchia Password' name="vecchiaPassword" value={password.vecchiaPassword} onChange={handleInputChange}/>
                        {passwordError.passwordErr&&<label className='fs-10 mb-2 text-danger'>Password non valida</label>}
                        <MDBInput type="password" wrapperClass='mb-3' label='Nuova Password' name="nuovaPassword" value={password.nuovaPassword} onChange={handleInputChange}/>
                        {passwordError.confermaPasswordErr&&<label className='fs-10 mb-2 text-danger'>le Password non coincidono</label>}
                        <MDBInput type="password" wrapperClass='mb-3' label='Conferma Nuova Password' name="confermaNuovaPassword" value={password.confermaPassword} onChange={handleInputChange}/>
                    </MDBCol>
                    <MDBCol size="4" className='d-flex align-items-center justify-content-center '>
                        <MDBBtn className='p-5 btn-dark btn-rounded btn-lg ' style={{backgroundColor:"#004AAD"}} type='button' id="ModificaPassLett" onClick={(e)=>{handleSubmitPassword(e)}} >Modifica Dati</MDBBtn>
                    </MDBCol>
                </MDBRow>
            </MDBCardBody>
        </MDBCard>
    </MDBRow>
    </>
  )
}

export default ModificaLettore