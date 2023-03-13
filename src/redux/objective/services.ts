import api from '../../helpers/api';

const objectiveServices = {
  fetchAll: () => {
    return api.get('/objective/list');
  },
  edit: (data: any) => {
    return api.put('/objective/edit/', data);
  },
};

export default objectiveServices;
