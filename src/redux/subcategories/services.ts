import api from "../../helpers/api";

const subcategoriesServices = {
  fetchAll: () => {
    return api.get("/subcategories");
  },
};

export default subcategoriesServices;