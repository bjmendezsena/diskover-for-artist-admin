import React, { useEffect, useState } from "react";
import { PageHeader, Table, message } from "antd";
import UploadCSVModal from "../../../components/UploadCSVModal";
import UploadRoyaltiesModal from "../../../components/UploadRoyaltiesModal";
import RoyaltiesModal from "../../../components/RoyaltiesModal";
import ModalConfirm from "../../../components/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import {
  newFile,
  newManual,
  fetchHistory,
  deleteOneCSV,
  shootNotifications
} from "../../../redux/csv/actions";
import {
  FolderOpenOutlined,
  DeleteOutlined,
  BellOutlined
} from "@ant-design/icons";

function CSV() {
  const dispatch = useDispatch();

  // On first load, fetch data
  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  const { loading, history, loadingHistory, manualLoading } = useSelector(
    (state: any) => state.file
  );

  useEffect(() => {
    if (!loading) {
      dispatch(fetchHistory());
      console.log(history)
    }
  }, [loading]);

  const routes = [
    {
      path: "index",
      breadcrumbName: "",
    },
  ];

  const createItem = (data: any, callback: any) => {
    dispatch(
      newFile(
        { platform: data.platform, form: data.form },
        callback
      )
    );
  };

  const manualUploading = (data: any, callback: any) => {
    dispatch(
      newManual(
        data,
        callback
      )
    );
  };

  const [currentUploadId, setCurrentUploadId] = useState("");
  const [currentUploadName, setCurrentUploadName] = useState("");

  const [currDiskoverRevenue, setCurrDiskoverRevenue] = useState("");
  const [currUsersAmount, setCurrUsersAmount] = useState("");

  const [isRoyaltyVisible, setIsRoyaltyVisible] = useState(false);

  const openRoyalties = (upload: any) => {
    setCurrentUploadId(upload.upload_id);
    setCurrentUploadName(upload.fileName);

    setCurrDiskoverRevenue(upload.diskoverRevenue + "");
    setCurrUsersAmount(upload.paid + "");

    setIsRoyaltyVisible(true);
  };

  const closeRoyalties = () => {
    setCurrentUploadId("");
    setCurrentUploadName("");

    setCurrDiskoverRevenue("");
    setCurrUsersAmount("");

    setIsRoyaltyVisible(false);
  };

  const [isDeleteAlertVisible, setIsDeleteAlertVisible] = useState(false);
  const [csvIdToDelete, setCsvIdToDelete] = useState("");

  const openConfirmDelete = (id: string) => {
    setCsvIdToDelete(id);

    setIsDeleteAlertVisible(true);
  }
  const closeConfirmDelete = () => {
    setCsvIdToDelete("");

    setIsDeleteAlertVisible(false);
  }
  const deleteOne = (cb: any) => {
    dispatch(deleteOneCSV(csvIdToDelete, cb));
  }

  const [isNotificateAlertVisible, setIsNotificateAlertVisible] = useState(false);
  const [csvIdToNotificate, setCsvIdToNotificate] = useState("");

  const openNotificateAlert = (id: string) => {
    setCsvIdToNotificate(id);

    setIsNotificateAlertVisible(true);
  }
  const closeNotificateAlert = () => {
    setCsvIdToNotificate("");

    setIsNotificateAlertVisible(false);
  }
  const sendNotifications = (cb: any) => {
    dispatch(shootNotifications(csvIdToNotificate, cb))
  }
  return (
    <div>
      <PageHeader
        title="Historial de CSV"
        ghost={false}
        breadcrumb={{ routes }}
      />
      <div
        className="top_content_container"
      >
        <RoyaltiesModal
          modalTitle={`Royalties de CSV File : ${currentUploadName}`}
          isModalVisible={isRoyaltyVisible}
          onCancel={closeRoyalties}
          id={currentUploadId}
          modalFooter={["Total:", currUsersAmount]}
          upload={true}
        />
        <UploadRoyaltiesModal
          openButtonText="Subir Royalties"
          modalTitle="Subir royalties de forma manual"
          successMessage="¡Royalties cargados con éxito!"
          onConfirm={manualUploading}
          confirmLoading={manualLoading}
        />
        <UploadCSVModal
          openButtonText="Subir CSV"
          modalTitle="Subir un nuevo archivo CSV"
          successMessage="¡CSV cargado con éxito!"
          onConfirm={createItem}
          confirmLoading={loading}
        />
        <ModalConfirm
          modalTitle={`Está seguro de eliminar el CSV ${csvIdToDelete} ?`}
          isModalVisible={isDeleteAlertVisible}
          onCancel={closeConfirmDelete}
          onConfirm={deleteOne}
          data={{
            alert: ``,
            rows: ["Al eliminar este CSV se eliminaran los royalties asociados,", "hayan sido solicitados o no."]
          }}
        />
        <ModalConfirm
          modalTitle={`Disparar notificaciones para el archivo ${csvIdToNotificate} ?`}
          isModalVisible={isNotificateAlertVisible}
          onCancel={closeNotificateAlert}
          onConfirm={sendNotifications}
          data={{
            alert: ``,
            rows: ["Ésta acción hará que sus usuarios reciban notificaciones si poseen royalties en éste archivo."]
          }}
        />
      </div>
      <div className="content_container">
        <Table
          locale={{ emptyText: 'No hay información' }}

          style={{
            width: "100%",
            marginTop: "20px",
          }}
          scroll={{ x: 1100 }}
          dataSource={history}
          loading={loadingHistory}
          rowKey="dateOfHistory"
          columns={[
            {
              title: "upload_id",
              dataIndex: "upload_id",
              fixed: "left",
              width: 200,
              key: "upload_identificator_for_historys_and_royalties"
            },
            {
              title: "Período",
              dataIndex: "period",
              width: 110,
              key: "date_of_royalties",
              sorter: (a, b): any =>
                Date.parse(a.date) + Date.parse(b.date),
            },
            {
              title: "Plataforma",
              dataIndex: "platform",
              key: "platform_for_histories",
              width: 250,
              sorter: (a, b): any =>
                a.platform.localeCompare(b.platform)
            },
            {
              title: "Archivo",
              dataIndex: "fileName",
              key: "fileName",
            },
            {
              title: "Admin",
              dataIndex: "adminEmail",
              key: "adminEmail",
              sorter: (a, b): any =>
                a.adminEmail.localeCompare(b.adminEmail),
              render: (t: string, r: any) => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span> {t} </span>
                  <span style={{ fontSize: "85%", color: "#a7a7a7" }} > at {r.date} </span>
                </div>
              )
            },
            {
              title: "Royalties",
              dataIndex: "upload_id",
              align: "center",
              key: "archived_for_releases",
              fixed: "right",
              width: 180,
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
              title: "Notificar",
              dataIndex: "upload_id",
              align: "center",
              key: "notifications_for_csv",
              fixed: "right",
              width: 90,
              render: (text: string, record: any) =>
                record.notificated === true ? (
                  <>
                    <BellOutlined
                      style={{
                        fontSize: "20px",
                      }}
                      disabled
                    />
                  </>
                ) : (
                  <>
                    <BellOutlined
                      style={{
                        fontSize: "20px",
                      }}
                      onClick={() => openNotificateAlert(text)}
                    />
                  </>
                ),
            },
            {
              title: "Borrar",
              dataIndex: "upload_id",
              align: "center",
              key: "delete_a_csv",
              fixed: "right",
              width: 100,
              render: (text: string, record: any) =>
                <>
                  <DeleteOutlined
                    style={{
                      fontSize: "20px",
                      color: "rgb(198, 15, 3)",
                    }}
                    onClick={() => openConfirmDelete(text)}
                  />
                </>
            }
          ]}
        />
      </div>
    </div>
  );
}

export default CSV;
