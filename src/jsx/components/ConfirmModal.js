import { Button, Modal } from "react-bootstrap"

const ConfirmModal = (props) => {
  const handleClose = () => {
    if (props.onClose) {
      props.onClose();
    }
  }

  const handleConfirm = () => {
    if (props.onConfirm) {
      props.onConfirm(props.data);
    }
    handleClose();
  }

  return (
    <Modal className="fade" show={props.showModal} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>
          {props.title}
        </Modal.Title>
        <Button
          variant=""
          className="btn-close"
          onClick={handleClose}
        ></Button>
      </Modal.Header>
      <Modal.Body>
        <p>
          {props.content}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger light"
          onClick={handleClose}
        >
          No
        </Button>
        <Button
          variant="primary"
          onClick={handleConfirm}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal;
