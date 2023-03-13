import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PageHeader,
  Table,
  Input,
  Tag,
  Select,
} from "antd";
import ReleaseInfoModal from "../../../components/ReleaseInfoModal";
import ModalConfirm from "../../../components/ModalConfirm";
import DateSelectorModal from "components/ModalDateSelector";

import {
  fetchAllReleases,
  archiveRelease,
  restoreRelease,
} from "../../../redux/releases/actions";

import {
  downloadReleaseCsv
} from "../../../redux/downloads/actions";
import {
  FolderOpenOutlined,
  EyeOutlined,
  UndoOutlined,
  DownSquareOutlined
} from "@ant-design/icons";
import { isDate } from "moment";

function ReleasesInfoPage() {
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isDateVisible, setIsDateVisible] = useState(false);

  const [infoData, setInfoData] = useState({});
  const [currentRelease, setCurrentRelease] = useState("");
  const closeInfo = () => {
    setInfoData({});
    setIsInfoVisible(false);
  };
  const showInfo = (data: any) => {
    setInfoData(data.info);
    setCurrentRelease(data.id);
    setIsInfoVisible(true);
  };

  const showDateSelector = (data: any) => {
    // setDateData(data.info);
    setCurrentRelease(data.id);
    setIsDateVisible(true);
  };
  const closeDateSelector = () => {
    setInfoData({});
    setIsDateVisible(false);
  };


  const [isDeleteModalVisible, setIsDeleteModalVisible] =
    useState(false);
  const [releaseToDelete, setReleaseToDelete] =
    useState("");
  const handleDelete = (id: string) => {
    setReleaseToDelete(id);
    setIsDeleteModalVisible(true);
  };
  const closeDelete = () => {
    setReleaseToDelete("");
    setIsDeleteModalVisible(false);
  };
  const sendDeletion = (cb: any) => {
    dispatch(archiveRelease(releaseToDelete, cb));
  };

  const downloadReport = (data: any, cb: any) => {
    data.releaseId = currentRelease
    dispatch(downloadReleaseCsv(data, cb));
    console.log(data);
  };


  const [isRestoreModalVisible, setIsRestoreModalVisible] =
    useState(false);
  const [releaseToRestore, setReleaseToRestore] =
    useState("");
  const handleRestore = (id: string) => {
    setReleaseToRestore(id);
    setIsRestoreModalVisible(true);
  };
  const closeRestore = () => {
    setReleaseToRestore("");
    setIsRestoreModalVisible(false);
  };
  const sendRestore = (cb: any) => {
    dispatch(restoreRelease(releaseToRestore, cb));
  };


  const { releases, loadingReleases } = useSelector(
    (state: any) => state.releases
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllReleases());
  }, [dispatch]);

  const [data, setData] = useState(releases || [{}]);

  useEffect(() => {
    setData(releases);
  }, [releases]);

  const routes = [
    {
      path: "index",
      breadcrumbName: "",
    },
  ];
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [type, setType] = useState("all");

  const changeSearch = (entry: any) => {
    const { value } = entry.target;
    setSearch(value.toLowerCase());
  };
  useEffect(() => {
    let output = releases;
    if (type !== "all") {
      const filteredData = releases.filter((dt: any) => {
        if (type === "single") {
          if (dt.info.tracks.length === 1) {
            return true;
          } else {
            return false;
          }
        } else if (type === "album") {
          if (dt.info.tracks.length >= 2) {
            return true;
          } else {
            return false;
          }
        }
      });
      output = filteredData;
    }
    if (status !== "all") {
      const filteredData = output.filter((dt: any) => {
        if (dt.status.toLowerCase().includes(status)) {
          return true;
        }
        return false;
      });
      output = filteredData;
    }
    if (search !== "") {
      const filteredData = output.filter((e: any) => {
        if (
          e.id.toLowerCase().includes(search) ||
          e.label.toLowerCase().includes(search) ||
          e.labelName.toLowerCase().includes(search) ||
          e.upc.toLowerCase().includes(search) ||
          e.catalog.toLowerCase().includes(search)
        ) {
          return true;
        } else {
          return false;
        }
      });
      output = filteredData;
    }
    setData(output);
  }, [search, type, status]);
  return (
    <div>
      <PageHeader
        title="Información de Releases"
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
          Status:
        </span>
        <Select
          defaultValue="all"
          onChange={setStatus}
          style={{
            width: "144px",
            height: "40px",
            borderRadius: "4px",
          }}
        >
          <Select.Option value="all">Todos</Select.Option>
          <Select.Option value="active">
            Active
          </Select.Option>
          <Select.Option value="deleted">
            Deleted
          </Select.Option>
          <Select.Option value="archived">
            Archived
          </Select.Option>
        </Select>
        <span
          style={{
            fontWeight: "normal",
            fontSize: "16px",
            marginLeft: "10px",
          }}
        >
          Type:
        </span>
        <Select
          defaultValue="all"
          onChange={setType}
          style={{
            width: "144px",
            height: "40px",
            borderRadius: "4px",
          }}
        >
          <Select.Option value="all">Todos</Select.Option>
          <Select.Option value="single">
            Single
          </Select.Option>
          <Select.Option value="album">Album</Select.Option>
        </Select>
        <ReleaseInfoModal
          modalTitle={`Información de release id :  ${currentRelease}`}
          isModalVisible={isInfoVisible}
          onCancel={closeInfo}
          data={infoData}
        />
        <DateSelectorModal
          modalTitle={`Descargar csv de release :  ${currentRelease}`}
          isModalVisible={isDateVisible}
          onCancel={closeDateSelector}
          onConfirm={downloadReport}
        />
        <ModalConfirm
          modalTitle={`¿Archivar release id ${releaseToDelete} en Diskover?`}
          isModalVisible={isDeleteModalVisible}
          onCancel={closeDelete}
          onConfirm={sendDeletion}
          data={{
            alert: "Archivar release en Diskover",
            rows: [
              "Para eliminar este release de audiosalad deberá hacerlo de forma manual.",
              "Esta acción marcará el release actual como archivado.",
            ],
          }}
        />
        <ModalConfirm
          modalTitle={`¿Desarchivar release id ${releaseToRestore} en Diskover?`}
          isModalVisible={isRestoreModalVisible}
          onCancel={closeRestore}
          onConfirm={sendRestore}
          data={{
            alert: "Desarchivar release en Diskover",
            rows: [
              'Esta acción volverá a colocar el estado del release como "active".',
              "Con ésta acción los royalties serán tomados en cuenta en este release.",
            ],
          }}
        />
      </div>
      <div className="content_container">
        <Table
          locale={{ emptyText: 'No hay información' }}
          pagination={{
            pageSize: 10,
            showSizeChanger: false,
          }}
          dataSource={data}
          scroll={{ x: 1100 }}
          loading={loadingReleases}
          style={{
            marginTop: "20px",
          }}
          rowKey="id"
          columns={[
            {
              title: "ID",
              dataIndex: "id",
              width: 75,
              fixed: "left",
              key: "id_for_releases",
              defaultSortOrder: "ascend",
              sorter: (a, b): any =>
                parseInt(a.id) - parseInt(b.id),
            },
            {
              title: "Label ID",
              dataIndex: "label",
              key: "label_for_releases",
              align: "center",
              width: 105,
              fixed: "left",
              defaultSortOrder: "ascend",
              sorter: (a, b): any =>
                parseInt(a.label) - parseInt(b.label),
            },
            {
              title: "Catalog ID",
              dataIndex: "catalog",
              key: "catalog_for_releases",
              defaultSortOrder: "ascend",
              sorter: (a, b): any =>
                a.catalog.localeCompare(b.catalog),
            },
            {
              title: "UPC",
              dataIndex: "upc",
              key: "upc_for_releases",
              defaultSortOrder: "ascend",
              sorter: (a, b): any =>
                a.upc.localeCompare(b.upc),
            },
            {
              title: "Right Holders",
              dataIndex: "labelName",
              key: "labelName_for_releases",
              defaultSortOrder: "ascend",
              sorter: (a, b): any =>
                a.labelName.localeCompare(b.labelName),
            },
            {
              title: "Comisión",
              dataIndex: "percent",
              key: "percent_for_releases",
              width: 100,
              defaultSortOrder: "ascend",
              sorter: (a, b): any =>
                a.catalog.localeCompare(b.catalog),
            },
            {
              title: "Status",
              dataIndex: "status",
              width: 100,
              align: "center",
              key: "status_for_releases",
              sorter: (a, b): any =>
                a.status.localeCompare(b.status),
              render: (value: any, record: any) => (
                <>
                  {record.status === "active" ? (
                    <Tag color="#009921">
                      {record.status}
                    </Tag>
                  ) : record.status === "deleted" ? (
                    <Tag color="#943a3a">
                      {record.status}
                    </Tag>
                  ) : (
                    <Tag color="#3b3d82">
                      {record.status}
                    </Tag>
                  )}
                </>
              ),
            },
            {
              title: "Info",
              dataIndex: "info",
              align: "center",
              key: "info_for_releases",
              fixed: "right",
              width: 75,
              render: (text: any, record: any) => (
                <>
                  <EyeOutlined
                    style={{
                      fontSize: "20px",
                      color: "#00000",
                    }}
                    onClick={() => showInfo(record)}
                  />
                </>
              ),
            },
            {
              title: "Archivar",
              dataIndex: "id",
              align: "center",
              key: "archived_for_releases",
              fixed: "right",
              width: 85,
              render: (text: string, record: any) =>
                record.status === "active" ? (
                  <>
                    <FolderOpenOutlined
                      style={{
                        fontSize: "20px",
                        color: "#00000",
                      }}
                      onClick={() => handleDelete(text)}
                    />
                  </>
                ) : record.status === "deleted" ? (
                  <>
                    <FolderOpenOutlined
                      className="__disabled"
                      style={{
                        fontSize: "20px",
                        color: "#00000",
                      }}
                      disabled
                    />
                  </>
                ) : (
                  <>
                    <UndoOutlined
                      style={{
                        fontSize: "20px",
                        color: "#00000",
                      }}
                      onClick={() => handleRestore(text)}
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
      </div>
    </div>
  );
}

export default ReleasesInfoPage;
