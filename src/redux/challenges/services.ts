import api from '../../helpers/api';

const challengeServices = {
  fetchAll: (type: String) => {
    return api.get('/challenge/admin/get/' + type);
  },

  newChallenge: (
    title: String,
    category: String,
    points: Number,
    image: String,
    text: String,
    type: String
  ) => {
    return api.post('/challenge/admin/create', {
      title,
      category,
      points,
      image,
      text,
      type,
    });
  },

  fetchById: (id: String) => {
    return api.get('/challenge/admin/getbyid/' + id);
  },

  updateChallenge: (
    id: String,
    title: String,
    category: String,
    points: Number,
    text: String
  ) => {
    return api.put('/challenge/admin/update/' + id, {
      title,
      category,
      points,
      text,
    });
  },
  delete: (id: String) => {
    return api.delete('/challenge/admin/delete/' + id);
  },
};

export default challengeServices;
