import api from '../../helpers/api';

const feedbacksServices = {
  fetch: () => {
    return api.get('/feedbacks');
  }
};

export default feedbacksServices;
