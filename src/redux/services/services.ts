import api from "../../helpers/api";


const servicesServices = {
  fetch: (query: any) => {
    return api.get("/services", { params: { ...query } });
  },
  create: (data: any) => {
    return api.post("/services/", data);
  },
  edit: (id: string, data: any) => {
    return api.put("/services/" + id, data);
  },
  delete: (id: string) => {
    return api.delete("/services/" + id);
  },
};

export default servicesServices;