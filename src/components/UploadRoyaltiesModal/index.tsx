import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  message,
  DatePicker,
  Input,
  Upload,
  Col,
  Row,
} from "antd";
import { UploadOutlined, SwapRightOutlined } from "@ant-design/icons";
import { fetchPlatforms } from "redux/csv/actions";
import { useDispatch } from "react-redux";
import { SetStateAction } from "react";

import { InputNumber } from "antd";
import { count } from "console";

function onChange(value: Number) {
  console.log("changed", value);
}

// ReactDOM.render(<InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />, mountNode);

function UploadRoyaltiesModal(props: {
  modalTitle: string;
  openButtonText: string;
  onConfirm: any;
  confirmLoading: boolean;
  successMessage?: string;
}) {
  const {
    modalTitle,
    openButtonText,
    onConfirm,
    confirmLoading,
    successMessage,
  } = props;

  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const openModal = () => setVisible(true);
  const onCancel = () => setVisible(false);
  const [count, setCount] = useState(0);
  const [inputsFields, setInputsFields]: Array<any> = useState([]);
  const [fileName, setFileName] = useState("");
  const addOne = () => {
    let newSet = {
      platform: "",
      isrc: "",
      quantity: 0,
      period: "",
      country: "",
      payable: 0,
      upc: "",
    };
    setInputsFields([...inputsFields, newSet]);
    setCount(count + 1);
  };
  const removeOne = () => {
    setCount(count - 1);
    let arr = inputsFields;
    arr.pop();
    setInputsFields(arr);
  };
  const onSuccess = (msg?: string) => {
    setVisible(false);
    form.resetFields();
    if (msg) message.error(msg);
    else message.success(successMessage || "Éxito");
  };

  const onOk = () => {
    const req = { royalties: inputsFields, name: fileName };
    onConfirm(req, onSuccess);
  };

  const setOnePlatform = (i: any, e: any) => {
    const value = e.target.value;
    const array = inputsFields;
    array[i].platform = value;
    setInputsFields(array);
  };
  const setOneISRC = (i: any, e: any) => {
    const value = e.target.value;
    const array = inputsFields;
    array[i].isrc = value;
    setInputsFields(array);
  };

  const setOneUPC = (i: any, e: any) => {
    const value = e.target.value;
    const array = inputsFields;
    array[i].upc = value;
    setInputsFields(array);
  };
  const setOneQuantity = (i: any, e: any) => {
    const value = e;
    const array = inputsFields;
    array[i].quantity = value;
    setInputsFields(array);
  };
  const setOnePeriod = (i: any, e: any) => {
    const value = e;
    const array = inputsFields;
    array[i].period = value;
    setInputsFields(array);
  };
  const setOneCountry = (i: any, e: any) => {
    const value = e.target.value;
    const array = inputsFields;
    array[i].country = value;
    setInputsFields(array);
  };
  const setOnePayable = (i: any, e: any) => {
    console.log(e);
    const value = e;
    const array = inputsFields;
    array[i].payable = value;
    setInputsFields(array);
  };
  return (
    <>
      <Button
        onClick={openModal}
        loading={confirmLoading}
        style={{
          height: "40px",
          backgroundColor: "white",
          borderRadius: "4px",
          position: "absolute",
          right: "10rem",
        }}
      >
        + {openButtonText}
      </Button>
      <Modal
        title={modalTitle}
        visible={visible}
        width="80%"
        onOk={onOk}
        onCancel={onCancel}
        footer={[
          <Button key="back" onClick={onCancel}>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={onOk}
            loading={confirmLoading}
          >
            Subir
          </Button>,
        ]}
      >
        <div style={{ margin: "0 .1rem 2rem" }}>
          <label htmlFor={`file_name_for_manual`} style={{ display: "block" }}>
            Nombre de subida
          </label>
          <Input
            id={`file_name_for_manual`}
            placeholder="Nombre de subida"
            onChange={(e) => setFileName(e.target.value)}
          />
        </div>
        {inputsFields.map((input: any, i: Number) => {
          return (
            <div
              style={{
                maxWidth: "130em",
                display: "flex",
                justifyContent: "space-between",
                marginBottom: ".5rem",
              }}
              key={`input_form_no_${i}`}
            >
              <div style={{ margin: "0 .1rem" }}>
                <label
                  htmlFor={`platform_no_${i}`}
                  style={{ display: "block" }}
                >
                  Plataforma
                </label>
                <Input
                  id={`platform_no_${i}`}
                  placeholder="Plataforma"
                  onChange={(e) => setOnePlatform(i, e)}
                />
              </div>
              <div style={{ margin: "0 .1rem" }}>
                <label htmlFor={`isrc_no_${i}`} style={{ display: "block" }}>
                  ISRC
                </label>
                <Input
                  id={`isrc_no_${i}`}
                  placeholder="ISRC"
                  onChange={(e) => setOneISRC(i, e)}
                />
              </div>
              <div style={{ margin: "0 .1rem" }}>
                <label htmlFor={`upc_no_${i}`} style={{ display: "block" }}>
                  UPC
                </label>
                <Input
                  id={`isrc_no_${i}`}
                  placeholder="UPC"
                  onChange={(e) => setOneUPC(i, e)}
                />
              </div>
              <div style={{ margin: "0 .1rem" }}>
                <label
                  htmlFor={`quantity_no_${i}`}
                  style={{ display: "block" }}
                >
                  Cantidad
                </label>
                <InputNumber
                  min={0}
                  max={10000}
                  id={`quantity_no_${i}`}
                  placeholder="Vistas/Descargas"
                  onChange={(e) => setOneQuantity(i, e)}
                />
              </div>
              <div style={{ margin: "0 .1rem" }}>
                <label htmlFor={`period_no_${i}`} style={{ display: "block" }}>
                  Período
                </label>
                <DatePicker
                  format="MM/YY"
                  picker="month"
                  id={`period_no_${i}`}
                  placeholder="Período"
                  onChange={(e) => setOnePeriod(i, e)}
                />
              </div>
              <div style={{ margin: "0 .1rem" }}>
                <label htmlFor={`country_no_${i}`} style={{ display: "block" }}>
                  Código País
                </label>
                <Input
                  id={`country_no_${i}`}
                  placeholder="País"
                  onChange={(e) => setOneCountry(i, e)}
                />
              </div>
              <div style={{ margin: "0 .1rem" }}>
                <label htmlFor={`payable_no_${i}`} style={{ display: "block" }}>
                  Pagable(eur)
                </label>
                <InputNumber
                  min={0}
                  max={10000}
                  id={`payable_no_${i}`}
                  onChange={(e) => setOnePayable(i, e)}
                />
              </div>
            </div>
          );
        })}

        <Button onClick={addOne}>+</Button>
        <Button style={{ margin: "1em .5em" }} onClick={removeOne} danger>
          -
        </Button>
      </Modal>
    </>
  );
}

export default UploadRoyaltiesModal;
