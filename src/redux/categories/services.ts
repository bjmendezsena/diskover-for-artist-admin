import api from "../../helpers/api";


const categoriesServices = {
  fetch: (query: any) => {
    return api.get("/categories", { params: { ...query } });
  },
  create: (data: { name: string; image?: string }) => {
    return api.post(
      "/categories/",
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  },
  edit: (id: string, data: any) => {
    return api.put(
      "/categories/" + id,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
  },
  delete: (id: string) => {
    return api.delete("/categories/" + id);
  },
};

export default categoriesServices;