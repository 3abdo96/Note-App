import { useContext } from "react"
import { userContext } from "../../Context/UserContext"
import { Navigate } from "react-router-dom"
import Login from "../Login/Login"

export default function ProtectedRoute({children}) {

    const {token} = useContext(userContext)
    if(token){
       
        return children
    }
    
        return <Navigate to="/login"/>
    
}
