import React, {useState} from 'react'
import './App.css';
import HomeNavbar from "./components/HomeNavbar";
import {Outlet, Navigate} from "react-router-dom"
import {getUserFromStorage, removeUserFromStorage} from "./utils/loginHelpers";

function App() {

    const [logout, setLogout] = useState(false)

    const handleLogout = () => {
        removeUserFromStorage()
        setLogout(true)
        return <Navigate to={'/login'} replace={true} />
    }

    if(logout || !getUserFromStorage()) {
        return <Navigate to={'/login'} replace={true} />
    }



    return (
        <div className="App">
            <HomeNavbar onLogout={handleLogout} />
            <Outlet/>
        </div>
    );
}

export default App;