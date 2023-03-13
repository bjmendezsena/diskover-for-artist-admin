import React from "react";
import styles from './style.module.scss';
import { useDispatch, useSelector } from "react-redux";


import {
    Button,
    Modal,
    message,
    Collapse,
    Card,
    Typography

} from "antd";
import ReactLoading from 'react-loading';
const { Panel } = Collapse;
const { Meta } = Card;
const { Title } = Typography;





function UserIncomeModal(props: {
    modalTitle: string;
    isModalVisible: boolean;
    isLoading: boolean;
    onCancel: any;
    idSelectedEdit: string;
    data: any;
}) {
    const {
        modalTitle,
        isModalVisible,
        onCancel,
        data,
        isLoading
    } = props;





    let modalInfo;
    if (isLoading) {
        modalInfo =
            <div style={{ display: "flex", justifyContent: "center" }}>
                <ReactLoading type={"bubbles"} color={"#0000FF"} height={200} width={200} />
            </div>
    }
    else {
        modalInfo = (
            <>
                <div className={styles.title}>
                    Ingresos:
                </div>
                <div className={styles.text}>
                    Ingresos totales: {data?.totalRoyalties.toFixed(2)}€
                </div>
                <div className={styles.text}>
                    Comision diskover: -{data?.diskoverComission.toFixed(2)}€
                </div>
                <div className={styles.title}>
                    Ingresos netos: {data?.totalRoyalties.toFixed(2) - data?.diskoverComission.toFixed(2)}€
                </div>

                <div className={styles.title}>
                    Releases:
                </div>
                <Collapse>
                    <Panel
                        header="Releases"
                        key=""
                    >
                        <Collapse>
                            {data?.trackList.map((tracks: any, index: any) => {
                                return <Panel
                                    header={tracks.title}
                                    key={index}
                                    style={{
                                        textAlign: "left",
                                        fontFamily: "Montserrat",
                                        lineHeight: "22px",
                                        display: "block",
                                    }}
                                >
                                    {/* <div style={{ padding: "10px", fontSize: "22px" }}>
                                        Tracks:
                                    </div> */}
                                    <Card
                                        style={{ fontSize: 2 }}
                                        title={<Title style={{ fontSize: "16px" }}>{tracks.title}</Title>}
                                    // style={{ width: 240 }}
                                    >
                                        <div className={styles.text}>
                                            ISRC: {tracks.isrc}
                                        </div>
                                        <div className={styles.text}>
                                            Recaudación historica: {data.royaltiesPerRelease[tracks.isrc].amount.toFixed(2)}€
                                        </div>
                                        <div className={styles.text}>
                                            ReleaseID: {tracks.releaseId}
                                        </div>
                                        <Button> Obtener informacion adicional (proximamente) </Button>
                                    </Card>
                                </Panel>
                            })}
                        </Collapse>
                    </Panel>
                </Collapse>
                <div className={styles.title}>
                    Solicitudes de pago:
                    {data.paymentsRequest.map((request: any) => {
                        return <Card
                            style={{ fontSize: 2 }}
                            title={<Title style={{ fontSize: "16px" }}>{request.request_date}</Title>}
                        // style={{ width: 240 }}
                        >
                            <div className={styles.text}>
                                Release Id: {request.releaseId}
                            </div>
                            <div className={styles.text}>
                                Status: {request.status}
                            </div>
                            <div className={styles.text}>
                                Cantidad: {request.amount.toFixed(2)}€
                            </div>
                            <div className={styles.text}>
                                Paypal: {request.paypal}
                            </div>
                            <div className={styles.text}>
                                Info: {request.info}
                            </div>
                        </Card>
                    })}
                </div>
            </>)
    }

    return (
        <>
            <Modal
                title={modalTitle}
                visible={isModalVisible}
                width={1000}
                //onOk={handleOk}
                onCancel={onCancel}
                footer={
                    [
                        (
                            <>
                                <Button key="submitVerification" onClick={onCancel}>
                                    Cerrar
                                </Button>
                            </>
                        )
                    ]
                }
            >

                {modalInfo}





            </Modal>
        </>
    );
}

export default UserIncomeModal;
