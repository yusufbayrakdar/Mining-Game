import React from "react";
import { Modal, Button } from "react-bootstrap";
function YsModal({ title, msg, func, show, closeFunc }) {
  return (
    <Modal
      show={show}
      onHide={closeFunc}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{msg}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={closeFunc}>
          Iptal
        </Button>
        <Button variant="danger" onClick={func}>
          Devam Et
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default YsModal;
