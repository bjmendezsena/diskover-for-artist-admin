import React from "react";
import { Button, Modal, Collapse } from "antd";
const { Panel } = Collapse;

function ModalInvoice(props: {
    modalTitle: string;
    isModalVisible: boolean;
    onCancel: any;
    invoice: any;
}) {
    const { modalTitle, isModalVisible, onCancel, invoice } = props;
    console.log(invoice);
    if (invoice) return (
        <>
            <Modal
                title={modalTitle}
                visible={isModalVisible}
                onCancel={onCancel}
                footer={[
                    <Button key="back" onClick={onCancel}>
                        Cerrar
                    </Button>,
                ]}
            >
                <div style={{ width: "100%", padding: "1em" }}>
                    <span
                        style={{
                            textAlign: "left",
                            fontSize: "16px",
                            fontWeight: "bolder",
                            fontFamily: "Montserrat",
                            lineHeight: "22px",
                            display: "block",
                            marginBottom: ".5rem",
                        }}
                    >
                        {`Estado:  ${invoice.status && invoice.status.toUpperCase()
                            } `}
                    </span>
                    <span
                        style={{
                            textAlign: "left",
                            fontSize: "16px",
                            fontWeight: "bolder",
                            fontFamily: "Montserrat",
                            lineHeight: "22px",
                            display: "block",
                            marginBottom: ".5rem",
                        }}
                    >
                        {`Solicitado: ${invoice.date}`}
                    </span>
                    <span
                        style={{
                            textAlign: "left",
                            fontSize: "16px",
                            fontWeight: "bolder",
                            fontFamily: "Montserrat",
                            lineHeight: "22px",
                            display: "block",
                            marginBottom: ".5rem",
                        }}
                    >
                        {`Total a pagar:  ${invoice.after_additional ? invoice.after_additional.toFixed(2) : invoice.after_comission ? invoice.after_comission.toFixed(2) : 0}`}

                    </span>
                    <span
                        style={{
                            textAlign: "left",
                            fontSize: "16px",
                            fontWeight: "bolder",
                            fontFamily: "Montserrat",
                            lineHeight: "22px",
                            display: "block",
                            marginBottom: ".5rem",
                        }}>
                        {`Info:  ${invoice.info &&
                            invoice.info
                            }`}
                    </span>
                    <Collapse>
                        <Panel
                            header="Invoice"
                            key="1"
                            style={{
                                textAlign: "left",
                                fontFamily: "Montserrat",
                                lineHeight: "22px",
                                display: "block",
                            }}
                        >
                            <div
                                style={{
                                    margin: "1rem",
                                    backgroundColor: "#eeefff",
                                    padding: ".7rem",
                                }}
                            >
                                {invoice.songs &&
                                    invoice.songs.map((song: any) => {
                                        return (
                                            <div
                                                style={{
                                                    marginBottom: ".6rem",
                                                    display: "block",
                                                    backgroundColor: "#fff",
                                                    padding: ".6rem 0"
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "row",
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            marginLeft: ".5rem",
                                                        }}
                                                    >
                                                        <b>{song.title}</b>
                                                    </span>
                                                    <span
                                                        style={{
                                                            marginRight: "1rem",
                                                        }}
                                                    >
                                                        <b>€ {(song.amount * (1 - Number("0." + invoice.diskover_percent))).toFixed(2)}</b>
                                                    </span>
                                                </div>
                                                <div
                                                >
                                                    {song.splits.length > 0 &&
                                                        song.splits.map(
                                                            (
                                                                sp: any,
                                                                i: Number
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        style={{
                                                                            marginLeft:
                                                                                "1rem",
                                                                        }}
                                                                    >
                                                                        {`Split ${i}  ${sp.email
                                                                            } - %${sp.percent
                                                                            } - ${Number(
                                                                                sp.amount.toFixed(
                                                                                    2
                                                                                ) * (1 - Number("0." + invoice.diskover_percent))
                                                                            ).toFixed(2)}`}
                                                                    </div>
                                                                );
                                                            }
                                                        )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                <div
                                    style={{
                                        marginBottom: ".6rem",
                                        display: "block",
                                        backgroundColor: "#fff",
                                        fontSize: "115%",
                                        padding: ".6rem 0",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent:
                                                "space-between",
                                        }}
                                    >
                                        <span
                                            style={{
                                                marginLeft: ".5rem",
                                                display: "block",
                                            }}
                                        >
                                            <b> Invitations:</b>
                                        </span>
                                        <span
                                            style={{
                                                marginRight: "1rem",
                                                display: "block",
                                            }}
                                        >
                                            <b>€ {invoice.invitations ? invoice.invitations.toFixed(2) : 0}</b>
                                        </span>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        marginBottom: ".6rem",
                                        display: "block",
                                        backgroundColor: "#fff",
                                        fontSize: "115%",
                                        padding: ".6rem 0",
                                    }}
                                >
                                    <div
                                        style={{
                                            marginBottom: ".6rem",
                                            display: "block",
                                        }}
                                    >
                                        <span
                                            style={{
                                                marginLeft: ".5rem",
                                                display: "block",
                                            }}
                                        >
                                            <b> SubTotal:</b> {invoice.after_iva && invoice.after_iva.toFixed(2)}
                                        </span>
                                        <span
                                            style={{
                                                marginLeft: ".5rem",
                                                display: "block",
                                            }}
                                        >
                                            <b> Iva ({invoice.iva}%):</b>{" "}
                                            {invoice.iva_amount && invoice.iva_amount.toFixed(2)}
                                        </span>
                                        <span
                                            style={{
                                                marginLeft: ".5rem",
                                                display: "block",
                                            }}
                                        >
                                            <b> Total:</b> {invoice.after_splits && invoice.after_splits.toFixed(2)}
                                        </span>
                                        <span
                                            style={{
                                                marginLeft: ".5rem",
                                                display: "block",
                                            }}
                                        >
                                            <b> Dist. Fee {"(" + invoice.diskover_percent + "%" + ")"}: </b>
                                            {invoice.diskover_comission && "-" + invoice.diskover_comission.toFixed(2)}
                                        </span>
                                        <span
                                            style={{
                                                marginLeft: ".5rem",
                                                display: "block",
                                            }}
                                        >
                                            <b> Additional fee: </b>
                                            {invoice.additionalFee ? "-" + invoice.additionalFee.toFixed(2) : 0}
                                        </span>
                                        <span
                                            style={{
                                                marginTop: "2em",
                                                marginLeft: ".5rem",
                                                display: "block",
                                            }}
                                        >
                                            <b> Invoice Amount: </b>{" "}
                                            {invoice.after_additional ? invoice.after_additional.toFixed(2) : invoice.after_comission ? invoice.after_comission.toFixed(2) : 0}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Panel>
                        <Panel
                            header="Statement of Account"
                            key="2"
                            style={{
                                textAlign: "left",
                                fontFamily: "Montserrat",
                                lineHeight: "22px",
                                display: "block",
                            }}
                        >
                            <div
                                style={{
                                    margin: "1rem",
                                    backgroundColor: "#eeefff",
                                    padding: ".7rem",
                                }}
                            >
                                <div
                                    style={{
                                        marginBottom: ".6rem",
                                        display: "block",
                                        backgroundColor: "#fff",
                                        padding: ".6rem 0"
                                    }}
                                >
                                    <div
                                        style={{
                                            marginBottom: ".6rem",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <span
                                            style={{
                                                marginLeft: ".5rem",
                                            }}
                                        >
                                            <b>Invoice {invoice.number && invoice.number}</b>
                                        </span>
                                        <span
                                            style={{
                                                marginRight: ".5rem",
                                            }}
                                        >
                                            <b>€{invoice.after_splits && invoice.after_splits.toFixed(2)}</b>
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            marginBottom: ".6rem",
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <span
                                            style={{
                                                marginLeft: ".5rem",
                                            }}
                                        >
                                            <b>Distribution fee </b>
                                        </span>
                                        <span
                                            style={{
                                                marginRight: ".5rem",
                                            }}
                                        >
                                            <b>€{invoice.diskover_comission && invoice.diskover_comission.toFixed(2)}</b>
                                        </span>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        marginBottom: ".6rem",
                                        display: "block",
                                        backgroundColor: "#fff",
                                        padding: ".6rem 0"
                                    }}
                                >
                                    <div
                                        style={{
                                            marginBottom: ".6rem",
                                            display: "block",
                                            backgroundColor: "#fff",
                                        }}
                                    >
                                        <div
                                            style={{
                                                marginBottom: ".6rem",
                                                display: "flex",
                                                flexDirection: "row",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <span
                                                style={{
                                                    marginLeft: ".5rem",
                                                }}
                                            >
                                                <b>Total a pagar</b>
                                            </span>
                                            <span
                                                style={{
                                                    marginRight: ".5rem",
                                                }}
                                            >
                                                <b>€{invoice.after_additional ? invoice.after_additional.toFixed(2) : invoice.after_comission ? invoice.after_comission.toFixed(2) : 0}</b>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Panel>
                    </Collapse>
                </div>
            </Modal>
        </>
    );
    else return (<div></div>)
}

export default ModalInvoice;
