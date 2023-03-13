import paymentServices from "./services";

export const setLoadingRequests = (
  isLoading: boolean
) => ({
  type: 'SET_LOADING_REQUESTS',
  isLoading,
});

export const setLoadingNewRequest = (
  isLoadingNewRequest: boolean
) => ({
  type: 'SET_LOADING_NEW_REQUEST',
  isLoadingNewRequest,
});

const setRequests = (requests: any) => ({
  type: 'SET_REQUESTS',
  requests,
});

const setResponse = (response: any) => ({
  type: 'SET_RESPONSE',
  response,
});

const setToken = (token: String) => ({
  type: 'SET_TOKEN',
  token,
})


const setNotifications = (notifications: any) => ({
  type: 'SET_NOTIFICATIONS',
  notifications
})


const setSplits = (splits: any) => ({
  type: 'SET_SPLITS',
  splits
})

export const fetchAll = () => {
  return (dispatch: any) => {
    dispatch(setLoadingRequests(true));
    paymentServices.fetchAll().then((res) => {
      dispatch(setLoadingRequests(false));
      dispatch(getNotifications("", () => { }));
      // dispatch(setNotifications(0))
      return dispatch(setRequests(res.data.requests));
    });
  };
};
export const acceptOne = (data: any, token: String, cb: any) => {
  return (dispatch: any) => {
    dispatch(setLoadingRequests(true));
    console.log(data);
    console.log(token);
    paymentServices.acceptOne(data, token).then((res) => {
      console.log(res.data);
      dispatch(setResponse(res.data))
      dispatch(setLoadingRequests(false));
      dispatch(fetchAll());
      return cb("");
    }).catch((error) => {
      dispatch(setLoadingRequests(false));
      return cb(error)
    })
  }
}

export const rejectOne = (data: any, cb: any) => {
  return (dispatch: any) => {
    dispatch(setLoadingRequests(true));
    paymentServices.rejectOne(data).then((res) => {
      dispatch(setLoadingRequests(false));
      dispatch(fetchAll());
      return cb("")
    })
  }
}

export const manualOne = (data: any, cb: any) => {
  return (dispatch: any) => {
    dispatch(setLoadingRequests(true));
    paymentServices.manualOne(data).then((res) => {
      dispatch(setLoadingRequests(false));
      dispatch(fetchAll());
      return cb("")
    })
  }
}



export const getToken = () => {
  return (dispatch: any) =>
    paymentServices.getToken().then((res) => {
      dispatch(setToken(res.data.token))
    })
}


export const getNotifications = (data: any, cb: any) => {
  return (dispatch: any) => {
    paymentServices.getNotifications().then((res) => {
      // console.log("RESP");
      // console.log(res.data);
      dispatch(setNotifications(res.data))
      return cb("")
    })
  }
}


export const newRequest = (email: String, cb: any) => {
  return (dispatch: any) => {
    dispatch(setLoadingNewRequest(true));
    paymentServices.newRequest(email).then((res) => {
      dispatch(fetchAll());
      dispatch(setLoadingNewRequest(false));
      return cb("")
    }).catch((error) => {
      dispatch(setLoadingNewRequest(false));
      return cb(error.response.data.errors)
    })
  }
}

export const getSplitsByReleaseId = (releaseId: String, requestId: String, cb: any) => {
  return (dispatch: any) => {
    paymentServices.getSplitsByReleaseId(releaseId, requestId).then((res) => {
      dispatch(setSplits(res.data.splits))
      return cb("")
    }).catch((error) => {
      return cb(error.response.data.errors)
    })
  }
}

export const getSplitsByUser = (email: String, requestId: String, cb: any) => {
  return (dispatch: any) => {
    paymentServices.getSplitsByUser(email, requestId).then((res) => {
      dispatch(setSplits(res.data.splits))
      return cb("")
    }).catch((error) => {
      return cb(error.response.errors)
    })
  }
}