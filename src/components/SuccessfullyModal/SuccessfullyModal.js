import React from "react";
import Modal from "react-bootstrap/Modal";

const SuccessfullyModal = ({ show }) => {
  return (
    <Modal show={show}>
      <Modal.Body>your order has been submitted successfully</Modal.Body>
    </Modal>
  );
};

export default SuccessfullyModal;
