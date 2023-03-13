import api from '../../helpers/api';

const authServices = {
  fetchAllRoyalties: (id: string)=>{
    return api.get(`/admin/get_royalties/${id}`);
  },
  fetchRequestedRoyalties: (id: string)=>{
    return api.get(`/admin/get_requested/${id}`);
  },
  updateOne: (data: any)=>{
    return api.get(`admin/manual_royalty/${data.id}/${data.isrc}`)
  }
};

export default authServices;
