import api from '../../helpers/api';

const foodServices = {
  fetchAll: () => {
    return api.get('/calculator/listProducts');
  },
  /* create: (image: any, name: any, category: any, value: number, age: boolean, impacting: boolean) => {
    return api.post('food/create', {
      image,
      name,
      category,
      value,
      age,
      impacting
    });
  },
  delete: (id: any) => {
    return api.delete('food/delete/' + id);
  },
  edit: (id: any, data: any) => {
    return api.put('/food/edit/' + id, data);
  }, */
};

export default foodServices;
