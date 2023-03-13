import api from '../../helpers/api';

const adminsServices = {
  fetchAll: (filters: any) => {
    return api.get('/admin/list', { params: { ...filters } });
  },
  createAdmin: (email: string, password: string) => {
    return api.post('/admin', { email, password });
  },
  deleteAdmin: (id: string) => {
    return api.delete('/admin/' + id);
  },
  editAdmin: (id: any, email: any, password: any, name: any) => {
    return api.put('/admin/update/' + id, {
      email,
      password,
      name,
    });
  },
  newAdmin: (email: any, password: any, name: any) => {
    return api.post('/admin/signup/', {
      email,
      password,
      name,
    });
  },
};

export default adminsServices;
