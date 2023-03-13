import adminConstants from "./constants";
import fileServices from "./services";

const { SET_LOADING_ADMINS, SET_ADMINS } = adminConstants;

const { SET_NEW_ADMIN, NEW_ADMIN_ERROR } = adminConstants;

const setNewFile = (loading: boolean) => ({
  type: "SET_NEW_FILE",
  loading,
});

const setErrorFile = (error: string | null) => ({
  type: "SET_ERROR_FILE",
  error,
});
const loadingPlatforms = (loading: boolean) => ({
  type: "LOAD_PLATFORMS",
  loading,
});
export const fetchPlatforms = (callback: any) => {
  return (dispatch: any) => {
    dispatch(loadingPlatforms(true));
    fileServices
      .getPlatforms()
      .then((res: any) => {
        dispatch(loadingPlatforms(false));
        callback({ error: false, options: res.data.headers });
      })
      .catch((err?: any) => {
        dispatch(loadingPlatforms(false));
        callback({ error: true });
      });
  };
};
export const shootNotifications = (upload_id: String, callback: any) => {
  return (dispatch: any) => {
    fileServices
      .sendNotifications(upload_id)
      .then((res: any) => {
        dispatch(fetchHistory());
        if (callback) callback("");
      })
      .catch((err) => {
        console.log(err.data.errors);
        if (callback) callback(err.data.errors);
      });
  };
};
export const newFile = (data: any, callback?: any) => {
  return (dispatch: any) => {
    console.log("ENTRE:", data);
    dispatch(setNewFile(true));
    fileServices
      .newFile(data.platform, data.form)
      .then((res: any) => {
        if (callback) callback();
        dispatch(setNewFile(false));
        dispatch(fetchHistory());
      })
      .catch((err) => {
        if (!err?.response?.data) {
          dispatch(setErrorFile(err.message));
        } else if (err?.response?.status === 401)
          dispatch(setErrorFile("Mot de passe incorrect"));
        else if (err?.response?.status === 404)
          dispatch(setErrorFile("Utilisateur non trouvé"));
        else dispatch(setErrorFile("Une erreur est survenue"));
        if (callback) callback(err.response?.data?.errors || err.message);
        dispatch(setNewFile(false));
      });
  };
};
const loadHistory = (loading: boolean) => ({
  type: "LOAD_HISTORY",
  loading,
});

const setHistory = (history: string | null) => ({
  type: "SET_HISTORY",
  history,
});
export const fetchHistory = () => {
  return (dispatch: any) => {
    dispatch(loadHistory(true));
    fileServices
      .fetchHistory()
      .then((res: any) => {
        dispatch(loadHistory(false));
        dispatch(setHistory(res.data.history));
      })
      .catch((err) => {
        console.log("error: ", err);
        dispatch(loadHistory(false));
      });
  };
};

export const deleteOneCSV = (id: string, cb: any) => {
  return (dispatch: any) => {
    fileServices
      .deleteOne(id)
      .then((res: any) => {
        dispatch(fetchHistory());
        return cb("");
      })
      .catch((err: any) => {
        console.log("error: ", err);
        return cb(err.response.data.errors);
      });
  };
};

export const newManual = (data: any, callback?: any) => {
  return (dispatch: any) => {
    dispatch(manualLoading(true));
    fileServices
      .newManual(data)
      .then((res: any) => {
        if (callback) callback();
        dispatch(manualLoading(false));
        dispatch(fetchHistory());
      })
      .catch((err) => {
        if (callback) callback(err.data.errors);
        dispatch(manualLoading(false));
      });
  };
};
const manualLoading = (manualLoading: boolean) => ({
  type: "MANUAL_LOADING",
  manualLoading,
});
