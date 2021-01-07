import React, { useContext } from 'react'
import UserContext from "../context/UserContext"

export const Home = () => {
    const { name } = useContext(UserContext)

    return (
        <div className="container">
            <h4>{ name }</h4>
        </div>
    )
}
