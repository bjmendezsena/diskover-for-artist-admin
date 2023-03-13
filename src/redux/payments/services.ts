import api from '../../helpers/api';

const paymentServices = {
  fetchAll: () => {
    return api.get('/pay/request/get_all');
  },
  acceptOne: (data: any, token: any) => {
    console.log("DATA:");
    console.log(data);
    return api.post(`/pay/request/accept`, { paypal: data.paypal, amount: data.amount, id: data._id, token: token })
  },
  getToken: () => {
    return api.get('/pay/getToken')
  },
  rejectOne: (data: any) => {
    return api.post(`/pay/request/reject/${data.requestId}`, { info: data.info })
  },
  manualOne: (data: any) => {
    return api.post(`/pay/request/manual/${data.requestId}`, { info: data.info })
  },
  getNotifications: () => {
    return api.get(`/pay/request/unseen`)
  },
  fetchUserRequest: (email: any) => {
    return api.get(`/pay/request/get_user_requests/${email}`)
  },
  newRequest: (email: any) => {
    return api.post('/pay/request/total', { email: email })
  },
  getSplitsByReleaseId: (releaseId: String, requestId: String) => {
    return api.post(`/pay/get_splits_by_release_id/${releaseId}`, { requestId: requestId })
  },
  getSplitsByUser: (email: String, requestId: String) => {
    return api.post(`/pay/get_splits_by_user/${email}`, { requestId: requestId })
  }
};

export default paymentServices;
