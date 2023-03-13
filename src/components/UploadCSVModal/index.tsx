import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  message,
  Select,
  Card,
  Upload,
  Col,
  Row,
} from "antd";
import { UploadOutlined, SwapRightOutlined } from "@ant-design/icons";
import { fetchPlatforms } from "redux/csv/actions";
import { useDispatch } from "react-redux";
import { SetStateAction } from "react";

import { InputNumber } from "antd";

function onChange(value: Number) {
  console.log("changed", value);
}

// ReactDOM.render(<InputNumber min={1} max={10} defaultValue={3} onChange={onChange} />, mountNode);

function UploadCSVModal(props: {
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
  const [platforms, setPlatforms] = useState([]);
  const openModal = () => setVisible(true);
  const onCancel = () => setVisible(false);

  useEffect(() => {
    if (visible) fetchOptions();
  }, [visible]);

  const fetchOptions = () => {
    dispatch(fetchPlatforms(setOptions));
  };
  const setOptions = (data: any) => {
    const { error, options } = data;
    if (!error) {
      setPlatforms(options);
    } else {
      message.error("ERROR!");
    }
  };

  const onSuccess = (msg?: string) => {
    setVisible(false);
    form.resetFields();
    if (msg) message.error(msg);
    else message.success(successMessage || "Éxito");
  };

  const createBlob = (e: any) => {
    console.log(e);
    if (!e.file) {
      console.log("No file");
    } else {
      console.log(e.file.originFileObj);
      setFile(e.file.originFileObj);
      e.file.status = "done";
    }
  };
  const onOk = () => {
    let form = new FormData();
    form.append("file", file);
    form.append("currency", reportCurrency);
    form.append("reportCurrency", reportCurrency);
    form.append("outputCurrency", outputCurrency);
    form.append("exchangeValue", exchangeValue.toString());

    if (forSpotify) {
      form.append("reportCurrency2", reportCurrency2);
      form.append("exchangeValue2", exchangeValue2.toString());
    }

    if (forApple) form.append("date", `${appleMonth}/01/${appleYear}`);
    const req = { platform, form };
    onConfirm(req, onSuccess);
  };

  const actualYear = new Date().getFullYear();

  const [file, setFile] = useState("");
  const [platform, setPlatform] = useState();
  const [currency, setCurrency] = useState("");

  const [reportCurrency, setReportCurrency] = useState("");
  const [reportCurrency2, setReportCurrency2] = useState("");

  const [exchangeValue, setExchangeValue] = useState(1);
  const [exchangeValue2, setExchangeValue2] = useState(1);

  const [appleMonth, setAppleMonth] = useState("");
  const [appleYear, setAppleYear] = useState(actualYear);

  const [outputCurrency, setOutputCurrency] = useState("");

  const [forSpotify, setForSpotify] = useState(false);
  const [forApple, setForApple] = useState(false);
  const months: Record<string, string> = {
    January: "Enero",
    February: "Febrero",
    March: "Marzo",
    April: "Abril",
    May: "Mayo",
    June: "Junio",
    July: "Julio",
    August: "Agosto",
    September: "Septiembre",
    October: "Octubre",
    November: "Noviembre",
    December: "Diciembre",
  };

  useEffect(() => {
    setForSpotify(platform === "spotify");
    setForApple(platform === "Apple music");
  }, [platform]);

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
          right: "1.6%",
        }}
      >
        + {openButtonText}
      </Button>
      <Modal
        title={modalTitle}
        visible={visible}
        width="55em"
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
            Crear
          </Button>,
        ]}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingBottom: "2em",
            }}
          >
            <div style={{ height: "auto", width: "20em" }}>
              <Select
                style={{ width: "100%" }}
                onChange={(e) => setPlatform(e)}
                value={platform || undefined}
                placeholder="Platform"
              >
                {platforms.map((plat, i) => {
                  return (
                    <Select.Option key={i} value={plat}>
                      {" "}
                      {plat}{" "}
                    </Select.Option>
                  );
                })}
              </Select>

              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col
                  style={{
                    marginTop: "1rem",
                    maxWidth: "100px",
                    padding: "5px",
                  }}
                >
                  <div>De:</div>
                  <Select
                    style={{ width: "80px" }}
                    onChange={(e) => setReportCurrency(e)}
                    value={reportCurrency || undefined}
                    placeholder="CCY"
                  >
                    <Select.Option key="usd_for_upload" value="usd">
                      USD
                    </Select.Option>
                    <Select.Option key="eur_for_upload" value="eur">
                      EUR
                    </Select.Option>
                    <Select.Option key="gbp_for_upload" value="gbp">
                      GBP
                    </Select.Option>
                  </Select>
                  <InputNumber
                    min={1}
                    max={10}
                    defaultValue={1}
                    onChange={(e) => onChange(e)}
                    disabled={true}
                  />
                </Col>

                <Col style={{ marginTop: "3rem" }}>
                  <SwapRightOutlined style={{ fontSize: "200%" }} />
                </Col>
                <Col
                  style={{
                    marginTop: "1rem",
                    maxWidth: "100px",
                    padding: "5px",
                  }}
                >
                  <div>A:</div>

                  <Select
                    style={{ width: "80px%" }}
                    onChange={(e) => setOutputCurrency(e)}
                    value={outputCurrency || undefined}
                    placeholder="CCY"
                  >
                    <Select.Option key="usd_for_upload" value="usd">
                      USD
                    </Select.Option>
                    <Select.Option key="eur_for_upload" value="eur">
                      EUR
                    </Select.Option>
                    <Select.Option key="gbp_for_upload" value="gbp">
                      GBP
                    </Select.Option>
                  </Select>

                  <InputNumber
                    min={0}
                    max={1000}
                    defaultValue={1}
                    onChange={(e) => setExchangeValue(e)}
                  />
                </Col>
              </Row>
              {forApple && (
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col
                    style={{
                      marginTop: "1rem",
                      maxWidth: "100px",
                      padding: "5px",
                    }}
                  >
                    <div>Mes:</div>
                    <Select
                      style={{ width: "80px" }}
                      onChange={(e) => setAppleMonth(e)}
                      value={appleMonth}
                      placeholder="Mes"
                    >
                      {Object.keys(months).map((month: string, index) => (
                        <Select.Option
                          key={month}
                          value={String(index + 1).padStart(2, "0")}
                        >
                          {months[month]}
                        </Select.Option>
                      ))}
                    </Select>
                  </Col>

                  <Col style={{ marginTop: "3rem" }}>
                    <SwapRightOutlined style={{ fontSize: "200%" }} />
                  </Col>
                  <Col
                    style={{
                      marginTop: "1rem",
                      maxWidth: "100px",
                      padding: "5px",
                    }}
                  >
                    <div>Año</div>

                    <Select
                      style={{ width: "80px%" }}
                      onChange={(e) => setAppleYear(e)}
                      value={appleYear}
                      placeholder="Año"
                    >
                      <Select.Option
                        key={actualYear - 1}
                        value={actualYear - 1}
                      >
                        {actualYear - 1}
                      </Select.Option>

                      <Select.Option key={actualYear} value={actualYear}>
                        {actualYear}
                      </Select.Option>

                      <Select.Option
                        key={actualYear + 1}
                        value={actualYear + 1}
                      >
                        {actualYear + 1}
                      </Select.Option>
                    </Select>
                  </Col>
                </Row>
              )}
              {forSpotify && (
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col
                    style={{
                      marginTop: "1rem",
                      maxWidth: "100px",
                      padding: "5px",
                    }}
                  >
                    <div>De:</div>
                    <Select
                      style={{ width: "80px" }}
                      onChange={(e) => setReportCurrency2(e)}
                      value={reportCurrency2 || undefined}
                      placeholder="CCY"
                    >
                      <Select.Option key="usd_for_upload" value="usd">
                        USD
                      </Select.Option>
                      <Select.Option key="eur_for_upload" value="eur">
                        EUR
                      </Select.Option>
                      <Select.Option key="gbp_for_upload" value="gbp">
                        GBP
                      </Select.Option>
                    </Select>
                    <InputNumber
                      min={1}
                      max={10}
                      defaultValue={1}
                      onChange={(e) => onChange(e)}
                      disabled={true}
                    />
                  </Col>

                  <Col style={{ marginTop: "3rem" }}>
                    <SwapRightOutlined style={{ fontSize: "200%" }} />
                  </Col>
                  <Col
                    style={{
                      marginTop: "1rem",
                      maxWidth: "100px",
                      padding: "5px",
                    }}
                  >
                    <div>A:</div>

                    <Select
                      style={{ width: "80px%" }}
                      onChange={(e) => setOutputCurrency(e)}
                      value={outputCurrency || undefined}
                      placeholder="CCY"
                    >
                      <Select.Option key="usd_for_upload" value="usd">
                        USD
                      </Select.Option>
                      <Select.Option key="eur_for_upload" value="eur">
                        EUR
                      </Select.Option>
                      <Select.Option key="gbp_for_upload" value="gbp">
                        GBP
                      </Select.Option>
                    </Select>

                    <InputNumber
                      min={0}
                      max={1000}
                      defaultValue={1}
                      onChange={(e) => setExchangeValue2(e)}
                    />
                  </Col>
                </Row>
              )}
            </div>

            <Upload.Dragger
              onChange={(e) => createBlob(e)}
              maxCount={1}
              customRequest={() => console.log("request")}
              style={{
                padding: "1em",
                margin: "0 3em",
              }}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">
                Click aquí o arrastre un archivo!
              </p>
            </Upload.Dragger>
          </div>
          <div>
            <Card
              style={{
                width: "auto",
                backgroundColor: "rgba(198, 15, 3, .3)",
                padding: ".1rem .2rem",
                borderRadius: "8px",
                borderStyle: "none",
                margin: ".5rem .3rem",
              }}
            >
              <p
                style={{
                  fontWeight: "normal",
                  margin: "0",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                En archivos muy extensos, ésta acción puede demorar varios
                minutos.
              </p>
              <p
                style={{
                  color: "rgba(0,0,0,.6)",
                  fontWeight: "bold",
                  margin: "0",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                Sea paciente por favor.
              </p>
            </Card>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default UploadCSVModal;
