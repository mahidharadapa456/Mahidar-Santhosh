import React, {useState} from 'react'
import {Button, Card, Form} from "react-bootstrap";
import {http} from "./api/requests";
import {Spin} from "antd";
import {getUserFromStorage, setUserToLocalStorage} from "./utils/loginHelpers";
import {Link, Navigate} from 'react-router-dom'
import Notification from "./components/Notification";


const Login = () => {

    const [login, setLogin] = useState({
        loading: false,
        message: null,
    })

    async function submitHandler(e) {
        e.preventDefault()
        const form = e.target

        setLogin({
            ...login,
            loading: true
        })

        await http().post('/user/signIn', {
            userEmail: form['email'].value,
            password: form['password'].value
        }, {headers: {Accept: "application/json"}})
            .then((res) => {
                setLogin({
                    ...login,
                    loading: false
                })
                setUserToLocalStorage(res.data.user)
            })
            .catch((err) => {
                setLogin({
                    ...login,
                    loading: false,
                    message: err.response.data.error || err.response.data.message
                })

            })
    }

    if (getUserFromStorage()) {
        return <Navigate to={`/userProfile/${getUserFromStorage()._id}`} replace={true}/>
    }

    return (
        <Card className={'form-wrapper'}>
            <Notification onClose={setLogin} type={"Error"} notification={login}/>
            <Card.Body>
                <Card.Title>Log in to application</Card.Title>
                <Spin spinning={login.loading}>
                    <Form onSubmit={submitHandler}>
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label className={'fw-bold'}>Enter your email</Form.Label>
                            <Form.Control
                                required
                                name={"email"}
                                type="email"
                                placeholder="email address"/>
                            <Form.Text className="text-muted">
                                Enter email provided when signing up process
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label className={'fw-bold'}>Enter your password</Form.Label>
                            <Form.Control
                                required
                                name={'password'}
                                type="password"
                                placeholder="password"/>
                        </Form.Group>
                        <Button variant="dark" type="submit">
                            Login
                        </Button>
                        <span className="text-muted text-decoration-none d-flex justify-content-end align-items-center text-end fs-6">
                            <Link to={'/signup'}>
                                Want to sign up?
                            </Link>
                        </span>
                    </Form>
                </Spin>
            </Card.Body>
        </Card>
    )
}

export default Login