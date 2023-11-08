import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let userContext=createContext(0);

export default function UserContextProvider({children}){

 

    const [token,setToken]=useState(null)
       useEffect(()=>{
setToken(localStorage.getItem("token"))
    },[token])
    async function sendDataToRegister(values){
try{

     let {data}=await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`,
     values
    )

    return data;
    
    
}
    catch(error) {
        return error.response
    }
    }

    async function sendDataToLogin(values){
        try {
            let {data}= await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`,values)

            return data;
        } catch (error) {
            return error.response
        }
    }

   function logOut(){
    localStorage.removeItem('token')
    setToken(null)
   }
   
  
    return(
        <userContext.Provider value={{sendDataToRegister,sendDataToLogin,logOut,setToken,token}}>
            {children}
        </userContext.Provider>
    )
}