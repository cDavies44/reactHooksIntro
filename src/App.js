/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import './App.css'
import HooksList from './components/HooksList'
import Header from './components/Header'
import Auth from './components/Auth'
import AuthContext from './Auth-context'

const app = props => {
    const [page, setPage] = useState('auth')
    const [authStatus, setAuthStatus] = useState(false)

    const switchPage = pageName => {
        setPage(pageName)
    }

    const login = () => {
        setAuthStatus(true)
    }

    return (
        <div className="App">
            <AuthContext.Provider value={{ status: authStatus, login: login }}>
                <Header
                    onLoadHooks={switchPage.bind(this, 'hooks')}
                    onLoadAuth={switchPage.bind(this, 'auth')}
                    header="hello"
                />
                <hr />
                {page === 'auth' ? <Auth /> : <HooksList />}
            </AuthContext.Provider>
        </div>
    )
}

export default app
