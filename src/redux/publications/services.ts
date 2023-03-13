import api from '../../helpers/api';

const publicationsServices = {
  fetchAll: (type: String) => {
    return api.get('/publications/get/' + type);
  },

  newPublication: (
    title: String,
    image: String,
    semillas: Number,
    url: String,
    type: String
  ) => {
    return api.post('/publications/create', {
      title,
      image,
      semillas,
      url,
      type,
    });
  },

  fetchById: (id: String) => {
    return api.get('/publications/getbyid/' + id);
  },

  updatePublication: (
    id: String,
    title: String,
    image: String,
    semillas: Number,
    url: String
  ) => {
    return api.put('/publications/update/' + id, {
      title,
      image,
      semillas,
      url,
    });
  },
  delete: (id: String) => {
    return api.delete('/publications/delete/' + id);
  },
};

export default publicationsServices;
