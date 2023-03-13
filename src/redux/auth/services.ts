import api from '../../helpers/api';

const authServices = {
  requestRecovery: (email: string) => {
    return api.post('/auth/forgot-password', { email });
  },
  checkRecovery: (token: string) => {
    return api.post('/auth/recover/check/' + token);
  },
  postRecovery: (token: string, password: string) => {
    return api.put(`/auth/recover/change_password/`, { token, password });
  },
};

export default authServices;
