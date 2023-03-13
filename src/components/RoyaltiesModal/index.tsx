import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Modal, Table, Radio } from "antd";
import {
    fetchRoyaltiesByUploadId,
    fetchRoyaltiesByRequestId,
    manualUpload,
    /* deleteRelease */
} from "../../redux/royalties/actions";
import { EditOutlined } from "@ant-design/icons";
import ManualRoyaltyModal from "../ManualRoyaltyModal";

function RoyaltiesModal(props: {
    modalTitle: string;
    isModalVisible: boolean;
    onCancel: any;
    id: string;
    modalFooter: Array<string>;
    upload: boolean;
}) {
    const { modalTitle, isModalVisible, onCancel, id, modalFooter,upload } = props;
    const { royalties, loadingRoyalties } = useSelector(
        (state: any) => state.royalties
    );

    const dispatch = useDispatch();

    useEffect(() => {
        if (isModalVisible === true) {
            if(upload){
                dispatch(fetchRoyaltiesByUploadId(id));
            } else {
                dispatch(fetchRoyaltiesByRequestId(id));
            }
            
        }
    }, [dispatch, isModalVisible]);

    const [data, setData] = useState(royalties || [{}]);

    useEffect(() => {
        setData(royalties);
    }, [royalties]);

    // Edit percent
    const [isManualVisible, setIsManualVisible] = useState(false);

    const [platform, setPlatform] = useState("");
    const [payable, setPayable] = useState("");
    const [artist_name, setArtistName] = useState("");
    const [album_name, setAlbumName] = useState("");
    const [track_title, setTrackTitle] = useState("");
    const [idForManual, setId] = useState("");

    const openManualUpload = (r: any) => {
        setId(r._id);
        setPlatform(r.platform);
        setPayable(r.payable + "");
        setArtistName(r.artist_name);
        setAlbumName(r.album_name);
        setTrackTitle(r.track_title);

        setIsManualVisible(true);
    };
    const cancelManualUpload = () => {
        setId("");
        setPlatform("");
        setPayable("");
        setArtistName("");
        setAlbumName("");
        setTrackTitle("");

        setIsManualVisible(false);
    };

    const handleManualUpload = (data: any, cb: any) => {
        dispatch(manualUpload(data, cb));
    };

    const { loadingManual } = useSelector((state: any) => state.royalties);

    const [status, setStatus] = useState("");
    const changeStatus = (e: any) => {
        console.log(e.target.value);
        setStatus(e.target.value);
    };
    useEffect(() => {
        let output = royalties;
        if (status !== "") {
            const filteredData = output.filter((e: any) => {
                if (e.status.toLowerCase().includes(status)) {
                    return true;
                } else {
                    return false;
                }
            });
            output = filteredData;
        }

        setData(output);
    }, [status]);
    // End edit percent
    return (
        <>
            <div>
                <ManualRoyaltyModal
                    modalTitle="Este archivo fue ignorado por no poseer el campo ISRC, busque el ISRC asociado a los siguientes datos e ingreselo manualmente."
                    successMessage="Royalty corregido con éxito!"
                    onConfirm={handleManualUpload}
                    confirmLoading={loadingManual}
                    isVisible={isManualVisible}
                    onCancel={cancelManualUpload}
                    data={{
                        id: idForManual,
                        platform,
                        payable,
                        artist_name,
                        album_name,
                        track_title,
                    }}
                />
            </div>
            <Modal
                title={modalTitle}
                visible={isModalVisible}
                onCancel={onCancel}
                width="auto"
                footer={[
                    <Button key="back" onClick={onCancel} danger>
                        Cerrar
                    </Button>,
                ]}
            >
                {upload && (
                    <>
                    <Radio.Group
                        value={status}
                        onChange={(e) => changeStatus(e)}
                    >
                        <Radio.Button value="available">
                            Disponible
                        </Radio.Button>
                        <Radio.Button value="requested">
                            Solicitado
                        </Radio.Button>
                        <Radio.Button value="rejected_empty">
                            Rechazado Sin Monto
                        </Radio.Button>
                        <Radio.Button value="rejected_isrc">
                            Rechazado Sin ISRC
                        </Radio.Button>
                    </Radio.Group>
                </>
                ) }
                
                <Table
                    pagination={{ pageSize: 10 }}
                    loading={loadingRoyalties}
                    scroll={{ x: 1100 }}
                    dataSource={data}
                    style={{
                        margin: "4px",
                    }}
                    rowKey="name"
                    columns={[
                        {
                            title: "Platforma",
                            dataIndex: "platform",
                            key: "platform_for_royalty",
                        },
                        {
                            title: "Servicio",
                            dataIndex: "service",
                            key: "currency_last",
                        },
                        {
                            title: "País",
                            dataIndex: "country",
                            key: "country_of_royalty",
                        },
                        {
                            title: "Periodo",
                            dataIndex: "period",
                            key: "period_of_royalty",
                        },
                        {
                            title: "ISRC",
                            dataIndex: "isrc",
                            key: "id_of_track",
                        },

                        {
                            title: "CCY Reporte",
                            dataIndex: "report_currency",
                            key: "currency_in_report",
                        },
                        {
                            title: "Monto Reporte",
                            dataIndex: "report_payable",
                            key: "report_payable",
                        },
                        {
                            title: "CCY Subido",
                            dataIndex: "currency",
                            key: "currency_last",
                        },
                        {
                            title: "Monto Subido",
                            dataIndex: "payable",
                            key: "total_amount_last",
                        },
                        {
                            title: "Estado",
                            dataIndex: "status",
                            key: "status_of_royalty",
                        },
                        {
                            title: "Manual",
                            dataIndex: "id",
                            key: "id_for_a_royalty",
                            defaultSortOrder: "descend",
                            render: (v: Text, r: any): any =>
                                r.status === "rejected_isrc" ? (
                                    <>
                                        <EditOutlined
                                            style={{
                                                fontSize: "20px",
                                                color: "#00000",
                                                marginRight: ".5rem",
                                            }}
                                            onClick={() => openManualUpload(r)}
                                        />
                                    </>
                                ) : (
                                    <></>
                                ),
                        },
                    ]}
                />
                {modalFooter.map((md)=>{
                  return (
                    <>
                    <span>
                      {md}
                    </span>
                    <br></br>
                    </>
                  )
                })}
            </Modal>
        </>
    );
}

export default RoyaltiesModal;
