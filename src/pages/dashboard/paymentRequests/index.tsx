import React, { useEffect, useState, useRef } from "react";
import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ReactDOM from "react-dom"
import { PageHeader, Table, Select, Input, Tag, Button, Typography } from "antd";
import RoyaltiesModal from "../../../components/RoyaltiesModal";
import ModalPaypalConfirm from "../../../components/ModalPaypalConfirm"
import ModalConfirm from "../../../components/ModalConfirm"
import ModalConfirmWithMessage from "../../../components/ModalConfirmWithMessage"
import ModalInvoice from "../../../components/ModalInvoice"
import ModalSplits from "components/ModalSplits";

import ModalInfo from "../../../components/ModalInfo"
import EmailModal from "components/EmailModal";
import UserInfoPaymentsModal from "../../../components/UserInfoPaymentsModal"

import EditPercent from "../../../components/EditPercent";
import {
    fetchAll,
    acceptOne,
    getToken,
    rejectOne,
    manualOne,
    newRequest,
    getSplitsByReleaseId,
    getSplitsByUser
} from "redux/payments/actions";

import { fetchAllUsers } from "redux/users/actions";

import {
    CheckOutlined,
    FolderOpenOutlined,
    EditOutlined,
    CheckCircleFilled,
    CloseCircleFilled,
    InfoCircleOutlined
} from "@ant-design/icons";
import { info } from "console";


const { Text, Link } = Typography;



