import api from '../../helpers/api';

const authServices = {
  fetchAllReleases: () => {
    return api.get('/admin/get_releases');
  },
  fetchSplits: (releaseId: string) => {
    return api.get(`/splits/${releaseId}`);
  },
  storeRelease: (releaseId: string) => {
    return api.put(`/admin/archive/${releaseId}`)
  },
  restoreRelease: (releaseId: string) => {
    return api.put(`/admin/undo_archive/${releaseId}`)
  },
};

export default authServices;
