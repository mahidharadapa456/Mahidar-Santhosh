import React from 'react'
import {Route, Routes} from "react-router-dom";
import App from "./App";
import UserLogin from "./UserLogin";
import Register from "./Register";
import UserProfile from "./components/UserProfile";

export default function AppView () {
    return (
        <Routes>
            <Route path={'/'} element={<App />} />
            <Route path={'login'} element={<UserLogin />} />
            <Route path={'signup'} element={<Register />} />
            <Route path={'userProfile/:userId'} element={<UserProfile />} />
        </Routes>
    )
}