import React, { useState, useRef } from "react";
import {
  Modal,
  Button,
  Row,
  Col,
  Table,
  Container,
  Badge,
} from "react-bootstrap";
import YsInput from "../YsInput/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import helper from "../../helper";
import { useSelector } from "react-redux";
import "./index.css";
import Autocomplete from "@material-ui/lab/Autocomplete";
function YsModal({ title, func, show, closeFunc }) {
  const getUser = useRef(null);
  const [tempSale, setTempSale] = useState({
    name: "",
    materials: [],
    cost: "",
    paid: "",
    description: "",
    sale_date: new Date(),
  });
  const customers = useSelector((state) => state.customer.customers);
  const materials = useSelector((state) => state.material.materials);
  const [tempMaterial, setTempMaterial] = useState({
    id: "",
    name: "",
    amount: "",
    unit_price: "",
    description: "",
  });
  const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  function setTempSaleOf(key, value) {
    setTempSale({ ...tempSale, [key]: value });
  }
  function setTempMaterialOf(key, value) {
    setTempMaterial({ ...tempMaterial, [key]: value });
  }
  function isValidMaterial(material) {
    let isValid = false;
    if (material) {
      let keys = Object.keys(material);
      if (keys.length > 3) {
        keys.length = 3;
      } else {
        return false;
      }
      for (let i = 0; i < keys.length; i++) {
        if (material[keys[i]].length === 0) {
          isValid = false;
          break;
        }
        isValid = true;
      }
    }
    return isValid;
  }
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
        <form ref={getUser}>
          <Autocomplete
            id="free-solo-demo"
            freeSolo
            options={customers.map((option) => {
              option.value = option.name;
              return option.value;
            })}
            value={tempSale.name}
            onChange={(e, name) => {
              setTempSaleOf("name", name);
            }}
            inputValue={tempSale.name}
            onInputChange={(event, newName) => {
              setTempSaleOf("name", newName);
            }}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <YsInput
                  name="customer"
                  value={tempSale.name}
                  icon="fas fa-user"
                  required={true}
                  placeholder="Müşteri"
                  theFunction={(value) => {
                    setTempSaleOf("name", value);
                  }}
                  width="100%"
                  suggestions={params.inputProps}
                />
              </div>
            )}
          />
          <div className="materialSection">
            <div className="materialsHeader">Malzemeler</div>
            <Container className="badges">
              {tempSale.materials.map((material, index) => (
                <Badge className="badge">
                  <Row className="badgeRow">
                    <div className="badgeText">
                      {material.name} {`(${material.amount})`}
                    </div>
                    <i
                      class="fas fa-times remove"
                      onClick={() => {
                        let cost =
                          Number(tempSale.cost) -
                          Number(material.amount) * Number(material.unit_price);
                        setTempSale({
                          ...tempSale,
                          materials: helper.removeFromArray(
                            tempSale.materials,
                            index
                          ),
                          cost: cost > 0 ? cost : "",
                        });
                      }}
                    />
                  </Row>
                </Badge>
              ))}
            </Container>
            <Autocomplete
              id="free-solo-demo"
              freeSolo
              options={materials.map((option) => {
                option.value = option.name;
                return option.value;
              })}
              value={tempMaterial.name}
              onChange={(e, name) => {
                let found = materials.find((m) => m.name === name);
                setTempMaterial({
                  ...tempMaterial,
                  id: found.id,
                  name: name,
                  unit_price: found.unit_price,
                });
                getUser.current["amount"].focus();
              }}
              inputValue={tempMaterial.name}
              onInputChange={(event, newName) => {
                setTempMaterialOf("name", newName);
              }}
              renderInput={(params) => (
                <div ref={params.InputProps.ref}>
                  <YsInput
                    name="material"
                    icon="fas fa-cube"
                    value={tempMaterial.name}
                    placeholder="Malzeme Ekle"
                    theFunction={(value) => {
                      setTempMaterialOf("name", value);
                    }}
                    width="100%"
                    suggestions={params.inputProps}
                  />
                </div>
              )}
            />
            <YsInput
              icon="fas fa-coins"
              placeholder="Miktar"
              theFunction={(value) => {
                setTempMaterialOf("amount", value);
              }}
              value={tempMaterial.amount}
              name="amount"
              width="100%"
              fieldtype="number"
            />
            <YsInput
              icon="fas fa-lira-sign"
              placeholder="Birim Fiyat"
              value={tempMaterial.unit_price}
              theFunction={(value) => {
                setTempMaterialOf("unit_price", value);
              }}
              name="unit_price"
              width="100%"
              fieldtype="number"
              currency="₺"
            />
            <YsInput
              icon="far fa-comment-alt"
              value={tempMaterial.description}
              theFunction={(value) => {
                setTempMaterialOf("description", value);
              }}
              placeholder="Malzeme Açıklaması"
              name="material_description"
              width="100%"
            />
            <br className="noselect" />
            <Button
              variant="primary"
              className="tempMaterialAdditionButton"
              onClick={() => {
                if (isValidMaterial(tempMaterial)) {
                  setTempSale({
                    ...tempSale,
                    materials: [
                      ...tempSale.materials,
                      {
                        ...tempMaterial,
                        id: materials.find(
                          (material) => material.name === tempMaterial.name
                        ).id,
                      },
                    ],
                    cost:
                      (Number(tempSale.cost) || 0) +
                      Number(tempMaterial.amount) *
                        Number(tempMaterial.unit_price),
                  });
                  setTempMaterial({
                    id: "",
                    name: "",
                    amount: "",
                    unit_price: "",
                    description: "",
                  });
                  getUser.current["material"].focus();
                } else {
                  console.log("else");
                }
              }}
            >
              Ekle
            </Button>
          </div>
          <YsInput
            icon="fas fa-coins"
            placeholder="Fiyat"
            value={tempSale.cost}
            theFunction={(value) => {
              setTempSaleOf("cost", value);
            }}
            name="cost"
            width="100%"
            fieldtype="number"
            currency="₺"
          />
          <YsInput
            icon="fas fa-wallet"
            placeholder="Ödenen"
            value={tempSale.paid}
            theFunction={(value) => {
              setTempSaleOf("paid", value);
            }}
            name="paid"
            width="100%"
            fieldtype="number"
            currency="₺"
          />
          <YsInput
            icon="far fa-comment-alt"
            placeholder="Açıklama"
            value={tempSale.description}
            theFunction={(value) => {
              setTempSaleOf("description", value);
            }}
            name="sale_description"
            width="100%"
          />
          <div className="corners">
            <Row className="center">
              <i className="far fa-calendar-alt dateIcon"></i>
              <DatePicker
                className={
                  isCalenderOpen ? "datePickerOpen" : "datePickerClosed"
                }
                dateFormat="dd/MM/yyyy"
                selected={tempSale.sale_date}
                onCalendarOpen={() => {
                  setIsCalenderOpen(true);
                }}
                onCalendarClose={() => {
                  setIsCalenderOpen(false);
                }}
                onChange={(date) => setTempSaleOf("sale_date", date)}
              />
            </Row>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          className="tempMaterialAdditionButton"
          onClick={() => {
            console.log(tempSale);
            func(tempSale);
          }}
        >
          Kaydet
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default YsModal;
