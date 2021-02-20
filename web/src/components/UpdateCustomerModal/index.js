import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import YsInput from "../YsInput/index";
function MaterialModal({ title, func, customer, show, closeFunc, isOpen }) {
  const autofocus = useRef(null);
  const [once, setOnce] = useState(true);
  const [onceSelect, setOnceSelect] = useState(true);
  const [tempUser, setTempUser] = useState({
    id: "",
    name: "",
  });
  function setName(value) {
    setTempUser({ ...tempUser, name: value });
  }
  function checkKey(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    } else if (e.key === "Escape") {
    }
  }
  useEffect(() => {
    if (once && autofocus.current && isOpen) {
      setTempUser(customer);
      setOnce(false);
    }
    if(autofocus.current&&autofocus.current.value.length>0&&onceSelect&&isOpen){
      autofocus.current.select();
      setOnceSelect(false);
    }
  });
  return (
    <Modal
      show={show}
      onHide={()=>{closeFunc();setName('');setOnce(true);setOnceSelect(true);}}
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
            value={tempUser.name}
            width="100%"
            checkKey={checkKey}
            name="add-material"
            autofocus={true}
          />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            func(tempUser);
          }}
        >
          Kaydet
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MaterialModal;
