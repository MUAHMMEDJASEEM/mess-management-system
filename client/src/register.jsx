import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import { useUserAuth } from "./UserAuthContext";

export default function Register(props) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [name, setName] = useState('')
    const [err, setErr] = useState('')
    const { signUp } = useUserAuth()
    const navigate = useNavigate()
    const auth = getAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr("")
        try {
            await signUp(email, pass)
            navigate("/")
        } catch(err) {
            setErr(err.message)
        }
    }

    return (
        <div className="flex flex-col w-96 border-2 border-black space-y-8">
            <div className="text-3xl font-medium ml-6 mt-8">Signup</div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col  ml-6">
                    <label className = 'text-lg' htmlFor = 'name'>User Name</label>
                    <input className="border-2 border-black w-3/4" value = {name} onChange={(e) => setName(e.target.value)} id="name" name="name"></input>
                </div>
                <div className="flex flex-col  ml-6">
                    <label className = 'text-lg' htmlFor = 'email'>Email</label>
                    <input className="border-2 border-black w-3/4" value = {email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email"></input>
                </div>
                <div className="flex flex-col  ml-6">
                    <label className = 'text-lg' htmlFor = 'password'>Password</label>
                    <input className="border-2 border-black w-3/4" value = {pass} onChange={(e) => setPass(e.target.value)} type="password" id="password" name="password"></input> 
                </div>
                <button className = 'border-2 border-black mt-6 ml-7 w-64' type="submit"> Register </button>
            </form>
            <div>
                <button className="text-center mb-8 text-md"> Already have an account? <span className="font-medium underline decoration-solid"><Link to = "/">Login here</Link></span></button>
            </div>
        </div>
                
    )
}