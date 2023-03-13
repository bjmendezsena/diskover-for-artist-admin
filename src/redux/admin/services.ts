import api from "../../helpers/api";

const adminServices = {
  fetchAllAdmins: (filters: any) => {
    return api.get("/admin/get_admins");
  },
  newAdmin: (
    email: any,
    password: any,
    name: any,
    lastName: any
  ) => {
    return api.post("admin/new", {
      email,
      password,
      name,
      lastName,
    });
  },
  deleteAdmin: (id: any) => {
    return api.delete("admin/delete/" + id);
  },
  editAdmin: (
    id: any,
    name: any,
    lastName: any,
    email: any
  ) => {
    return api.put("/admin/" + id, {
      name,
      lastName,
      email
    });
  },

  updateAccess: (admins: any) => {
    return api.post('admin/update', admins);
  }

};

export default adminServices;
