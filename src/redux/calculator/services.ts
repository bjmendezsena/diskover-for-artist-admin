import api from '../../helpers/api';

const foodServices = {
  listImpact: () => {
    return api.get('/calculator/listImpact');
  },
  listEnergy: () => {
    return api.get('/calculator/listEnergy');

  },
  listAgribalyse: (type: string) => {
    return api.get(`/calculator/listAgribalyse/${type}`);

  },
  listCalnut: () => {
    return api.get('/calculator/listCalnut');

  },
  listAnc: () => {
    return api.get('/calculator/listAnc');
  },
  listTypes: () => {
    return api.get('calculator/listTypes');
  },
  listQuestions: () => {
    return api.get('calculator/listQuestions');
  },
  updateQuestions: (data:any) => {
    return api.put('calculator/questions', {data});
  }
};

export default foodServices;
