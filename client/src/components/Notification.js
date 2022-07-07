import React from "react";
import {Toast, ToastContainer} from "react-bootstrap";

export default function ({onClose, notification, type}) {
    return (
        <ToastContainer className={'z-index-3'}>
            <Toast
                onClose={() => onClose((state) => ({
                    ...state,
                    message: null
                }))}
                show={!!notification.message}
                delay={3000}
                autohide>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">{type}</strong>
                </Toast.Header>
                <Toast.Body>{notification.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    )
}