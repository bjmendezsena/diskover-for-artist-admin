import royaltiesServices from './services';

const setLoading = (loading: boolean) => ({
  type: 'SET_LOADING_ROYALTIES',
  loading,
});

const setRoyalties = (royalties: any) => ({
  type: 'SET_ROYALTIES',
  royalties,
});

export const fetchRoyaltiesByUploadId = (id: string) => {
  return (dispatch: any) => {
    dispatch(setLoading(true));
    royaltiesServices.fetchAllRoyalties(id).then((res) => {
      if (res.status === 200) {
        dispatch(setLoading(false));
        return dispatch(setRoyalties(res.data.royalties));
      } else {
        dispatch(setLoading(false));
      }
    });
  }
}
export const fetchRoyaltiesByRequestId = (id: string) => {
  return (dispatch: any) => {
    dispatch(setLoading(true));
    royaltiesServices.fetchRequestedRoyalties(id).then((res) => {
      console.log(res)
      if (res.status === 200) {
        dispatch(setLoading(false));
        return dispatch(setRoyalties(res.data.royalties));
      } else {
        dispatch(setLoading(false));
      }
    });
  }
}
const setLoadingManual=(loading: boolean) => ({
  type: 'SET_LOADING_MANUAL',
  loading
})
export const manualUpload= ( data: any, cb: any ) =>{
  return (dispatch: any) => {
    dispatch(setLoadingManual(true));
    royaltiesServices.updateOne(data).then((res) => {
      if (res.status === 200) {
        dispatch(setLoadingManual(false));
        return cb("");
      } else {
        dispatch(setLoadingManual(false));
        return cb("Error");
      }
    }).catch((e)=>{
      console.log(e);
      return cb("Error");
    })
  }
}
