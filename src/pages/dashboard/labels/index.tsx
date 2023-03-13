import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PageHeader,
  Table,
  Input,
} from "antd";
import NewLabelForm from "../../../components/NewLabelForm";
import EditLabelForm from "../../../components/EditLabelForm"; //Editar
import ModalConfirm from "../../../components/ModalConfirm"; //Editar
import DateSelectorModal from '../../../components/ModalDateSelector'


import {
  downloadReleaseCsv
} from "../../../redux/downloads/actions";

import {
  fetchAllLabels,
  newLabel,
  fetchDeleteLabel,
  editOneLabel
} from "redux/users/actions";
import {
  DeleteOutlined,
  EditOutlined,
  DownSquareOutlined
} from "@ant-design/icons";
function Labels() {
  const [
    isShowModalConfirmVisible,
    setIsShowModalConfirmVisible,
  ] = useState(false);
  const [deleteLabel, setDeleteLabel] = useState({
    name: "",
    id: "",
  });
  const dispatch = useDispatch();

  const cancelDelete = () => {
    setIsShowModalConfirmVisible(false);
    setDeleteLabel({ id: "", name: "" });
  };
  const confirmDelete = (callback: any) => {
    dispatch(fetchDeleteLabel(deleteLabel.id, callback));
  };

  const createItem = (data: any, callback: any) => {
    dispatch(newLabel(data, callback));
  };

  const showModalConfirm = (data: any) => {
    setDeleteLabel({ id: data.id, name: data.name });
    setIsShowModalConfirmVisible(true);
  };
  const [isModalEditVisible, setIsModalEditVisible] =
    useState(false);
  const [userToEdit, setUserToEdit] = useState({});
  const showModalEdit = (data: any) => {
    setUserToEdit(data);
    setIsModalEditVisible(true);
  };
  const closeModalEdit = () => {
    setIsModalEditVisible(false);
    setUserToEdit({});
  };
  const editOne = (data: any, callback?: any) => {
    dispatch(editOneLabel(data, callback));
  };


  const [isDateVisible, setIsDateVisible] = useState(false);

  const [currentLabel, setCurrentLabel] = useState();


  const showDateSelector = (data: any) => {
    // setDateData(data.info);
    // setCurrentRelease(data.id);
    setCurrentLabel(data.id)
    console.log(data);

    // setCurrentLabel(data)
    setIsDateVisible(true);
  };
  const closeDateSelector = () => {
    // setInfoData({});
    setIsDateVisible(false);
  };

  const downloadReport = (data: any, cb: any) => {
    // data.releaseId = currentRelease
    data.labelId = currentLabel
    dispatch(downloadReleaseCsv(data, cb));
    console.log(data);
  };


  const { labels, loadingLabels } = useSelector(
    (state: any) => state.users
  );

  useEffect(() => {
    dispatch(fetchAllLabels());
  }, [dispatch]);

  const [data, setData] = useState(labels || [{}]);

  useEffect(() => {
    setData(labels);
  }, [labels]);

  const routes = [
    {
      path: "index",
      breadcrumbName: "Labels",
    },
  ];

  return (
    <div>
      <PageHeader
        title="Labels en Diskover"
        ghost={false}
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
          onChange={(e) => {
            const currValue: string =
              e.target.value.toLowerCase();
            const filteredData = data.filter(
              (entry: any) => {
                if (
                  entry.name
                    .toLowerCase()
                    .includes(currValue)
                ) {
                  return true;
                } else {
                  if (
                    entry.email
                      .toLowerCase()
                      .includes(currValue)
                  ) {
                    return true;
                  } else {
                    if (
                      entry.id
                        .toLowerCase()
                        .includes(currValue)
                    ) {
                      return true;
                    } else {
                      return false;
                    }
                  }
                }
              }
            );
            if (
              filteredData.length <= 0 ||
              currValue === ""
            ) {
              setData(labels);
            } else {
              setData(filteredData);
            }
          }}
        />
        <NewLabelForm
          openButtonText="Crear"
          modalTitle="Cree un nuevo label para sus usuarios"
          successMessage="Label guardado en base de datos con éxito! Ahora su usuario podrá registrarse en Diskover For Artists"
          onConfirm={createItem}
          confirmLoading={loadingLabels}
        />
        <EditLabelForm
          modalTitle="Editar un label existente"
          successMessage="Label editado con éxito!"
          onConfirm={editOne}
          confirmLoading={loadingLabels}
          isVisible={isModalEditVisible}
          onCancel={closeModalEdit}
          data={userToEdit}
        />
      </div>
      <div className="content_container">
        <Table
          locale={{ emptyText: 'No hay información' }}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
          }}
          loading={loadingLabels}
          dataSource={data}
          scroll={{ x: 1000 }}
          style={{
            width: "100%",
            marginTop: "20px",
          }}
          rowKey="id"
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              fixed: "left",
              width: 85,
              key: "id_for_labels",
              defaultSortOrder: "ascend",
              sorter: (a, b): any =>
                parseInt(a.id) - parseInt(b.id),
            },
            {
              title: "Name",
              dataIndex: "name",
              key: "name_of_label",
              defaultSortOrder: "ascend",
              sorter: (a, b): any =>
                a.name.localeCompare(b.name),
            },
            {
              title: "Email de registro",
              dataIndex: "email",
              key: "email_to_registration",
              defaultSortOrder: "ascend",
              sorter: (a, b): any =>
                a.email.localeCompare(b.email),
            },
            {
              title: "Editar",
              dataIndex: "edit_data",
              fixed: "right",
              width: 75,
              align: "center",
              key: "edit_data_label_disk",
              render: (text: any, record: any) => (
                <>
                  <EditOutlined
                    style={{
                      fontSize: "20px",
                      color: "#00000",
                    }}
                    onClick={() => showModalEdit(record)}
                  />
                </>
              ),
            },
            {
              title: "Borrar",
              dataIndex: "delete_data",
              fixed: "right",
              width: 75,
              align: "center",
              key: "delete_data_of_label",
              render: (text: any, record: any) => (
                <>
                  <DeleteOutlined
                    style={{
                      fontSize: "20px",
                      color: "#00000",
                    }}
                    onClick={() => showModalConfirm(record)}
                  />
                </>
              ),
            },
            {
              title: "Descargar",
              dataIndex: "info",
              align: "center",
              key: "info_for_releases",
              fixed: "right",
              width: 120,
              render: (text: any, record: any) => (
                <>
                  <DownSquareOutlined
                    style={{
                      fontSize: "20px",
                      color: "#00000",
                    }}
                    onClick={() => showDateSelector(record)}
                  />
                </>
              ),
            },
          ]}
        />
        <ModalConfirm
          modalTitle="Borrar Label"
          isModalVisible={isShowModalConfirmVisible}
          onCancel={cancelDelete}
          onConfirm={confirmDelete}
          data={{
            alert:
              "¿Desea eliminar este label permanentemente?",
            rows: [
              `Label ID: "${deleteLabel.id}"`,
              `Label Name: "${deleteLabel.name}"`,
            ],
          }}
        />
        <DateSelectorModal
          modalTitle={`Descargar csv de label :`}
          isModalVisible={isDateVisible}
          onCancel={closeDateSelector}
          onConfirm={downloadReport}
        />
      </div>
    </div>
  );
}

export default Labels;