import React, { useEffect, useState } from "react";
import { PageHeader, Table, Input, Checkbox, Button, message } from "antd";
import AdminModalForm from "../../../components/AdminModalForm";
import EditAdminForm from "../../../components/EditAdminForm";
import ModalConfirm from "../../../components/ModalConfirm";
import { useDispatch, useSelector } from "react-redux";
import {
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import {
  fetchAllAdmins,
  newAdmin,
  editOneAdmin,
  deleteAdmin,
  updateAccess
} from "../../../redux/admin/actions";
import { CheckboxValueType } from "antd/lib/checkbox/Group";



function Administrator() {
  const dispatch = useDispatch();
  const [admins, setAdmins]: any = useState([]);



  // On first load, fetch data
  useEffect(() => {
    dispatch(fetchAllAdmins());
  }, [dispatch]);

  const { loadingAdmins, dataAdmins, creating } =
    useSelector((state: any) => state.admin);

  const { user, checked, userInfo } = useSelector(
    (state: any) => state.user
  );


  useEffect(() => {
    setAdmins(dataAdmins);
    // console.log(user);
    // console.log(userInfo);


  }, [dataAdmins]);

  const routes = [
    {
      path: "index",
      breadcrumbName: "",
    },
  ];

  const createItem = (data: any, callback: any) => {
    dispatch(
      newAdmin(
        {
          email: data.email,
          password: data.password,
          name: data.name,
          last_name: data.last_name,
        },
        callback
      )
    );
  };

  const [selectedAdmin, setSelectedAdmin] = useState({
    name: "",
    lastName: "",
    email: "",
  });
  const [isModalDeleteVisible, setIsModalDeleteVisible] =
    useState(false);

  const showDelete = (admin: any) => {
    setSelectedAdmin(admin);
    setIsModalDeleteVisible(true);
  };
  const closeDelete = () => {
    setSelectedAdmin({ name: "", lastName: "", email: "" });
    setIsModalDeleteVisible(false);
  };
  const handleDelete = (callback: any) => {
    dispatch(deleteAdmin(selectedAdmin.email, callback));
    setIsModalDeleteVisible(false);
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
    dispatch(editOneAdmin(data, callback));
  };

  const [search, setSearch] = useState("");
  const changeSearch = (entry: any) => {
    const { value } = entry.target;
    setSearch(value.toLowerCase());
  };
  useEffect(() => {
    let output = dataAdmins;
    if (search !== "") {
      const filteredData = output.filter((e: any) => {
        if (
          e.name.toLowerCase().includes(search) ||
          e.lastName.toLowerCase().includes(search) ||
          e.email.toLowerCase().includes(search)
        ) {
          return true;
        } else {
          return false;
        }
      });
      output = filteredData;
    }

    setAdmins(output);
  }, [search]);


  // const superOptions = [
  //   { label: 'Usuarios/Labels/Releases', value: 'labelsAccess', disabled: false },
  //   { label: 'Ingresos', value: 'paymentsAccess', disabled: false },
  //   { label: 'Super admin', value: 'superAdmin', disabled: false },
  // ];

  const nonSuperOptions = [
    { label: 'Usuarios/Labels/Releases', value: 'labelsAccess', disabled: true },
    { label: 'Ingresos', value: 'paymentsAccess', disabled: true },
    { label: 'Super admin', value: 'superAdmin', disabled: true },
  ];


  function onChange(checkedValues: CheckboxValueType[], record: any) {
    console.log('checked = ', checkedValues);
    // checkedValues.forEach((value) => {
    //   record[value.toString()] = value

    // })
    record.permissions = checkedValues
    console.log(record);
    // console.log(admins);


  }

  function updatePermissions() {
    dispatch(updateAccess(admins, () => {
      message.success("¡Hecho!");
    }))
  }

  return (
    <div>
      <PageHeader
        title="Administradores"
        ghost={false}
        breadcrumb={{ routes }}
      />
      <div
        className="top_content_container"
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
        <AdminModalForm
          openButtonText="Nuevo"
          modalTitle="Registrar un nuevo administrador"
          successMessage="¡Administrador creado!"
          onConfirm={createItem}
          confirmLoading={creating}
        />
        <EditAdminForm
          modalTitle="Editar un label existente"
          successMessage="Administrador editado con éxito!"
          onConfirm={editOne}
          confirmLoading={false}
          isVisible={isModalEditVisible}
          onCancel={closeModalEdit}
          data={userToEdit}
        />
        <ModalConfirm
          modalTitle="Eliminar Administrador"
          isModalVisible={isModalDeleteVisible}
          onCancel={closeDelete}
          onConfirm={handleDelete}
          data={{
            alert: `¿Está seguro de querer eliminar este administrador?`,
            rows: [
              `Nombre: ${selectedAdmin.name +
              " " +
              selectedAdmin.lastName
              }`,
              `Email:  ${selectedAdmin.email}`,
            ],
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
          dataSource={admins}
          loading={loadingAdmins}
          rowKey="id"
          columns={[
            {
              title: "Nombre",
              dataIndex: "name",
              key: "name",
            },
            {
              title: "Apellido",
              dataIndex: "lastName",
              key: "lastName",
            },
            {
              title: "Email",
              dataIndex: "email",
              key: "email",
            },
            {
              title: "Permisos",
              dataIndex: "id",
              fixed: "right",
              width: 500,
              align: "center",
              key: "delete",
              render: (text: any, record: any) => {


                const initValues = []

                if (record.paymentsAccess) {
                  initValues.push("paymentsAccess")
                }

                if (record.labelsAccess) {
                  initValues.push("labelsAccess")
                }
                if (record.superAdmin) {
                  initValues.push("superAdmin")
                }

                const superOptions = [
                  { label: 'Usuarios/Labels/Releases', value: 'labelsAccess', disabled: false, checked: true },
                  { label: 'Ingresos', value: 'paymentsAccess', disabled: false },
                  { label: 'Administradores', value: 'superAdmin', disabled: false },
                ];


                if (user.superAdmin) {
                  return (
                    <>
                      <Checkbox.Group options={superOptions} defaultValue={initValues} onChange={(e) => onChange(e, record)} />
                    </>
                  )
                }
                else {
                  return (
                    <>
                      <Checkbox.Group options={nonSuperOptions} defaultValue={['asd']} onChange={(e) => onChange(e, record)} />
                    </>
                  )
                }
              },
            },

            {
              title: "Editar",
              dataIndex: "id",
              fixed: "right",
              width: 75,
              align: "center",
              key: "delete",
              render: (text: any, record: any) => (
                <>
                  <EditOutlined
                    onClick={() => showModalEdit(record)}
                    style={{
                      fontSize: "20px",
                      color: "#00000",
                    }}
                  />
                </>
              ),
            },
            {
              title: "Borrar",
              dataIndex: "email",
              fixed: "right",
              width: 75,
              align: "center",
              key: "delete",
              render: (text: any, record: any) => (

                <>
                  <DeleteOutlined
                    onClick={() => showDelete(record)}
                    style={{
                      fontSize: "20px",
                      color: "#00000",
                    }}
                  />
                </>
              ),
            },
          ]}
        />
      </div>
      <Button style={{ float: "right", margin: "10px" }} onClick={updatePermissions}>Guardar</Button>
    </div>
  );
}

export default Administrator;
