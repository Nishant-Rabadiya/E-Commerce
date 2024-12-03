import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

const MessageModal = () => {
    const navigate: NavigateFunction = useNavigate();
    const contextValue = useContext(UserContext);

    const handleClose = () => contextValue?.setModal(false);
    const handleModalLoginbutton = () => {
        contextValue?.setModal(false);
        navigate('/login');
    }

    return (
        <Modal
            show={contextValue?.showModal}
            onHide={handleClose}
            backdrop='static'
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Please login first, you are not logged in.
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={handleClose}>
                    Close
                </Button>
                <Button variant='primary' onClick={handleModalLoginbutton}>Login</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MessageModal;