import api from '../../helpers/api';

const authServices = {
  fetchAll: (from: String) => {
    return api.get(`/admin/get_users/${from}`);
  },
  fetchAllLabels: () => {
    return api.get('/admin/get_labels');
  },
  modifyPercent: (data: any) => {
    return api.post('/admin/update_percent', {
      email: data.email,
      percent: data.percent
    })
  },
  fetchUserHose: (id: string) => {
    return api.get(`/admin/user_home/${id}`);
  },
  newLabel: (
    label_id: any,
    label_name: any,
    label_email: any,
    label_percent: any
  ) => {
    return api.post('/admin/new_label', {
      label_id,
      label_name,
      label_email,
      label_percent
    });
  },
  deleteLabel: (id: string) => {
    return api.delete(`/admin/delete_label/${id}`)
  },
  editLabel: (
    label_id: any,
    label_name: any,
    label_email: any,
  ) => {
    return api.put('/admin/edit_label/' + label_id, {
      label_id,
      label_name,
      label_email
    });
  },
  getNotifications: () => {
    return api.get(`/pay/request/unseen`)
  }
};

export default authServices;
