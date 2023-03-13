import React, { useEffect, useState } from "react";

import styles from './styles.module.scss'
import { useDispatch, useSelector } from "react-redux";
import {
  PageHeader,
  Table,
  Select,
  Input,
  Tag,
} from "antd";
import UserInfoModalWatch from "../../../components/UserInfoModalWatch";
import UserIncomeModal from "../../../components/UserIncomeModal";
import EditPercent from "../../../components/EditPercent";
import EditUserForm from "../../../components/EditUserForm"
import DateSelectorModal from '../../../components/ModalDateSelector'

import {
  fetchAllUsers,
  putStrike,
  substractStrike,
  putVerification,
  modifyPercent,
  editUser,
  getIncome,
  setLoadingIncome
} from "redux/users/actions";

import {
  downloadReleaseCsv
} from "../../../redux/downloads/actions";

import {
  DollarOutlined,
  EyeOutlined,
  EditOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
  EuroCircleOutlined,
  DownSquareOutlined
} from "@ant-design/icons";

import {
  getNotifications,
} from "redux/payments/actions";

function InfoUsers() {
  // Show other info
  const [isModalWatchVisible, setIsModalWatchVisible] =
    useState(false);

  const [isIncomeModalVisible, setIsIncomeModalVisible] =
    useState(false);

  const [currentPersonalInfo, setCurrentPersonalInfo] =
    useState({});


  const [currentPersonalIncome, setCurrentPersonalIncome] =
    useState();


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


  const handleIncomeCancel = () => {
    setIsIncomeModalVisible(false);
  }
  // End show other info
  //--------------------------------//
  // Edit percent
  const [isEditPercentVisible, setIsEditPercentVisible] =
    useState(false);

  const [currentEmailToEdit, setCurrentEmailToEdit] =
    useState("");
  const [currentPercentToEdit, setCurrentPercentToEdit] =
    useState("");


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
    dispatch(modifyPercent(data, cb));
  }
  // End edit percent


  // Edit user

  const [isEditUserVisible, setIsEditUserVisible] =
    useState(false);

  const [isEditUserLoading, setIsEditUserLoading] =
    useState(false);

  const [userData, setUserData] =
    useState({});

  const [email, setEmail] =
    useState("");

  const [contactInfo, setContactInfo] =
    useState({});

  const openEditUser = (userData: any, contactInfo: any) => {
    // setCurrentEmailToEdit(r.email);
    // setCurrentPercentToEdit(r.percent);
    setUserData(userData)
    setContactInfo(userData.contactInfo)
    setIsEditUserVisible(true);
  };

  const cancelEditUser = (r: any) => {
    // setCurrentEmailToEdit(r.email);
    // setCurrentPercentToEdit(r.percent);
    setUserData({})
    setIsEditUserVisible(false);
  };

  const [isDateVisible, setIsDateVisible] = useState(false);

  const showDateSelector = (data: any) => {
    // setDateData(data.info);
    // setCurrentRelease(data.id);
    // setCurrentLabel(data.id)
    console.log(data);
    setEmail(data.email)

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

    data.email = email
    dispatch(downloadReleaseCsv(data, cb));
    console.log(data);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsers("users"));
    dispatch(getNotifications("", () => {
      // console.log("");
    }));

  }, [dispatch]);

  const { loading, users, awaitingPercent, loadingIncome, incomeData } = useSelector(
    (state: any) => state.users
  );


  const showUserIncomeModal = (email: any) => {
    setIsIncomeModalVisible(true);
    setEmail(email)
    dispatch(getIncome(email, () => {
      console.log(incomeData);

      // setCurrentPersonalIncome(incomeData)
    }))
  }

  const [data, setData] = useState(users || [{}]);

  useEffect(() => {
    if (!loading) {
      setData(users);
    }
  }, [users]);


  // useEffect(() => {
  //   setLoadingIncome(loadingIncome)
  //   console.log(loadingIncome);

  // }, [loadingIncome])

  const addStrike = (
    email: string,
    cb: any,
    type: string
  ) => {
    if (type == "add") {
      dispatch(putStrike(email, cb));
    } else if (type === "remove") {
      dispatch(substractStrike(email, cb));
    }
  };

  const verificateUser = (
    email: string,
    cb: any,
    type: string
  ) => {
    // console.log("Users:");
    // console.log(users);
    if (type == "verificate") {
      dispatch(putVerification(email, cb));
    }
    // } else if (type == "remove") {
    //   dispatch(substractStrike(email, cb));
    // }
  };

  const editOne = (data: any, cb: any) => {
    setIsEditUserLoading(true)
    dispatch(editUser(data, cb))
    setIsEditUserLoading(false)
    console.log(data);
  }

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
    setSearch(value.toLowerCase());
  };
  useEffect(() => {
    let output = users;
    if (search !== "") {
      const filteredData = users.filter((e: any) => {
        if (
          e.document.toLowerCase().includes(search) ||
          e.fullName.toLowerCase().includes(search) ||
          e.email.toLowerCase().includes(search) ||
          e.paypal?.toLowerCase().includes(search)
        ) {
          return true;
        } else {
          return false;
        }
      });
      output = filteredData;
    }

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

    setData(output);
  }, [search, strikes, type]);
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
        <EditPercent
          modalTitle="Editar un label existente"
          successMessage="Label editado con éxito!"
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
          Strikes:
        </span>
        <Select
          defaultValue="all"
          onChange={setStrikes}
          style={{
            width: "144px",
            height: "40px",
            borderRadius: "4px",
          }}
        >
          <Select.Option value="all">Todos</Select.Option>
          <Select.Option value="0">0</Select.Option>
          <Select.Option value="1">1</Select.Option>
          <Select.Option value="2">2</Select.Option>
          <Select.Option value="3">3</Select.Option>
        </Select>
        <span
          style={{
            fontWeight: "normal",
            fontSize: "16px",
            marginLeft: "10px",
          }}
        >
          Tipo:
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
          <Select.Option value="user">
            Persona
          </Select.Option>
          <Select.Option value="enterprise">
            Empresa
          </Select.Option>
        </Select>
      </div>
      <div className="content_container">
        <Table
          locale={{ emptyText: 'No hay información' }}
          // rowClassName={(record, index) => index % 2 === 0 ? styles.table_row_light : styles.table_row_light}
          pagination={{ pageSize: 10 }}
          dataSource={data}
          loading={loading}
          rowKey="document"
          scroll={{ x: 1000 }}
          style={{
            marginTop: "20px",
          }}
          columns={[
            {
              title: "Tipo",
              dataIndex: "type",
              key: "type_of_user",
              fixed: "left",
              width: "6%",
              render: (text: string, record: any) =>
                record.type == "user" ? (
                  <span>Persona</span>
                ) : (
                  <span>Empresa</span>
                ),
            },
            {
              title: "Documento",
              dataIndex: "document",
              key: "document",
              fixed: "left",
              width: "8%",
              defaultSortOrder: "descend",
              sorter: (a, b): any =>
                a.document.localeCompare(b.document),
              render: (text: string, record: any) => (
                <>
                  {record.type === "user"
                    ? record.document
                    : "CIF " + record.document}
                </>
              ),
            },
            {
              fixed: "right",
              width: "10%",
              title: "Nombre",
              dataIndex: "fullName",
              key: "fullName",
              defaultSortOrder: "descend",
              sorter: (a, b): any =>
                a.fullName.localeCompare(b.fullName),
            },
            {
              fixed: "right",

              title: "Email",
              width: "10%",
              dataIndex: "email",
              key: "email",
              defaultSortOrder: "descend",
              sorter: (a, b): any =>
                a.email.localeCompare(b.email),
            },
            {
              fixed: "right",
              width: "7%",

              title: "Comisión",
              dataIndex: "percent",
              key: "percent_for_users",
              defaultSortOrder: "descend",
              render: (v: Text, r: any): any => (
                <>
                  <EditOutlined
                    style={{
                      fontSize: "20px",
                      color: "#00000",
                      marginRight: ".5rem"
                    }}
                    onClick={() => openEditPercent(r)}
                  />
                  <span>
                    {v ? v + "%" : "No registrado"}
                  </span>
                </>
              ),
            },
            {
              fixed: "right",
              width: "7%",
              title: "País",
              dataIndex: "country",
              key: "country",
              defaultSortOrder: "descend",
              sorter: (a, b): any =>
                a.country.localeCompare(b.country),
              render: (v: any, r: any): any => (<>{v}</>)

            },
            {
              title: "Contrato",
              dataIndex: "contract",
              key: "contract",
              defaultSortOrder: "descend",
              fixed: "right",

            },
            {
              title: "Cuenta",
              dataIndex: "account",
              key: "account",
              defaultSortOrder: "descend",
              fixed: "right",
              width: "5%",
            },
            {
              title: "Strikes",
              dataIndex: "strikes",
              key: "strikes",
              defaultSortOrder: "descend",
              align: "center",
              fixed: "right",
              width: "5%",
              render: (value: any, record: any) => (
                <>
                  {value === 0 ? (
                    <Tag color="#368a4c">{value}</Tag>
                  ) : value === 1 ? (
                    <Tag color="#a2ad26">{value}</Tag>
                  ) : value === 2 ? (
                    <Tag color="#cf8a13">{value}</Tag>
                  ) : (
                    <Tag color="#942b25">{value}</Tag>
                  )}
                </>
              ),
            },
            {
              title: "Verificado",
              dataIndex: "verifiedAccount",
              key: "verifiedAccount",
              defaultSortOrder: "descend",
              align: "center",
              fixed: "right",
              width: "5%",
              sorter: (a, b) => a.verificationSolicited - b.verificationSolicited,
              render: (value: any, record: any) => {

                let icon;
                if (record.verificationSolicited === 1) {
                  icon = <ExclamationCircleFilled
                    style={{
                      fontSize: "22px",
                      color: "#FFC100",
                    }}
                  />
                }
                else {
                  icon = <CloseCircleFilled
                    style={{
                      fontSize: "22px",
                      color: "#18CD2B",
                    }}
                  />
                }


                return {
                  props: {
                    style: {
                      background: record.verificationSolicitedSeen === false ? "#CDFFA5" : "white",
                    }
                  },
                  children: (
                    <>
                      { }
                      {value === true ? (
                        <CheckCircleFilled
                          style={{
                            fontSize: "22px",
                            color: "#18CD2B",
                          }}
                        />
                      ) :

                        (
                          icon
                        )}
                    </>
                  )
                }
              },
            },
            {
              title: "Ingresos",
              dataIndex: "ingresos",
              align: "center",
              fixed: "right",
              // width: "5%",
              key: "ingresos",
              render: (data: any, record: any) => (
                <>
                  <EuroCircleOutlined
                    style={{
                      fontSize: "20px",
                      color: "#00000",
                    }}
                    onClick={() => showUserIncomeModal(record.email)}
                  />
                </>
              ),
            },
            {
              title: "Info",
              dataIndex: "contactInfo",
              align: "center",
              fixed: "right",
              width: "5%",
              key: "contactInfo",
              render: (data: any, record: any) => (
                <>
                  <EyeOutlined
                    style={{
                      fontSize: "20px",
                      color: "#00000",
                    }}
                    onClick={() => showModalWatch(data)}
                  />
                </>
              ),
            },
            {
              title: "Edit",
              dataIndex: "",
              width: "5%",
              render: (data: any, record: any) => (
                <>
                  <EditOutlined
                    style={{
                      fontSize: "20px",
                      color: "#00000",
                    }}
                    onClick={() => {
                      // console.log(data);
                      openEditUser(data, data.contactInfo)
                    }}
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
              // width: "7%",
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


            // {
            //   title: "Ingresos",
            //   dataIndex: "contactInfo",
            //   align: "center",
            //   fixed: "right",
            //   width: 100,
            //   key: "contactInfo",
            //   render: (data: any, record: any) => (
            //     <>
            //       <DollarOutlined
            //         style={{
            //           fontSize: "20px",
            //           color: "#00000",
            //         }}
            //         onClick={() => showModalWatch(data)}
            //       />
            //     </>
            //   ),
            // },
          ]}
        />
        <EditUserForm
          modalTitle="Editar un usuario existente"
          successMessage="Usuario editado con éxito!"
          onConfirm={editOne}
          confirmLoading={isEditUserLoading}
          isVisible={isEditUserVisible}
          onCancel={cancelEditUser}
          data={userData}
          contactInfo={contactInfo}
        />
        <UserInfoModalWatch
          idSelectedEdit={idSelected}
          onConfirmVerification={verificateUser}
          modalTitle={`Información de cuenta`}
          isModalVisible={isModalWatchVisible}
          onCancel={handleCancel}
          onConfirm={addStrike}
          data={currentPersonalInfo}
        />
        <UserIncomeModal
          key="asd"
          isLoading={loadingIncome}
          idSelectedEdit={idSelected}
          modalTitle={`Información de cuenta ${email}`}
          isModalVisible={isIncomeModalVisible}
          onCancel={handleIncomeCancel}
          data={incomeData}
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



export default InfoUsers;
