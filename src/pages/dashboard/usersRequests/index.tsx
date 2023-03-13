import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PageHeader,
  Table,
  Input,
  Modal,
  Button,
  Typography,
  Row,
  Tooltip,
  Select,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import EditPercent from "../../../components/EditPercent";
import {
  doFetchAll,
  acceptOne,
  doRejectUserApplication,
  doApproveUserApplication,
  doAcceptAccount,
} from "redux/applications/actions";
import { downloadReleaseCsv } from "../../../redux/downloads/actions";

import UserApplicationModal from "components/UserApplicationModal";
import { USER_APPLICATION_STATUS } from "../../../constants/constants";
import { UserApplicationStatusChip } from "../../../components/UserApplicationStatusChip/UserApplicationStatusChip";
import { doRemoveUserApplication } from "../../../redux/applications/actions";

const { Text } = Typography;

function UsersRequests() {
  // Show other info
  const [isModalWatchVisible, setIsModalWatchVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);

  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);

  const [currentPersonalInfo, setCurrentPersonalInfo] = useState({});

  const [currentPersonalIncome, setCurrentPersonalIncome] = useState();

  const [idSelected, setIdSelected] = useState("");
  const showModalWatch = (text: any) => {
    setIdSelected(text);
    setCurrentPersonalInfo(text);
    setIsModalWatchVisible(true);
  };

  const handleCancel = () => {
    setCurrentPersonalInfo({});

    setIsModalWatchVisible(false);
  };

  const rejectApplication = (id: string, reason: string) => {
    dispatch(doRejectUserApplication(id, reason));
    setIsModalWatchVisible(false);
  };

  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  };
  // End show other info
  //--------------------------------//
  // Edit percent
  const [isEditPercentVisible, setIsEditPercentVisible] = useState(false);

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

  const editOnePercent = (data: any, cb: any) => {
    // dispatch(modifyPercent(data, cb));
  };
  // End edit percent

  // Edit user

  const [isEditUserVisible, setIsEditUserVisible] = useState(false);

  const [isEditUserLoading, setIsEditUserLoading] = useState(false);

  const [userData, setUserData] = useState({});

  const [email, setEmail] = useState("");

  const [contactInfo, setContactInfo] = useState({});

  const openEditUser = (userData: any, contactInfo: any) => {
    // setCurrentEmailToEdit(r.email);
    // setCurrentPercentToEdit(r.percent);
    setUserData(userData);
    setContactInfo(userData.contactInfo);
    setIsEditUserVisible(true);
  };

  const cancelEditUser = (r: any) => {
    // setCurrentEmailToEdit(r.email);
    // setCurrentPercentToEdit(r.percent);
    setUserData({});
    setIsEditUserVisible(false);
  };

  const [isDateVisible, setIsDateVisible] = useState(false);

  const showDateSelector = (data: any) => {
    // setDateData(data.info);
    // setCurrentRelease(data.id);
    // setCurrentLabel(data.id)
    console.log(data);
    setEmail(data.email);

    // setCurrentLabel(data)
    setIsDateVisible(true);
  };
  const closeDateSelector = () => {
    // setInfoData({});
    setIsDateVisible(false);
  };

  const downloadReport = (data: any, cb: any) => {
    // data.releaseId = currentRelease
    console.log(email);

    data.email = email;
    dispatch(downloadReleaseCsv(data, cb));
    console.log(data);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doFetchAll());
    // dispatch(getNotifications("", () => {
    //   // console.log("");
    // })
    // );
  }, [dispatch]);

  const { loading, awaitingPercent, loadingIncome, incomeData } = useSelector(
    (state: any) => state.users
  );
  const { applications, isLoading } = useSelector(
    (state: any) => state.applications
  );

  const accept = (data: any, cb: any) => {
    console.log("ACEPTO");

    dispatch(acceptOne(data, cb));
  };

  const editOne = (data: any, cb: any) => {
    setIsEditUserLoading(true);
    // dispatch(editUser(data, cb))
    setIsEditUserLoading(false);
    console.log(data);
  };

  const routes = [
    {
      path: "index",
      breadcrumbName: "",
    },
  ];
  const [search, setSearch] = useState("");
  const [strikes, setStrikes] = useState("all");
  const [type, setType] = useState("all");
  const changeSearch = (entry: any) => {
    const { value } = entry.target;

    setSearch(value.toString().toLowerCase());
  };

  const aproveUserApplication = (id: string) => {
    dispatch(doApproveUserApplication(id));
    setIsModalWatchVisible(false);
  };

  const approveAccount = (id: string, dataToSend: any) => {
    dispatch(doAcceptAccount(id, dataToSend));
    setIsModalWatchVisible(false);
  };

  const warning = (data: any) => {
    Modal.warning({
      title: "Esta acción no se podrá deshacer",
      content: `Vas a eliminar la solicitud de ${data.name}. ¿Estás seguro?`,
      onOk() {
        dispatch(doRemoveUserApplication(data._id));
      },
      okCancel: true,
      cancelText: "Cancelar",
    });
  };

  const onDelete = (data: any) => {
    warning(data);
  };

  const userApplicationSource = useMemo(() => {
    if (loading) return [];
    let output = [...applications];

    const filteredData = applications.filter((e: any) => {
      if (
        (e?.number && e.number.toString().toLowerCase().includes(search)) ||
        e.name.toLowerCase().includes(search) ||
        e.email.toLowerCase().includes(search) ||
        e.country.toLowerCase().includes(search)
      ) {
        return true;
      } else {
        return false;
      }
    });
    output = filteredData;

    if (type !== "all") {
      const filteredData = output.filter((e: any) => {
        if (type === "user") {
          if (e.type === "user") return true;
          else return false;
        } else {
          if (e.type === "enterprise") return true;
          else return false;
        }
      });

      output = filteredData;
    }

    if (strikes !== "all") {
      const filteredData = output.filter((e: any) => {
        if (e.strikes === parseInt(strikes)) return true;
        else return false;
      });

      output = filteredData;
    }

    if (statusFilter.length > 0) {
      const filteredData = output.filter((e: any) => {
        if (statusFilter.includes(e.status)) return true;
        else return false;
      });

      output = filteredData;
    }

    return output;
  }, [search, strikes, type, applications, statusFilter]);

  const isLoadingData = loading || isLoading;
  return (
    <div>
      <PageHeader
        title={`Solicitudes de registro: ${userApplicationSource.length}`}
        ghost={false}
        breadcrumb={{ routes }}
      />

      <div
        className='top_content_container'
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
        <EditPercent
          modalTitle='Editar un label existente'
          successMessage='Label editado con éxito!'
          onConfirm={editOnePercent}
          confirmLoading={awaitingPercent}
          isVisible={isEditPercentVisible}
          onCancel={cancelEditPercent}
          data={{ percent: currentPercentToEdit, email: currentEmailToEdit }}
        />
        <Input
          style={{
            width: "144px",
            height: "40px",
            backgroundColor: "white",
            borderRadius: "4px",
            borderColor: "#0a00ec",
          }}
          placeholder='Buscar'
          onChange={(e) => changeSearch(e)}
        />
        <Select
          placeholder='Estado'
          onChange={(value) => setStatusFilter(value)}
          style={{
            minWidth: "144px",
            borderRadius: "4px",
            borderColor: "#0a00ec",
          }}
          allowClear
          mode='multiple'
        >
          {/* <Select.Option value=''></Select.Option> */}
          <Select.Option value={USER_APPLICATION_STATUS.REQUESTED}>
            Solicitada
          </Select.Option>
          <Select.Option value={USER_APPLICATION_STATUS.PENDING}>
            Pendiente
          </Select.Option>
          <Select.Option value={USER_APPLICATION_STATUS.APPROVED}>
            Aprobada
          </Select.Option>
          <Select.Option value={USER_APPLICATION_STATUS.SIGNED}>
            Firmada
          </Select.Option>
          <Select.Option value={USER_APPLICATION_STATUS.ACCEPTED}>
            Aceptada
          </Select.Option>
          <Select.Option value={USER_APPLICATION_STATUS.REJECTED}>
            Rechazada
          </Select.Option>
        </Select>
      </div>
      <div className='content_container'>
        <Table
          locale={{ emptyText: "No hay información" }}
          pagination={{ pageSize: 10 }}
          dataSource={userApplicationSource}
          loading={loading || isLoading}
          rowKey='document'
          scroll={{ x: 1000 }}
          style={{
            marginTop: "20px",
          }}
          columns={[
            {
              fixed: "right",
              title: "Número",
              dataIndex: "number",
              key: "number",
              defaultSortOrder: "descend",
              sorter: (a, b) => a.number - b.number,
              render: (v: any, r: any): any => <>{v}</>,
            },
            {
              fixed: "right",
              title: "Nombre",
              dataIndex: "name",
              key: "fullName",
              defaultSortOrder: "descend",
              sorter: (a, b): any => a.name.localeCompare(b.name),
            },
            {
              fixed: "right",

              title: "Email",
              dataIndex: "email",
              key: "email",
              defaultSortOrder: "descend",
              sorter: (a, b): any => a.email.localeCompare(b.email),
            },
            {
              fixed: "right",

              title: "País",
              dataIndex: "country",
              key: "country",
              defaultSortOrder: "descend",
              sorter: (a, b): any => a.country.localeCompare(b.country),
              render: (v: any, r: any): any => <>{v}</>,
            },
            {
              title: "",
              dataIndex: "contactInfo",
              align: "center",
              fixed: "right",
              // width: 120,
              key: "contactInfo",
              render: (data: any, record: any) => {
                const isRemoveDisabled =
                  record.status !== USER_APPLICATION_STATUS.REQUESTED &&
                  record.status !== USER_APPLICATION_STATUS.REJECTED &&
                  record.status !== USER_APPLICATION_STATUS.PENDING;
                const descriptionMessageRejected =
                  record.status === USER_APPLICATION_STATUS.REJECTED
                    ? record?.rejectReason
                    : null;
                return (
                  <Row
                    gutter={[8, 8]}
                    style={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "nowrap",
                    }}
                  >
                    <Button onClick={() => showModalWatch(record)}>Ver</Button>
                    <UserApplicationStatusChip
                      status={record.status}
                      descriptionMessage={descriptionMessageRejected}
                    />

                    <Tooltip
                      placement='left'
                      title={
                        isRemoveDisabled
                          ? "No se puede borrar la solicitud una vez se ha aprobado"
                          : "Borrar solicitud"
                      }
                    >
                      <Button
                        type='ghost'
                        shape='circle'
                        size='small'
                        danger
                        disabled={isRemoveDisabled}
                        icon={<DeleteOutlined color='warning' />}
                        onClick={() => onDelete(record)}
                      />
                    </Tooltip>
                  </Row>
                );
              },
            },
          ]}
        />
        <UserApplicationModal
          idSelectedEdit={idSelected}
          modalTitle={`Aplicación de usuario`}
          isModalVisible={isModalWatchVisible}
          onCancel={handleCancel}
          onReject={rejectApplication}
          onConfirm={accept}
          data={currentPersonalInfo}
          aproveApplication={aproveUserApplication}
          approveAccount={approveAccount}
        />
      </div>
    </div>
  );
}

export default UsersRequests;
