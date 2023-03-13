import api from '../../helpers/api';
import audiosalad from '../../helpers/audiosalad';

api.defaults.headers.common["x-token"] = localStorage.getItem('diskover-admin-token');
const userServices = {
  me: () => {
    return api.get('/admin/renew');
  },
  login: (email: string, password: string, remember?: boolean) => {
    return api.post(
      '/admin/login',
      { email, password }
    );
  },
  logout: () => {
    return api.get('/admin/logout');
  },
  addStrike: (email: string) => {
    return api.put(`/admin/strike/${email}`);
  },
  removeStrike: (email: string) => {
    return api.put(`/admin/remove_strike/${email}`);
  },
  verificateUser: (email: string) => {
    return api.put(`/admin/verificate/${email}`);
  },
  pay: (requestId: string) => {
    return api.post(`/admin/pay`, { requestId });
  },
  editUser: (user: any) => {
    return api.post(`/admin/edit_user`, user);
  },
  getNotifications: () => {
    return api.get(`/pay/request/unseen`)
  },
  getIncome: (email: any) => {
    return audiosalad.post(`/releases/isrc`, { email: email })
  }
};

export default userServices;
