import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import YsInput from "../YsInput/index";
function MaterialModal({ title, func, show, closeFunc }) {
  const autofocus = useRef(null);
  const [once, setOnce] = useState(true);
  const [tempMaterial, setTempMaterial] = useState({
    name: "",
    unit_price: "",
    unit: "",
  });
  function setName(value) {
    setTempMaterial({ ...tempMaterial, name: value });
  }
  function setPrice(value) {
    setTempMaterial({ ...tempMaterial, unit_price: value });
  }
  function setUnit(value) {
    setTempMaterial({ ...tempMaterial, unit: value });
  }
  function checkKey(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    } else if (e.key === "Escape") {
    }
  }
  useEffect(() => {
    if (once && autofocus.current) {
      autofocus.current.focus();
      setOnce(false);
    }
  });
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
        <form>
          <YsInput
            focusRef={autofocus}
            icon="fas fa-cube"
            placeholder="Malzeme"
            theFunction={setName}
            value={tempMaterial.name}
            width="100%"
            checkKey={checkKey}
            name="add-material"
            autofocus={true}
          />
          <YsInput
            icon="fas fa-coins"
            placeholder="Birim Fiyat"
            theFunction={setPrice}
            value={tempMaterial.unit_price}
            width="100%"
            checkKey={checkKey}
            name="add-material-unit-price"
          />
          <YsInput
            icon="fas fa-tags"
            placeholder="Birim"
            theFunction={setUnit}
            value={tempMaterial.unit}
            width="100%"
            checkKey={checkKey}
            name="add-material-unit"
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            func(tempMaterial);
          }}
        >
          Kaydet
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MaterialModal;