function PaymentRequests() {

    let confirmBtnRef = useRef();


    // Show other info
    const [isModalWatchVisible, setIsModalWatchVisible] = useState(false);
    const [invoiceTitle, setInvoiceTitle] = useState("");
    const [dataSelected, setDataSelected] = useState({});
    const showModalWatch = (data: any) => {
        const invoice = data.invoice;
        setDataSelected({ ...invoice, status: data.status, payable: invoice.after_comission, info: data.info });
        setInvoiceTitle(`Invoice  n°: ${invoice.number} - Usuario: ${data.user_email}`)
        setIsModalWatchVisible(true);
    };
    const handleCancel = () => {
        setInvoiceTitle('')
        setIsModalWatchVisible(false);
    };

    const cancelEmailModal = () => {
        setIsModalEmailVisible(false);
    };

    // End show other info
    //--------------------------------//
    //Show Royalties
    const [currentUploadId, setCurrentUploadId] = useState("");
    const [currentUploadName, setCurrentUploadName] = useState("");

    const [currDiskoverRevenue, setCurrDiskoverRevenue] = useState("");
    const [currRequestAmount, setCurrUsersAmount] = useState("");

    const [isRoyaltyVisible, setIsRoyaltyVisible] = useState(false);

    const [isInfoUserVisible, setIsinfoUserVisible] = useState(false);

    const [isSplitsVisible, setIsSplitsVisible] = useState(false);

    const [splitsData, setSplitsData] = useState([]);

    const [invoice, setInvoice] = useState({});

    const [infoUserData, setInfoUserData] = useState({});


    const openRoyalties = (upload: any) => {
        setCurrentUploadId(upload.request_id);
        setCurrentUploadName(upload.fileName);

        setCurrDiskoverRevenue(upload.diskoverRevenue + "");
        setCurrUsersAmount(upload.amount + "");

        setIsRoyaltyVisible(true);
    };

    const openSplits = (record: any) => {
        if (record.releaseId) {
            dispatch(getSplitsByReleaseId(record.releaseId, record.request_id, () => {
                setInvoice(record.invoice)
                setSplitsData(splits)
                setIsSplitsVisible(true);
            }))
        }
        else {
            dispatch(getSplitsByUser(record.user_email, record.request_id, () => {
                setInvoice(record.invoice)
                setSplitsData(splits)
                setIsSplitsVisible(true);
            }))
        }
    };

    const closeSplits = () => {
        setIsSplitsVisible(false);
    }


    const openInfoUsers = (upload: any) => {
        const user = users.filter((u: any) => {
            return u.id === upload.user_id
        })
        console.log(user[0])
        setInfoUserData(user[0]);
        setIsinfoUserVisible(true);
    };

    const closeRoyalties = () => {
        setCurrentUploadId("");
        setCurrentUploadName("");

        setCurrDiskoverRevenue("");
        setCurrUsersAmount("");

        setIsRoyaltyVisible(false);
    };
    //End Show Royalties
    //--------------------------------//
    // Edit percent
    const [isEditPercentVisible, setIsEditPercentVisible] = useState(false);

    const [isModalConfirmVisible, setIsModalConfirmVisible] = useState(false);

    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);

    const [isModalReturnVisible, setIsModalReturnVisible] = useState(false);

    const [isPaypalLoading, setIsPaypalLoading] = useState(false);



    const [modalEmail, setModalEmail] = useState("");
    const [modalAmount, setModalAmount] = useState("");
    const [paymentData, setPaymentData]: any = useState()


    function closeConfirm() {
        setIsPaymentResponse(false)
        setIsModalConfirmVisible(false)
    }

    function closeDelete() {
        setIsModalDeleteVisible(false)
    }

    function closeReturn() {
        setIsModalReturnVisible(false)
    }

    const [isBtnBlocked, setIsBtnBlocked] = useState(false);




    const [currentEmailToEdit, setCurrentEmailToEdit] = useState("");
    const [currentPercentToEdit, setCurrentPercentToEdit] = useState("");

    const openEditPercent = (r: any) => {
        setCurrentEmailToEdit(r.email);
        setCurrentPercentToEdit(r.percent);
        setIsEditPercentVisible(true);
    };
    const cancelEditPercent = () => {
        setCurrentEmailToEdit("");
        setCurrentPercentToEdit("");
        setIsEditPercentVisible(false);
    };

    const makePayment = (data: any, token: String, cb: any) => {
        dispatch(acceptOne(data, token, cb));
    };


    const rejectRequest = (textArea: string, cb: any) => {
        dispatch(rejectOne({ requestId: paymentData.request_id, info: textArea }, cb));
    };

    const sendManualPayment = (textArea: string, cb: any) => {
        dispatch(manualOne({ requestId: paymentData.request_id, info: textArea }, cb));
    };


    // End edit percent
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(fetchAllUsers("payments"));
        dispatch(fetchAll());
        dispatch(getToken());
        // console.log(token);

    }, [dispatch]);

    const { requests, loading, response, token, loadingNewRequest, splits } = useSelector(
        (state: any) => state.payment_requests
    );

    const createPaymentRequest = (email: String, cb: any) => {
        console.log("Holaaa");
        console.log(loadingNewRequest);
        if (!loadingNewRequest) {
            dispatch(newRequest(email, cb))
        }
    }


    const { users } = useSelector(
        (state: any) => state.users
    );


    const [data, setData] = useState(requests || [{}]);
    const [isPaymentResponse, setIsPaymentResponse] = useState(false);
    const [currentToken, setToken] = useState(token);


    const payButton = (data: any, status: String) => {
        if (status === "awaiting") {
            return <div>
                <Button type="primary" shape="round" icon={<CheckOutlined />} onClick={() => {
                    setModalEmail(data.paypal)
                    setModalAmount(data.amount.toFixed(2))
                    setPaymentData(data)
                    setIsModalConfirmVisible(true)
                }}>
                    Pagar
                </Button>
                <div style={{ height: 10 }}>

                </div>
                <Button type="primary" danger={true} shape="round" onClick={() => {
                    setModalEmail(data.paypal)
                    setModalAmount(data.amount.toFixed(2))
                    setPaymentData(data)
                    setIsModalDeleteVisible(true)
                }}>
                    Rechazar
                </Button>
            </div>
        } else if (status === "paid") {
            return <div>
                <Button type="primary" danger={true} shape="round" onClick={() => {
                    setModalEmail(data.paypal)
                    setModalAmount(data.amount.toFixed(2))
                    setPaymentData(data)
                    setIsModalReturnVisible(true)
                }}>
                    Devolver
                </Button>
            </div>
        }

    }

    const setStatus = (id: String, status: String) => {
        if (status === "awaiting") {
            return <Text style={{ color: "#CBCBCB", fontWeight: "bold" }}>En espera...</Text>
        }
        else if (status === "rejected") {
            return <Text style={{ color: "#EE0000", fontWeight: "bold" }}>Rechazado</Text>
        }
        else if (status === "paid") {
            return <Text style={{ color: "#0000FF", fontWeight: "bold" }}>Pago</Text>
        }
    }

    useEffect(() => {
        if (!loading) {
            setData(requests);
        }
    }, [requests]);

    const routes = [
        {
            path: "index",
            breadcrumbName: "",
        },
    ];
    const [search, setSearch] = useState("");
    const [status, setStatusFilter] = useState("all");
    const changeSearch = (entry: any) => {
        const { value } = entry.target;
        setSearch(value.toLowerCase());
    };
    useEffect(() => {
        let output = requests;
        if (search !== "") {
            const filteredData = requests.filter((e: any) => {
                if (
                    e.user_email.toLowerCase().includes(search) ||
                    e.paypal.toLowerCase().includes(search)
                ) {
                    return true;
                } else {
                    return false;
                }
            });
            output = filteredData;
        }

        if (status !== "all") {
            const filteredData = output.filter((e: any) => {
                if (status === "paid") {
                    if (e.status === "paid") return true;
                    else return false;
                } else if (status === "rejected") {
                    if (e.status === "rejected") return true;
                    else return false;
                } else {
                    if (e.status === "awaiting") return true;
                    else return false;
                }
            });

            output = filteredData;
        }

        setData(output);
    }, [search, status]);

    const [isModalManualVisible, setIsModalManualVisible] = useState(false);

    const [isModalInfoVisible, setIsModalInfoVisible] = useState(false);

    const [isModalEmailVisible, setIsModalEmailVisible] = useState(false);

    console.log("data:");

    console.log(data);



    const showManualModal = () => {
        setIsModalManualVisible(true)
    }
    const closeModalManual = () => {
        setIsModalManualVisible(false)
    }
    return (
        <div>
            <PageHeader
                title="Información de usuarios"
                ghost={false}
                breadcrumb={{ routes }}
            />

            <div
                className="top_content_container"
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "8px 12px",
                    margin: "8px 8px 0",
                    backgroundColor: "#fafafa",
                    borderRadius: "4px",
                    width: "auto",
                }}
            >
                <Input
                    style={{
                        width: "144px",
                        height: "40px",
                        backgroundColor: "white",
                        borderRadius: "4px",
                        borderColor: "#0a00ec",
                    }}
                    placeholder="Buscar"
                    onChange={(e) => changeSearch(e)}
                />
                <span
                    style={{
                        fontWeight: "normal",
                        fontSize: "16px",
                        marginLeft: "10px",
                    }}
                >
                    Estado:
                </span>
                <Select
                    defaultValue="all"
                    onChange={setStatusFilter}
                    style={{
                        width: "144px",
                        height: "40px",
                        borderRadius: "4px",
                    }}
                >
                    <Select.Option value="all">Todos</Select.Option>
                    <Select.Option value="awaiting">En Espera</Select.Option>
                    <Select.Option value="paid">Pagado</Select.Option>
                    <Select.Option value="rejected">Rechazado</Select.Option>
                </Select>
                <RoyaltiesModal
                    modalTitle={`Royalties de CSV File : ${currentUploadName}`}
                    isModalVisible={isRoyaltyVisible}
                    onCancel={closeRoyalties}
                    id={currentUploadId}
                    modalFooter={["Total:", currRequestAmount]}
                    upload={false}
                />
            </div>

            <div className="content_container">
                <Button style={{}} onClick={() => setIsModalEmailVisible(true)}>Nueva solicitud</Button>

                <Table
                    locale={{ emptyText: 'No hay información' }}
                    pagination={{ pageSize: 10 }}
                    dataSource={data}
                    loading={loading}
                    rowKey="document"
                    scroll={{ x: 1200 }}
                    style={{
                        marginTop: "20px",
                    }}
                    columns={[
                        {
                            title: "Owner Email",
                            dataIndex: "user_email",
                            key: "email_for_requests",
                            fixed: "left",
                            width: 200,
                        },
                        {
                            title: "Monto",
                            dataIndex: "amount",
                            key: "amount_for_request",
                            defaultSortOrder: "descend",
                            fixed: "left",
                            align: "center",
                            width: 120,
                            render: (data: any, record: any) =>
                                record.invoice.after_additional ? record.invoice.after_additional.toFixed(2) : record.invoice.after_comission.toFixed(2)

                        },
                        {
                            title: "Release ID",
                            dataIndex: "releaseId",
                            key: "releaseid_for_request",
                            width: 110,
                            defaultSortOrder: "descend",
                            render: (data: string, record: any) => {
                                if (data === null) {
                                    return (
                                        <span>
                                            Todos
                                        </span>
                                    )
                                } else {
                                    return (
                                        <span>
                                            {data}
                                        </span>
                                    )
                                }
                            }
                        },
                        {
                            title: "Paypal",
                            dataIndex: "paypal",
                            width: 275,
                            key: "paypal_account_for_request",
                            defaultSortOrder: "descend",
                        },
                        {
                            title: "Fecha",
                            dataIndex: "request_date",
                            width: 250,
                            key: "request_date_for_requests",
                            defaultSortOrder: "descend",
                            render: (data: string, record: any) => (
                                <span>
                                    {moment(data).local().format("DD/MM/YY - hh:mm")}
                                </span>
                            )
                        },
                        {
                            title: "Estado",
                            dataIndex: "",
                            key: "status_for_request",
                            width: 110,
                            defaultSortOrder: "descend",
                            render: (data: any, record: any) =>
                                setStatus(data._id, data.status)
                        },
                        {
                            title: "Splits",
                            dataIndex: "",
                            key: "status_for_request",
                            width: 110,
                            defaultSortOrder: "descend",
                            render: (data: any, record: any) => {
                                if (record.invoice.after_splits !== record.invoice.total) {
                                    return <Button onClick={() => openSplits(record)}>Ver</Button>
                                }
                                return ""
                            }

                        },
                        {
                            title: "Invoice",
                            dataIndex: "amount",
                            key: "invoice_for_request",
                            align: "center",
                            fixed: "right",
                            width: 90,
                            render: (data: string, record: any) =>
                                <>
                                    <FolderOpenOutlined
                                        style={{
                                            fontSize: "20px",
                                            color: "#00000",
                                        }}
                                        onClick={() => showModalWatch(record)}
                                    />
                                </>
                        },
                        {
                            title: "Royalties",
                            dataIndex: "upload_id",
                            align: "center",
                            key: "archived_for_releases",
                            fixed: "right",
                            width: 90,
                            render: (text: string, record: any) =>
                                <>
                                    <FolderOpenOutlined
                                        style={{
                                            fontSize: "20px",
                                            color: "#00000",
                                        }}
                                        onClick={() => openRoyalties(record)}
                                    />
                                </>
                        },
                        {
                            title: "Info usuario",
                            dataIndex: "upload_id",
                            align: "center",
                            key: "archived_for_releases",
                            fixed: "right",
                            width: 90,
                            render: (text: string, record: any) =>
                                <>
                                    <InfoCircleOutlined
                                        style={{
                                            fontSize: "20px",
                                            color: "#00000",
                                        }}
                                        onClick={() => openInfoUsers(record)}
                                    />
                                </>
                        },
                        {
                            title: "Paypal",
                            dataIndex: "",
                            fixed: "right",
                            align: "center",
                            width: 110,
                            key: "status_for_request",
                            defaultSortOrder: "descend",
                            render: (data: any, record: any) =>
                                payButton(data, data.status)
                        },
                        {
                            title: "Manual",
                            dataIndex: "request_id",
                            fixed: "right",
                            align: "center",
                            width: 110,
                            key: "status_for_request",
                            defaultSortOrder: "descend",
                            render: (data: any, record: any) => {
                                if (record.status === "awaiting") {
                                    return <Button type="primary" shape="round" icon={<CheckOutlined />} onClick={() => {
                                        setModalEmail(record.paypal)
                                        setModalAmount(record.amount.toFixed(2))
                                        setPaymentData(record)
                                        setIsModalManualVisible(true)
                                    }}>
                                        Pagado
                                    </Button>
                                }
                            }
                        }
                    ]}
                />
                <ModalPaypalConfirm
                    isLoading={isPaypalLoading}
                    paymentResponse={response}
                    isPaymentResponse={isPaymentResponse}
                    isBtnBlocked={isBtnBlocked}
                    modalTitle="Realizar pago"
                    isModalVisible={isModalConfirmVisible}
                    onCancel={closeConfirm}
                    onConfirm={() => {
                        setIsBtnBlocked(true)
                        setIsPaypalLoading(true)
                        makePayment(paymentData, token, () => {
                            setIsModalConfirmVisible(true)
                            setIsPaymentResponse(true)
                            setIsBtnBlocked(false)
                            setIsPaypalLoading(false)
                        })
                    }}
                    data={{
                        alert: `Estas a punto de realizar un pago a:`,
                        rows: [
                            `Email: ${modalEmail}
                            `,
                            `Total:  ${modalAmount}€`,
                        ],
                    }}
                />
                <ModalConfirmWithMessage
                    modalTitle="Rechazar pago"
                    isModalVisible={isModalDeleteVisible}
                    onCancel={closeDelete}
                    onConfirm={rejectRequest}
                    data={{
                        alert: `¿Está seguro de rechazar este pago?`,
                        rows: [
                            `Paypal: ${modalEmail}`
                            ,
                            `Cantidad:  ${modalAmount}`,
                        ],
                    }}
                    textTitle='Motivo de rechazo'
                />
                <ModalConfirmWithMessage
                    modalTitle="Pago manual"
                    isModalVisible={isModalManualVisible}
                    onCancel={closeModalManual}
                    onConfirm={sendManualPayment}
                    data={{
                        alert: `¿Ya ha realizado éste pago de forma manual?`,
                        rows: [
                            `Paypal: ${modalEmail}`
                            ,
                            `Cantidad:  ${modalAmount}`,
                        ],
                    }}
                    textTitle='Información del pago'
                />
                <ModalConfirm
                    modalTitle="Devlover royalties"
                    isModalVisible={isModalReturnVisible}
                    onCancel={closeReturn}
                    onConfirm={() => {
                        rejectRequest(paymentData, () => {
                            setIsModalReturnVisible(false)
                        })
                    }}
                    data={{
                        alert: `¿Está seguro de devolver este pago?`,
                        rows: [
                            "Ésta acción devolverá los royalties a la plataforma como disponibles para solicitar y marcará esta solicitud como RECHAZADA",
                            "Confirme ésta acción sólo si hubo algún error en paypal y el pago fue desestimado",
                            `Paypal: ${modalEmail}`
                            ,
                            `Cantidad:  ${modalAmount}`,
                        ],
                    }}
                />
                <ModalInvoice
                    modalTitle={invoiceTitle}
                    isModalVisible={isModalWatchVisible}
                    onCancel={handleCancel}
                    invoice={dataSelected}
                />
                <ModalSplits
                    modalTitle={invoiceTitle}
                    isModalVisible={isSplitsVisible}
                    onCancel={closeSplits}
                    onConfirm={createPaymentRequest}
                    data={splitsData}
                    invoice={invoice}
                />
                <EmailModal
                    modalTitle={invoiceTitle}
                    isModalVisible={isModalEmailVisible}
                    onCancel={cancelEmailModal}
                    onConfirm={createPaymentRequest}
                    data={"asd"}
                />
                <UserInfoPaymentsModal
                    modalTitle={"User info"}
                    isModalVisible={isInfoUserVisible}
                    onCancel={() => { setIsinfoUserVisible(false) }}
                    data={infoUserData}
                />
                <div>
                </div>
            </div>
        </div>
    );
}

export default PaymentRequests;
