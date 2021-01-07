import Axios from 'axios'
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext";
import React, { useState, useContext } from 'react'

export const Login = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const { setUserData } = useContext(UserContext);
    const history = useHistory()

    const submit = async (e) => {
        e.preventDefault()
        const loginUser = { email, password }
        const loginRes = await Axios.post(`http://localhost:8000/api/auth/login`, loginUser)
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user,
        })
        localStorage.setItem("auth-token", loginRes.data.token)
        history.push('/')
    }

    return (
        <div className="container">
            <div className="row">
                <form onSubmit={submit} className="white">
                    <h4>Log In</h4>
                    <div className="input-field">
                        <div className="input-field">
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
                                    type="text"
                                    placeholder="Password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="input-field">
                                <button className="amber darken-3 btn">Log In</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
