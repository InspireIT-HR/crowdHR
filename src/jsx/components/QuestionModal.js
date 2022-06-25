import { Button, Modal } from "react-bootstrap"

const QuestionModal = (props) => {
  const handleModalClose = () => {
    if (props.handleCloseModal) {
      props.handleCloseModal();
    }
  }

  const handleAnswerYes = () => {
    if (props.handleAnswerYes) {
      props.handleAnswerYes(props.data);
    }
    handleModalClose();
  }

  return (
    <Modal className="fade" show={props.showModal} onHide={handleModalClose}>
      <Modal.Header>
        <Modal.Title>
          {props.title}
        </Modal.Title>
        <Button
          variant=""
          className="btn-close"
          onClick={handleModalClose}
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
          onClick={handleModalClose}
        >
          No
        </Button>
        <Button
          variant="primary"
          onClick={handleAnswerYes}
        >
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default QuestionModal;
