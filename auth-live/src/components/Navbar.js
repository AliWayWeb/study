import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'

export const Navbar = () => {
    const { userData, setUserData } = useContext(UserContext)

    const logOut = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem("auth-token", "")
    }
    return (
        <div>
            <nav className="black">
                <div className="nav-wrapper container">
                    <a href="/" className="brand-logo">Logo</a>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {
                            userData.user ? 
                            ( 
                            <> 
                            <li><Link to="/" onClick={logOut}>Log Out</Link></li>
                            </>) : (
                        <>
                            <li><Link to="/register">Sign Up</Link></li>
                            <li><Link to="/login">Log In</Link></li>
                        </>
                        )}
                    </ul>
                </div>
            </nav>
        </div>
    )
}
