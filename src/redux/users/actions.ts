import usersService from "./services";

import usersConstants from "./constants";
import userServices from "redux/user/services";

const {
  SET_LOADING_USERS,
  SET_USERS,
  SET_HOME,
  SET_EDIT_OK,
  SET_LOADING_INCOME,
  SET_INCOME_DATA,
} = usersConstants;

export const setLoadingUsers = (isLoadingUsers: boolean) => ({
  type: SET_LOADING_USERS,
  isLoadingUsers,
});

export const setLoadingEditUser = (isLoadingEditUser: boolean) => ({
  type: SET_LOADING_USERS,
  isLoadingEditUser,
});

export const setLoadingIncome = (isLoadingIncome: boolean) => ({
  type: SET_LOADING_INCOME,
  isLoadingIncome,
});

export const setIncomeData = (incomeData: any) => ({
  type: SET_INCOME_DATA,
  incomeData,
});

const setUsers = (users: any) => ({
  type: SET_USERS,
  users,
});

const setNotifications = (notifications: any) => ({
  type: "SET_NOTIFICATIONS",
  notifications,
});

export const editUser = (data: any, cb: any) => {
  return (dispatch: any) => {
    dispatch(setLoadingEditUser(true));
    userServices.editUser(data).then((res) => {
      dispatch(setLoadingEditUser(false));
      dispatch(fetchAllUsers("payments"));
      return cb("");
    });
  };
};

export const fetchAllUsers = (from: String) => {
  return (dispatch: any) => {
    dispatch(setLoadingUsers(true));
    usersService.fetchAll(from).then((res) => {
      console.log("usersService:", res);
      if (from === "users") {
        dispatch(getNotifications("", () => {}));
      }
      dispatch(setLoadingUsers(false));
      return dispatch(setUsers(res.data.users));
    });
  };
};
const setLoadingPercent = (isLoading: boolean) => ({
  type: "SET_LOAD_PERCENT",
  isLoading,
});
export const modifyPercent = (data: any, cb: any) => {
  return (dispatch: any) => {
    dispatch(setLoadingPercent(true));
    usersService
      .modifyPercent(data)
      .then((res) => {
        dispatch(setLoadingPercent(false));
        dispatch(fetchAllUsers(""));
        return cb("");
      })
      .catch((err) => {
        dispatch(setLoadingPercent(false));
        return cb(err.response.data.errors);
      });
  };
};
const { SET_EDITING_USER, SET_EDIT_ERROR } = usersConstants;
const setEditingUser = (isEditingUser: boolean) => ({
  type: SET_EDITING_USER,
  isEditingUser,
});

const setEditError = (editError: string | null) => ({
  type: SET_EDIT_ERROR,
  editError,
});

const setEditOk = (editOk: boolean) => ({
  type: SET_EDIT_OK,
  editOk,
});

export const editOneLabel = (data: any, callback: any) => {
  return (dispatch: any) => {
    dispatch(setEditingUser(true));
    dispatch(setEditError(null));
    usersService
      .editLabel(data.label_id, data.label_name, data.label_email)
      .then((res: any) => {
        dispatch(setEditingUser(false));
        dispatch(fetchAllLabels());
        return callback("");
      })
      .catch((err) => {
        dispatch(setEditingUser(false));
        if (
          // Messy
          err.response &&
          err.response.status !== 500 &&
          err.response.data &&
          err.response.data.errors.message
        ) {
          return callback(err.response.data.errors);
        } else {
          return callback(err.response.data.errors);
        }
      });
  };
};

const setLoadingLabel = (isEditingUser: boolean) => ({
  type: "SET_LOADING_LABEL",
  isEditingUser,
});

const setLabelError = (error: string) => ({
  type: "SET_LABEL_ERROR",
  error,
});

