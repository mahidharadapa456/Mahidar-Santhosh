import React, {useState} from 'react'
import HomeNavbar from "./HomeNavbar";
import {Row} from "react-bootstrap";
import Profile from "./Profile";
import CreatePost from "./CreatePost";
import PostList from "./PostLIst";
import {getUserFromStorage, removeUserFromStorage} from "../utils/loginHelpers";
import {Navigate} from "react-router-dom";

export default function UserProfile () {
    const [userState, setUserState] = useState({
        logOut: false
    })

    if(userState.logOut || !getUserFromStorage()) {
        return <Navigate to={'/login'} replace={true} />
    }

    const handleLogout = () => {
        removeUserFromStorage()
        setUserState({
            ...userState,
            logOut: true
        })
        return <Navigate to={'/login'} replace={true} />
    }
    return (
        <div>
            <HomeNavbar onLogout={handleLogout} />
            <Row className={'gy-4'}>
                <Profile />
                <CreatePost dispatch={setUserState} />
                <PostList userState={userState} />
            </Row>

        </div>
    )
}