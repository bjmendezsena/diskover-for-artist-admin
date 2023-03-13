import api from '../../helpers/api';

const purchasesServices = {
  fetchAll: () => {
    return api.get('/purchase_history/list/');
  },

  fetchById: (id: string) => {
    return api.get('/purchase_history/get/' + id);
  },

  updatePurchase: (id: string, direction: string, status: string) => {
    return api.put('/purchase_history/edit/' + id, {
      direction,
      status,
    });
  },
};

export default purchasesServices;
