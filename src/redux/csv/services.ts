import api from '../../helpers/api';

const fileServices = {
  fetchAllAdmins: (filters: any) => {
    return api.get('/admin/get_admins');
  },
  sendNotifications: (upload_id: String) => {
    return api.put(`/uploads/${upload_id}`)
  },
  newFile: (platform: string, formData: FormData) => {
    const headers = {
      'Content-Type': 'multipart/form-data',
      'Accept': 'multipart/form-data'
    }
    return api.post(`/uploads/${platform}`, formData, { headers: headers });
  },
  newManual: (data: any) => {
    return api.post('/admin/manual_royalties/', data)
  },
  getPlatforms: () => {
    return api.get('/uploads/platforms');
  },
  deleteAdmin: (id: any) => {
    return api.delete('admin/delete/' + id);
  },
  editAdmin: (id: any, data: any) => {
    return api.put('/admin/edit/' + id, data);
  },
  fetchHistory: () => {
    return api.get('/uploads/get_history');
  },
  deleteOne: (id: string) => {
    return api.delete(`/uploads/${id}`);
  }
};

export default fileServices;
