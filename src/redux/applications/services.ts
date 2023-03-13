import api from "../../helpers/api";

const applicationsServices = {
  fetchAll: () => {
    return api.get("/user-application");
  },
  acceptOne: (data: FormData) => {
    // const headers = {
    //   "Content-Type": "multipart/form-data",
    //   "Accept": "multipart/form-data",
    // };
    return api.post("/registration/accept", data);
  },
  rejectOne: (data: any) => {
    return api.post("/registration/reject", data);
  },
  aproveUserApplication: (id: string) => {
    return api.put(`/user-application/${id}/approve`);
  },
  aceptAccount: (id: string, data: any) => {
    return api.put(`/user-application/${id}/accept`, data);
  },
  rejectUserApplication: (id: string, reason: string) => {
    return api.put(`/user-application/${id}/reject`, { reason });
  },
  removeUserApplication: (id: string) => {
    return api.delete(`/user-application/${id}/remove`);
  },
  resendContract: (contractId: string) => {
    return api.post(`/user-application/contracts/${contractId}/resend`);
  },
};

export default applicationsServices;
