import React, { useContext } from 'react'
import AuthContext from '../Auth-context'

const Auth = () => {
    const auth = useContext(AuthContext)

    return (
        <div className="Auth">
            <h1>Auth Component</h1>
            <button onClick={auth.login}>Let Me In!</button>
        </div>
    )
}

export default Auth
