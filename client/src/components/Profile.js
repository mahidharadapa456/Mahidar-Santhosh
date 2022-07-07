import React from 'react'
import {Button, Card, Col, Image} from "react-bootstrap";
import {getUserFromStorage} from "../utils/loginHelpers";
import {EditOutlined} from '@ant-design/icons'

export default function Profile() {
    const user = getUserFromStorage()
    return (
        <Col sm={12} md={6} lg={4}>
            <Card>
                <Card.Header>My Information</Card.Header>
                <Card.Body className={'d-flex'}>
                    <div>
                        <Image width={50} height={50} src={'/User_font_awesome.svg.webp'} roundedCircle={true}>
                        </Image>
                        <Button className={'p-2 pt-0 mt-3 me-3'}>
                            <EditOutlined/>
                        </Button>
                    </div>
                    <div>
                        <span className="text-muted underline">Username: @{user.userName}</span>
                        <br/>
                        <span className="text-muted underline">Email: {user.userEmail}</span>
                    </div>
                </Card.Body>
            </Card>

        </Col>
    )
}