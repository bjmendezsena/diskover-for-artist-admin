import React, { useEffect } from 'react';
import { Button, Modal, Form, Input, message, Select } from 'antd';
import { useSelector } from 'react-redux';

const { Option } = Select;


function EditUserForm(props: {
    modalTitle: string;
    onConfirm: any;
    confirmLoading: boolean;
    successMessage?: string;
    isVisible: boolean;
    onCancel: any;
    data: any;
    contactInfo: any;
}) {
    const {
        modalTitle,
        isVisible,
        onConfirm,
        onCancel,
        confirmLoading,
        successMessage,
        data,
        contactInfo
    } = props;
    console.log('data: ', data)
    const [form] = Form.useForm();
    const { labelError } = useSelector((state: any) => state.users);

    useEffect(() => {

        // let paypal;
        // if (data.contactInfo.hasOwnProperty("paypal")) {
        //     paypal = "asd"
        // }
        // else {
        //     paypal = ""
        // }
        console.log(data);


        form.setFieldsValue({
            id: data.id,
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            documentType: data.documentType,
            documentNumber: data.documentNumber,
            paypal: contactInfo.paypal,
            type: data.type,
            account: data.account,
            percent: data.percent,
            country: data.country,
            city: contactInfo.city,
            phone: contactInfo.phone,
            contract: data.contract,
            postalCode: contactInfo.postalCode
            // user_paypal: data.contactInfo.hasOwnProperty("country"),

        })
    }, [data]);
    const onSuccess = (msg: string) => {
        if (msg === "") {
            form.resetFields();
            message.success(successMessage || '¡Hecho!');
        } else {
            message.error(msg || 'Error!');
        }
        onCancel();
    };


    function handleChange(value: String) {
        console.log(`selected ${value}`);
    }

    function changeContractType(value: String) {
        console.log(`selected ${value}`);
    }

    const onOk = () => {
        form
            .validateFields()
            .then((values) => {
                onConfirm(values, onSuccess);
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <>
            <Modal
                title={modalTitle}
                visible={isVisible}
                onOk={onOk}
                onCancel={onCancel}
                footer={[
                    <Button key="back" onClick={onCancel}>
                        Cancelar
                    </Button>,
                    <Button key="submit" type="primary" onClick={onOk} loading={confirmLoading}>
                        Editar
                    </Button>,
                ]}
            >
                <Form layout="vertical" form={form}>
                    <Form.Item
                        label="Nombre"
                        name="name"
                        validateStatus={labelError && 'error'}
                        rules={[
                            { required: false, message: 'Es necesario que ingreses un nombre válido.' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Apellido"
                        name="lastName"
                        validateStatus={labelError && 'error'}
                        rules={[
                            { required: false, message: 'Es necesario que ingreses un nombre válido.' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        validateStatus={labelError && 'error'}
                        rules={[
                            { required: false, message: `Debes ingresar el email del usuario.` },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Numero de documento"
                        name="documentNumber"
                        validateStatus={labelError && 'error'}
                        rules={[
                            { required: false, message: 'Ingresa el documento del usuario' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Tipo de documento"
                        name="documentType"
                        validateStatus={labelError && 'error'}
                        rules={[
                            { required: false, message: 'Ingresa el documento del usuario' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Paypal"
                        name="paypal"
                        validateStatus={labelError && 'error'}
                        rules={[
                            { required: false, message: 'Ingresa el email de la cuenta de paypal del usuario' },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Tipo de usuario"
                        name="type"
                        validateStatus={labelError && 'error'}
                        rules={[
                            { required: false, message: 'Ingresa el tipo de usuario' },
                        ]}
                    >
                        <Select defaultValue="" style={{ width: 120 }} onChange={handleChange}>
                            <Option value="user">user</Option>
                            <Option value="enterprise">enterprise</Option>
                        </Select>
                        {/* <Input /> */}
                    </Form.Item>

                    <Form.Item
                        label="Tipo de cuenta"
                        name="account"
                        validateStatus={labelError && 'error'}
                        rules={[
                            { required: false, message: 'Ingresa el tipo de cuenta' },
                        ]}
                    >
                        <Select defaultValue="" style={{ width: 120 }} onChange={handleChange}>
                            <Option value="artist">artista</Option>
                            <Option value="sello">sello</Option>
                            <Option value="manager">manager</Option>
                        </Select>
                        {/* <Input /> */}
                    </Form.Item>

                    <Form.Item
                        label="Tipo de Contrato"
                        name="contract"
                        validateStatus={labelError && 'error'}
                        rules={[
                            { required: false, message: 'Ingresa el tipo de contrato' },
                        ]}
                    >
                        <Select defaultValue={data.contract} style={{ width: 120 }} onChange={(e) => changeContractType(e)}>
                            <Option value="starter">STARTER</Option>
                            <Option value="pro">PRO</Option>
                            <Option value="local">LOCAL</Option>
                        </Select>
                        {/* <Input /> */}
                    </Form.Item>


                    <Form.Item
                        label="URL de contrato"
                        name="contract_url"
                        validateStatus={labelError && 'error'}
                        rules={[
                            { required: false, message: 'Ingresa el tipo de contrato' },
                        ]}
                    >
                        {/* <Select defaultValue="" style={{ width: 120 }} onChange={handleChange}>
                            <Option value="starter">STARTER</Option>
                            <Option value="pro">PRO</Option>
                            <Option value="local">LOCAL</Option>
                        </Select> */}
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Comisión"
                        name="percent"
                        validateStatus={labelError && 'error'}
                        rules={[
                            { required: false, message: 'Ingresa el porcentaje que representa la comisión de diskover.' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="País"
                        name="country"
                        validateStatus={labelError && 'error'}
                        rules={[
                            { required: false, message: 'Ingresa un país.' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ciudad"
                        name="city"
                        validateStatus={labelError && 'error'}
                        rules={[
                            { required: false, message: 'Ingresa un país.' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Código Postal"
                        name="postalCode"
                        validateStatus={labelError && 'error'}
                        rules={[
                            { required: false, message: 'Ingresa un código postal.' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Teléfono"
                        name="phone"
                        validateStatus={labelError && 'error'}
                        rules={[
                            { required: false, message: 'Ingresa un número de teléfono.' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="id"
                        validateStatus={labelError && 'error'}
                        rules={[
                            { required: false, message: 'Ingresa un número de teléfono.' },
                        ]}
                    >                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default EditUserForm;
