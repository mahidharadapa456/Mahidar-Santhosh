import React from 'react'
import {Container, Nav, Navbar} from "react-bootstrap";
import {getUserFromStorage} from "../utils/loginHelpers";

const HomeNavbar = ({onLogout}) => {

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">My App</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {!getUserFromStorage() && (<>
                            <Nav.Link href="signup">
                                Register to app
                            </Nav.Link>
                            <Nav.Link href={'login'}>
                                Sign in
                            </Nav.Link>
                        </>)}

                    </Nav>
                    {getUserFromStorage() && (
                        <Nav>
                            <Nav.Link href={`/userProfile/${getUserFromStorage()._id}`}>
                                Profile
                            </Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                User: {getUserFromStorage().userName}
                            </Nav.Link>
                            <Nav.Link onClick={() => onLogout()}>
                                Sign out
                            </Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>)
}

export default HomeNavbar;