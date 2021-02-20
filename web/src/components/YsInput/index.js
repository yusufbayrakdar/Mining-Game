import React, { useState, useEffect } from "react";
import "./index.css";
import NumberInput from "react-number-format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
function BykInput({
  type,
  width,
  placeholder,
  value = "",
  required,
  icon,
  errorMsg,
  theFunction,
  name = "",
  suggestions = [],
  fieldtype = "text",
  currency = "",
  onBlur = () => {},
  focusRef = null
}) {
  var InputComponent = fieldtype === "number" ? NumberInput : "input";
  const [firstTouch, setFirstTouch] = useState(false);
  const [values, setValues] = useState({
    formattedValue: "", //value after applying formatting
    value: "", //non formatted value as numeric string 23234235.56, if you are setting this value to state make sure to pass isNumericString prop to true
    floatValue: 0 //floating point representation. For big numbers it can have exponential syntax
  });
  const [isFocus, setIsFocus] = useState(false);
  const [isFull, setIsFull] = useState(false);
  useEffect(() => {
    setIsFull(value && value.length > 0 ? true : false);
  }, [value]);
  let myProps =
    fieldtype === "number"
      ? {
          decimalScale: 2,
          fixedDecimalScale: true,
          thousandSeparator: true,
          isNumericString: true,
          suffix: currency,
          values: values,
          onValueChange: values => {
            theFunction(values.value);
          }
        }
      : {
          onChange: event => {
            theFunction(event.target.value);
          }
        };
  if (focusRef) {
    myProps.ref = focusRef;
  }

  return (
    <div
      className="bykInput row"
      style={{
        width: width || "100%"
      }}
    >
      <FontAwesomeIcon icon={faUser} className="column bykInputIcon" />
      <label
        className={isFocus || isFull ? "labelMinimize" : "label"}
        // for={name}
      >
        {placeholder}
      </label>
      <InputComponent
        id={name}
        value={value}
        {...suggestions}
        {...myProps}
        required={firstTouch && !isFocus}
        className="bykInputField column"
        type={type}
        name={name}
        onFocus={() => {
          setFirstTouch(true);
          setIsFocus(true);
        }}
        onBlur={() => {
          onBlur();
          suggestions["onBlur"] && suggestions["onBlur"]();
          setIsFull(value && value.length > 0 ? true : false);
          setIsFocus(false);
        }}
      />
    </div>
  );
}

export default BykInput;
