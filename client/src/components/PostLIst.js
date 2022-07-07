import React, {useEffect, useState} from 'react'
import {Button, Card, Col, Row} from "react-bootstrap";
import {http} from "../api/requests";
import {getUserFromStorage} from "../utils/loginHelpers";
import {Spin} from "antd";
import Notification from "./Notification";

export default function PostList({userState}) {

    const [post, setPost] = useState({
        posts: [],
        loading: false,
        deleteLoading: false,
        deleted: false
    })

    useEffect(() => {
        getPosts()
    }, [userState.postCreated, post.deleted])

    async function getPosts() {
        setPost({
            ...post,
            loading: true
        })
        await http().get(`/post/userPosts/${getUserFromStorage()._id}`)
            .then((res) => {
                setPost({
                    ...post,
                    loading: false,
                    posts: res.data.userPost || res.data
                })
            })
            .catch((err) => {
                setPost({
                    ...post,
                    loading: false
                })
            })
    }

    async function handleDelete (postId) {

        setPost({
            ...post,
            deleteLoading: true
        })

        await http().delete(`/post/deletePost/${postId}`)
            .then((res) => {
                setPost({
                    ...post,
                    deleteLoading: false,
                    deleted: true,
                    message: "Deleted post successfully"
                })
            })
            .catch((err) => {
                setPost({
                    ...post,
                    deleteLoading: false,
                    message: "Error while deleting post",
                    deleted: false
                })
            })
    }

    const $posts = post.posts.map((postData) => (
        <Col className={'post-item'} key={postData._id} xs={12} md={4} lg={3}>
            <Spin spinning={post.deleteLoading}>
                <Card>
                    <Card.Body>
                        <h4 className={'fw-bold text-truncate'}>{postData.postTitle}</h4>
                        <p>{postData.postContent.length > 450 ? postData.postContent.slice(0, 450) : postData.postContent}</p>
                    </Card.Body>
                    <Card.Footer>
                        <Button
                            onClick={() => handleDelete(postData._id)}
                        >
                            Delete it!
                        </Button>
                    </Card.Footer>
                </Card>
            </Spin>
        </Col>
    ))

    return (
        <Col xs={12} md={12} lg={12}>
            <Notification notification={post} onClose={setPost} type={'Success'} />
            <Spin spinning={!(post.posts.length > 0) && post.loading}>
                <h3 className={'fw-bold px-1'}>My posts</h3>
                <Row className={'gy-2'}>
                    {$posts}
                </Row>
            </Spin>
        </Col>
    )
}