import React from 'react'
import { Modal, Spinner } from 'react-bootstrap'
const Loading = (props) => {
    return (
        <>
            {/* Loading modal start */}
            <Modal className='ScoreModal' size="sm" centered style={{ backgroundColor: 'rgba(0,0,0,0.6)' }} show={props.show} onHide={() => props.onHide()} backdrop="static" keyboard={false}>
                <Modal.Body>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
                        <Spinner animation="border" variant="dark" />
                    </div>
                </Modal.Body>
            </Modal>
            {/* Loading modal end */}
        </>
    )
}

export default Loading