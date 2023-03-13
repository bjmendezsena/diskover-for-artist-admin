import applicationsServices from "./services";
import applicationsConstants from "./constants";
import { message } from "antd";

import { getErrorMessage } from "../../utils/errorUtils";
import { ERROR_MSG } from "../../helpers/errorMessages";

const {
  SET_APPLICATIONS,
  SET_LOADING_APPLICATIONS,
  SET_SEND_CONTRACT_LOADING
} = applicationsConstants;

export const setApplications = (applications: any) => ({
  type: SET_APPLICATIONS,
  applications,
});

export const setLoadingApplications = (isLoading: any) => ({
  type: SET_LOADING_APPLICATIONS,
  isLoading,
});

export const setSendContractLoading = (isLoading: boolean) => ({
  type: SET_SEND_CONTRACT_LOADING,
  payload:isLoading
});

export const doFetchAll = () => {
  return (dispatch: any) => {
    dispatch(setLoadingApplications(true));
    applicationsServices
      .fetchAll()
      .then((res) => {
        console.log("APPLICATIONS");
        console.log(res);
        dispatch(setApplications(res.data.userApplications));
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(setLoadingApplications(false));
  };
};

export const acceptOne = (data: FormData, cb: any) => {
  return (dispatch: any) => {
    applicationsServices.acceptOne(data).then((res) => {
      applicationsServices.fetchAll().then((res) => {
        dispatch(setApplications(res.data.applications));
        dispatch(setLoadingApplications(false));
      });
      if (res.status === 200) {
        return cb("");
      } else {
        return cb("error");
      }
    });
  };
};

export const doApproveUserApplication = (id: string) => {
  return (dispatch: any) => {
    dispatch(setLoadingApplications(true));
    applicationsServices
      .aproveUserApplication(id)
      .then((res) => {
        onSuccessMessage("Se ha aprobado la solicitud exitosamente");
        applicationsServices.fetchAll().then((res) => {
          dispatch(setApplications(res.data.userApplications));
        });
      })
      .catch((err) => {
        console.log(err);
      });
    dispatch(setLoadingApplications(false));
  };
};
export const doResendContract = (contractId: string) => {
  return (dispatch: any) => {
    dispatch(setSendContractLoading(true));
    applicationsServices
      .resendContract(contractId)
      .then((res) => {
        onSuccessMessage("Se ha enviado el contrato correctamente.");
        applicationsServices.fetchAll().then((res) => {
          dispatch(setApplications(res.data.userApplications));
        });
      })
      .catch((err) => {
      }).finally(() => {
        dispatch(setSendContractLoading(false));
      });
  };
};

export const doAcceptAccount = (id: string, data: any) => {
  return (dispatch: any) => {
    dispatch(setLoadingApplications(true));
    applicationsServices
      .aceptAccount(id, data)
      .then((res) => {
        onSuccessMessage("Se ha aceptado la solicitud exitosamente");
        applicationsServices.fetchAll().then((res) => {
          dispatch(setApplications(res.data.userApplications));
        });
      })
      .catch((err) => {
        const errorCode = getErrorMessage(err) || "";

        const errorMessage =
          ERROR_MSG[errorCode] || "Error al aceptar la solicitud";
        onErrorMessage(errorMessage);
      });
    dispatch(setLoadingApplications(false));
  };
};

export const doRejectUserApplication = (id: string, reason: string) => {
  return async (dispatch: any) => {
    dispatch(setLoadingApplications(true));

    try {
      await applicationsServices.rejectUserApplication(id, reason);
      const fetchResponse = await applicationsServices.fetchAll();
      onSuccessMessage("Se ha rechazado la solicitud exitosamente");
      dispatch(setApplications(fetchResponse.data.userApplications));
    } catch (error) {}
    dispatch(setLoadingApplications(false));
    dispatch(setLoadingApplications(false));
  };
};
export const doRemoveUserApplication = (id: string) => {
  return async (dispatch: any) => {
    dispatch(setLoadingApplications(true));

    try {
      await applicationsServices.removeUserApplication(id);
      const fetchResponse = await applicationsServices.fetchAll();
      onSuccessMessage("Se ha eliminado la solicitud exitosamente");
      dispatch(setApplications(fetchResponse.data.userApplications));
    } catch (error) {
      console.log(error);
    }
    dispatch(setLoadingApplications(false));
    dispatch(setLoadingApplications(false));
  };
};
const onSuccessMessage = (msg: string) => {
  message.success({
    content: msg,
  });
};

const onErrorMessage = (msg: string) => {
  message.error({
    content: msg,
  });
};
