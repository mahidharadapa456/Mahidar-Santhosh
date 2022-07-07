import React, {useState} from 'react'
import {Button, Card, Col, Form} from "react-bootstrap";
import {Spin} from "antd";
import {http} from "../api/requests";
import {getUserFromStorage} from "../utils/loginHelpers";
import Notification from "./Notification";

export default function CreatePost({dispatch}) {

    const [post, setPost] = useState({
        loading: false,
        message: '',
        messageType: "Error",
        postCreated: false
    })

    async function createPost(e) {
        e.preventDefault()
        const form = e.target

        setPost({
            ...post,
            loading: true
        })
        await http().post('/post/createPost', {
            postTitle: form['postTitle'].value,
            postContent: form['postContent'].value,
            postOwner: getUserFromStorage()._id || getUserFromStorage().id
        })
            .then((res) => {
                setPost({
                    ...post,
                    loading: false,
                    message: "Post created successfully",
                    messageType: "Success",
                    postCreated: !post.postCreated
                })

                dispatch((prev) => ({
                    ...prev,
                    ...post
                }))

               form['postTitle'].value = ''
               form['postContent'].value = ""
            })
            .catch((err) => {
                setPost({
                    ...post,
                    loading: false,
                    message: "Error while creating post",
                    messageType: "Error"
                })
            })
    }

    return (
        <Col xs={12} md={6} lg={8}>
            <Card>
                <Notification type={post.messageType} notification={post} onClose={setPost} />
                <Card.Body>
                    <Spin spinning={post.loading}>
                        <Form onSubmit={createPost}>
                            <Form.Group className="mb-3" controlId="postTitle">
                                <Form.Label className={'fw-bold'}>Give a title for your post</Form.Label>
                                <Form.Control
                                    required
                                    name={"postTitle"}
                                    type="text"
                                    placeholder="Title of the post"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="postContent">
                                <Form.Label className={'fw-bold'}>Content for your post</Form.Label>
                                <Form.Control
                                    as={'textarea'}
                                    required
                                    name={"postContent"}
                                    type="text"
                                    style={{
                                        height: '100px'
                                    }}
                                    placeholder="Content of the post"/>
                            </Form.Group>
                            <Button type={'submit'}>
                                Create post
                            </Button>
                        </Form>
                    </Spin>
                </Card.Body>
            </Card>
        </Col>
    )
}