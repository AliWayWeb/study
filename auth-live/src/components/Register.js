import Axios from 'axios'
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import React, { useState, useContext } from 'react'

export const Register = () => {

    const [email, setEmail] = useState()
    const [name, setName] = useState()
    const [password, setPassword] = useState()
    const [lastName, setLastName] = useState()

    const { setUserData } = useContext(UserContext);
    const history = useHistory()

    const submit = async (e) => {
        e.preventDefault()
        const newUser = { email, password, name, lastName }
        await Axios.post(`http://localhost:8000/api/auth/register`, newUser)
        const loginRes = await Axios.post(`http://localhost:8000/api/auth/login`, {
            email,
            password
        })
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
        })
        localStorage.setItem("auth-token", loginRes.data.token)
        history.push('/')
    }

    return (
        <UserContext.Provider value={{ name }}>
            <div className="container">
                <div className="row">
                    <form onSubmit={submit} className="white">
                        <h4>Registration</h4>
                        <div className="input-field">
                            <div className="input-field">
                                <input
                                    id="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    id="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    id="email"
                                    type="text"
                                    placeholder="E-mail"
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="input-field">
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="input-field">
                                <button className="amber darken-3 btn">Sign Up</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </UserContext.Provider>
    )
}
