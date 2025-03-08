'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
export const UserContext = createContext();
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import swal from "sweetalert"
import Notify from '../Components/Notify';
const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([])
    const [message , setMessage] = useState("")
    // Register 
    const Register = (email , name , password) => {
        axios.post(`http://localhost:3001/api/auth/register`, {email , name, password})
        .then((res) => {
            swal("Good job!", res.data.message, "success");
            setTimeout(() => {
                window.location.href = "/Login"
            },2000)
        })
        .catch((err)=>{
            swal("Oops!", err.response.data.message, "error");
        })
    }
    // Login
    const Login = (email , password) => {
        axios.post(`http://localhost:3001/api/auth/login`, { email, password }).then((res) => {
            setUser(res.data)
                localStorage.setItem('Data', JSON.stringify(res.data))
                setMessage("Enter Your Email And Password")
                setTimeout(() => {
                    setMessage("")
                    window.location.href = "/"
                }, 2000)
            }).catch((err) => { 
                swal("Oops!", err.response.data.message, "error");
            })
    }
    // Logout Function
    const Logout = () => {
        swal({
            title: "Are you sure?",
            text: "You are go to logout from your account !",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(willLogout => {    
                if (willLogout) {
                    setUser({})
                    localStorage.removeItem('Data')
                    window.location.href = "/Login"
                }
            })
            .catch(err => toast.error("Logout Failed"))
    }
    useEffect(() => {
        const user = localStorage.getItem('Data')
        if(user){
            setUser(JSON.parse(user))
        }
    }, []) 
    useEffect(() => {
        axios.get('http://localhost:3001/api/auth').then((res) => {
            setUsers(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])
  return (
      <div className="relative">
        <Notify Notify={message}/>
        <UserContext.Provider value={{user , users , Logout , Login , Register }}>
            {children}
        </UserContext.Provider>
      </div>
  )
}

export default UserContextProvider