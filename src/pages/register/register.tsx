import React from 'react';
import styles from './styles.module.scss';
import {
    PageHeader, Tag, Button, Statistic, Descriptions, Row, Col, Form,
    Input,
    Radio,
    Select,
    Cascader,
    DatePicker,
    InputNumber,
    TreeSelect,
    Switch,
    Checkbox,
} from 'antd';
import logo from 'assets/img/diskover-1.png'

function Register() {


    return (<>
        <PageHeader
            style={{
                boxShadow: "0px 9px 5px 0px rgb(0 0 0 / 32%)"
            }}
        >
            <div>
                <img src={logo} style={{
                    margin: "15px",
                    width: "200px",
                    height: "auto"
                }} alt="" />
            </div>
        </PageHeader>
        <div style={{
        }}>


            <Row justify="center" style={{ minHeight: '100vh', padding: "40px" }}>
                <Col style={{
                    width: "30%"
                }}>
                    <div className={styles.title}>
                        application form
                    </div>
                    <div className={styles.text}>
                        Para poder ofrecerte una experiencia acorde a lo que necesitas,
                        debemos saber algo más sobre ti. Rellena el siguiente formulario para
                        saber si podemos ayudarte y valorar tu incorporación a Diskover, si está todo claro y correcto,
                        te enviaremos el contrato y el acceso a nuestro nuevo back-office para que empieces a programar tu música
                    </div>
                    <Form
                        className={styles.form}
                        labelCol={{ span: 4 }}
                        // wrapperCol={{ span: 10 }}
                        layout="vertical"

                    // initialValues={{ size: componentSize }}
                    // onValuesChange={onFormLayoutChange}
                    // size={componentSize as SizeType}
                    >


                        <Form.Item label="">
                            <Select placeholder="Seleccionar tipo de cuenta*">
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="">
                            <Input placeholder="Nombre del sello*" />
                        </Form.Item>
                        <Form.Item label="">
                            <Input placeholder="Tu nombre real*" />
                        </Form.Item>
                        <Form.Item label="">
                            <Input placeholder="Email*" />
                        </Form.Item>
                        <Form.Item label="">
                            <Select placeholder="País*">
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="">
                            <Select placeholder="Controlas los derechos de la musica que vas a Distribuir*">
                                <Select.Option value="demo">Demo</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="">
                            <Input placeholder="Si tu respuesta es SI, cuál es tu distribuidor actual?" />
                        </Form.Item>
                        <Form.Item label="">
                            <Input placeholder="Como nos has conocido?" />
                        </Form.Item>
                        <div className={styles.text} style={{ textAlign: "right" }}>
                            * Campos obligatorios
                        </div>

                        <div className={styles.text}>
                            ¿Qué servicios adicionales le interesa utilizar en Diskover Co.
                        </div>

                        <Form.Item label="">
                            <Checkbox>Distribución de videos musicales</Checkbox>
                        </Form.Item>
                        <Form.Item label="">
                            <Checkbox>Publishing Administration</Checkbox>
                        </Form.Item>
                        <Form.Item label="">
                            <Checkbox>Ninguno</Checkbox>
                        </Form.Item>

                        <div className={styles.text}>
                            Diskover Co. se compromete a proteger y respetar su privacidad,
                            y solo usaremos su información personal para administrar su cuenta y para
                            proporcionar los productos y servicios que nos has solicitado. Nos comunicaremos
                            contigo sobre nuestros productos y servicios, así como sobre otros contenidos
                            que puedan ser de tu interés.
                            Para poder proporcionarte el servicio solicitado, necesitamos almacenar y procesar
                            sus datos personales.
                        </div>

                        <Form.Item label="">
                            <Checkbox>Acepto permitir que Diskover Co. almancene y procese mis datos personales.</Checkbox>
                        </Form.Item>
                        <Form.Item label="">
                            <Checkbox>Acepto recibir comunicaciones relacionadas con mi solicitud, productos, servicios o información general sobre Diskover Co.</Checkbox>
                        </Form.Item>

                        <div className={styles.text}>
                            Puede cancelar su subscripción a estas comunicaciones en cualquier momento. Para obtener más información
                            sobre cómo cancelar su suscripción, nuestras prácticas de privacidad y cómo nos comprometemos a proteger y respetar
                            su privacidad, consulte nuestra Política de privacidad.
                        </div>


                        <div className={styles.text}>
                            Diskover Co. se reserva el derecho de aceptar o rechazar mi solicitud a su entera discreción.
                        </div>

                        <Button>Solicitar acceso</Button>

                    </Form>
                </Col>
            </Row>

        </div>
    </>)
}

export default Register
