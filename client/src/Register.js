import React, {useState} from 'react'
import {Button, Card, Form} from "react-bootstrap";
import {http} from "./api/requests";
import {Spin} from "antd";
import Notification from "./components/Notification";
import {Navigate} from "react-router-dom";

export default function Register() {

    const [registerState, setRegisterState] = useState({
        validated: false,
        loading: false,
        message: null,
        messageType: 'Error',
        user: null
    })

    async function formSubmitHandler(e) {
        e.preventDefault()
        const validForm = e.currentTarget.checkValidity()
        let form = e.target

        if (validForm === false) {
            e.preventDefault()
            e.stopPropagation()
        }

        setRegisterState({
            ...registerState,
            validated: true
        })

        if (validForm) {
            setRegisterState({
                ...registerState,
                loading: true
            })
            await http().post("/user/signup", {
                userName: form["username"].value,
                userEmail: form["email"].value,
                password: form["password"].value
            }, {
                headers: {
                    Accept: "application/json"
                }
            }).then((res) => {
                setRegisterState({
                    ...registerState,
                    loading: false
                })
                clearFields(form)
                setRegisterState({
                    ...registerState,
                    message: "Registered successfully",
                    messageType: "Success",
                    user: res.data
                })

            }).catch((err) => {
                setRegisterState({
                    ...registerState,
                    loading: false,
                    message: err.response.data.message
                })
            })
        }
    }

    function clearFields (form) {
        form['username'].value = ''
        form['email'].value = ''
        form['password'].value = ''
    }

    if(registerState.user) return <Navigate to={"/login"} replace={true} />

    return (<div className={'position-relative'}>

            <Notification onClose={setRegisterState} type={registerState.messageType} notification={registerState} />
            <Card className={'form-wrapper'}>
                <Card.Body>
                    <Card.Title>Register new profile to continue</Card.Title>
                    <Spin spinning={registerState.loading}>
                        <Form noValidate validated={registerState.validated} onSubmit={formSubmitHandler}>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label className={'fw-bold'}>Enter your username</Form.Label>
                                <Form.Control
                                    required
                                    name={'username'}
                                    type="text"
                                    placeholder="Your username"
                                />
                                <Form.Control.Feedback type={"invalid"}>
                                    Username should be unique.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label className={'fw-bold'}>Enter your email</Form.Label>
                                <Form.Control
                                    required
                                    name={'email'}
                                    type="email"
                                    placeholder="email address"
                                />
                                <Form.Control.Feedback type={'invalid'}>
                                    Please provide valid mail address.
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label className={'fw-bold'}>Enter your password</Form.Label>
                                <Form.Control
                                    required
                                    name={'password'}
                                    type="password"
                                    placeholder="password"
                                />
                                <Form.Control.Feedback type={'invalid'}>
                                    Password must be provided
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Button variant="dark" type="submit">
                                Create
                            </Button>
                        </Form>
                    </Spin>
                </Card.Body>
            </Card>
        </div>

    )
}