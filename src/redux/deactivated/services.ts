import api from '../../helpers/api';

const deactivatedUsersServices = {
  fetch: () => {
    return api.get('/users/deactivated');
  },
};

export default deactivatedUsersServices;
