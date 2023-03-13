import React, { useEffect, useState } from "react";
import { PageHeader, Table, Input, Checkbox, Button, message, Row } from "antd";
import api from "helpers/api";

const Options = () => {

    const [options, setOptions] = useState([])
    const [options2, setOptions2]: any = useState({ starterAditionalFee: { isActive: false, fee: null }, someOtherOption: false })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        try {
            getSettings()
        }
        catch (err) {
        }
    }, [])


    const getSettings = async () => {
        const options = await api.get("/admin/get_settings")
        setOptions(options.data.settings)
        options.data.settings.forEach((opt: any) => {
            if (opt.type === "starterAditionalFee") {
                if (opt.isActive) {
                    setOptions2({
                        ...options2,
                        starterAditionalFee: {
                            isActive: true,
                            fee: opt.fee
                        }
                    })
                }
            }
        })

    }

    const updateSettings = async () => {
        setLoading(true)
        const resp = await api.post("/admin/set_settings", options2)
        if (resp.status === 200) {
            message.success('Información guardada con éxito');
        }
        else {
            message.warning('Se produjo en error al intentar guardar la información');
        }
        await getSettings()
        setLoading(false)

    }


    function onStarterFeeChange(checkedValues: any, record: any) {
        setOptions2({ ...options2, starterAditionalFee: { isActive: !options2["starterAditionalFee"]["isActive"], fee: options2["starterAditionalFee"]["fee"] } })
    }

    const routes = [
        {
            path: "index",
            breadcrumbName: "",
        },
    ];

    return <>
        <PageHeader
            title="Opciones"
            ghost={false}
            breadcrumb={{ routes }}
        />
        <div className="content_container">
            <Table
                locale={{ emptyText: 'No hay información' }}
                style={{
                    width: "100%",
                    marginTop: "20px",
                }}
                dataSource={options}
                loading={loading}
                rowKey="id"
                columns={[
                    {
                        title: "Opción",
                        dataIndex: "title",
                        key: "type",
                        width: "50%",
                    },
                    {
                        title: "Propiedades",
                        dataIndex: "fee",
                        fixed: "right",
                        width: "20%",
                        align: "center",
                        key: "fee",
                        render: (text: any, record: any) => {
                            if (record.type === "starterAditionalFee") {
                                return <>
                                    <Row style={{ placeContent: "center" }}>
                                        <Input type="number" width="20px" style={{ width: "100px" }} defaultValue={record.fee} onChange={(e: any) => setOptions2({ ...options2, starterAditionalFee: { ...options2["starterAditionalFee"], fee: e.target.value } })} />
                                        <div style={{ padding: "10px" }}>€</div>
                                    </Row>
                                </>
                            }
                            else {
                                return <></>
                            }
                        },
                    },
                    {
                        title: "Activo",
                        dataIndex: "isActive",
                        fixed: "right",
                        width: "50%",
                        align: "center",
                        key: "isActive",
                        render: (text: any, record: any) => {
                            return <>
                                <Checkbox onChange={(e) => onStarterFeeChange(e, record)} checked={options2[record.type]["isActive"]}></Checkbox>
                            </>
                        },
                    },
                ]}
            />
        </div>
        <Button style={{ float: "right", margin: "10px" }} onClick={updateSettings}>Guardar</Button>

    </>
}

export default Options