const setLabel = (labels: any) => ({
  type: "SET_LABEL",
  labels,
});
export const fetchAllLabels = () => {
  return (dispatch: any) => {
    dispatch(setLoadingLabel(true));
    usersService.fetchAllLabels().then((res) => {
      if (res.status === 200) {
        dispatch(setLoadingLabel(false));
        return dispatch(setLabel(res.data.labels));
      } else {
        dispatch(setLoadingLabel(false));
        return dispatch(setLabelError(res.data.errors[0].description));
      }
    });
  };
};
export const newLabel = (data: any, callback: any) => {
  return (dispatch: any) => {
    dispatch(setLoadingLabel(true));
    dispatch(setLabelError(""));
    usersService
      .newLabel(
        data.label_id,
        data.label_name,
        data.label_email,
        data.label_percent
      )
      .then((res: any) => {
        dispatch(setLoadingLabel(false));
        dispatch(setLabel(res.data.labels));
        return callback("");
      })
      .catch((err: any) => {
        dispatch(setLoadingLabel(false));
        if (
          err.response &&
          err.response.status !== 500 &&
          err.response.data &&
          err.response.data.errors
        ) {
          dispatch(setLabelError(err.response.data.errors[0].description));
          return callback(err.response.data.errors[0].description);
        } else {
          dispatch(setLabelError("Ha ocurrido un error"));
        }
      });
  };
};

export const fetchDeleteLabel = (id: string, callback: any) => {
  return (dispatch: any) => {
    dispatch(setLoadingLabel(true));
    dispatch(setLabelError(""));
    usersService
      .deleteLabel(id)
      .then((res: any) => {
        dispatch(setLoadingLabel(false));
        dispatch(fetchAllLabels());
        return callback("");
      })
      .catch((err: any) => {
        dispatch(setLoadingLabel(false));
        if (
          err.response &&
          err.response.status !== 500 &&
          err.response.data &&
          err.response.data.errors
        ) {
          dispatch(setLabelError(err.response.data.errors[0].description));
          return callback(err.response.data.errors[0].description);
        } else {
          dispatch(setLabelError("Ha ocurrido un error"));
        }
      });
  };
};

export const putStrike = (email: string, callback: any) => {
  return (dispatch: any) => {
    userServices
      .addStrike(email)
      .then((res: any) => {
        dispatch(fetchAllUsers(""));
        return callback("");
      })
      .catch((err: any) => {
        if (err.response.data.errors) {
          return callback(err.response.data.errors);
        } else {
          return callback("Error inesperado");
        }
      });
  };
};

export const sendPayment = (requestId: string, callback: any) => {
  return (dispatch: any) => {
    userServices
      .pay(requestId)
      .then((res: any) => {
        dispatch(fetchAllUsers(""));
        return callback("");
      })
      .catch((error: any) => {
        if (error.response.data.errors) {
          return callback("");
        } else {
          return callback("");
        }
      });
  };
};

export const putVerification = (email: string, callback: any) => {
  return (dispatch: any) => {
    userServices
      .verificateUser(email)
      .then((res: any) => {
        dispatch(fetchAllUsers(""));
        return callback("");
      })
      .catch((err: any) => {
        if (err.response.data.errors) {
          return callback(err.response.data.errors);
        } else {
          return callback("Error inesperado");
        }
      });
  };
};
export const substractStrike = (email: string, callback: any) => {
  return (dispatch: any) => {
    userServices
      .removeStrike(email)
      .then((res: any) => {
        dispatch(fetchAllUsers(""));
        return callback("");
      })
      .catch((err: any) => {
        if (err.response.data.errors) {
          return callback(err.response.data.errors);
        } else {
          return callback("Error inesperado");
        }
      });
  };
};

export const getNotifications = (data: any, cb: any) => {
  return (dispatch: any) => {
    userServices.getNotifications().then((res) => {
      // console.log("RESP");
      // console.log(res.data);
      dispatch(setNotifications(res.data));
      return cb("");
    });
  };
};

export const getIncome = (email: any, cb: any) => {
  return (dispatch: any) => {
    dispatch(setLoadingIncome(true));
    userServices.getIncome(email).then((res) => {
      // console.log(res.data);
      dispatch(setIncomeData(res.data));
      dispatch(setLoadingIncome(false));
      return cb("");
    });
  };
};
