import api from '../../helpers/api';

const reportsServices = {
  fetch: () => {
    return api.get('/reports');
  },
  blockReportedUser: (id: String) => {
    return api.put(`/users/reject/${id}`);
  },
};

export default reportsServices;
