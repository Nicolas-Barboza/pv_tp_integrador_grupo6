import { Modal, Button } from 'react-bootstrap';

function ConfirmacionModal({
    show,
    onHide,
    onConfirm,
    title,
    message,
    confirmButtonText = "Confirmar",
    cancelButtonText = "Cancelar",
    confirmVariant = "danger"
}) {
    const titleStyle = {
        overflowWrap: 'break-word', 
        wordBreak: 'break-word',    
    };

    const bodyStyle = {
        overflowWrap: 'break-word',
        wordBreak: 'break-word'
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title style={titleStyle}>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={bodyStyle}>{message}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    {cancelButtonText}
                </Button>
                <Button variant={confirmVariant} onClick={onConfirm}>
                    {confirmButtonText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmacionModal;