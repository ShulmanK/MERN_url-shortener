import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/authhook'
import {AuthContext} from './context/AuthContext'
import {Navbar} from './components/Navbar';
import {Loader} from './components/Loader'

import 'materialize-css'


function App() {
    const {login, logout, token, userId, isAuthReady} = useAuth()
    const isAuthenticated = !!token && isAuthReady
    const routes =  useRoutes(isAuthenticated)
    console.log('isAuthenticated', isAuthenticated)

    if(!isAuthReady){
        return <Loader/>
    }
    return (
        <AuthContext.Provider value={{
            token, userId, login, logout, isAuthenticated
        }}>
        <Router>
            {isAuthenticated && <Navbar/>}
            <div className={"container"}>
                {routes}
            </div>
        </Router>
        </AuthContext.Provider>
    )
}

export default App
