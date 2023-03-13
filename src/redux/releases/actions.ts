import releasesServices from './services';
import axios from "axios";

const setLoadingReleases = (loading: boolean) => ({
  type: 'SET_LOADING_RELEASES',
  loading,
});

const setErrorReleases = (error: string) => ({
  type: 'SET_EROR_RELEASES',
  error,
});

const setReleases = (releases: any) => ({
  type: 'SET_RELEASES',
  releases,
});

export const fetchAllReleases = () => {
  return (dispatch: any) => {
    dispatch(setLoadingReleases(true));
    releasesServices.fetchAllReleases().then((res) => {
      if (res.status === 200) {
        dispatch(setLoadingReleases(false));
        return dispatch(setReleases(res.data.releases));
      } else {
        dispatch(setLoadingReleases(false));
        return dispatch(setErrorReleases(res.data.errors[0].description));
      }
    });
  }
}
const setLoadingSplits = (loading: boolean) => ({
  type: 'SET_LOADING_SPLITS',
  loading,
});

const setSplitsError = (error: string) => ({
  type: 'SET_EROR_SPLITS',
  error,
});

const setSplits = (splits: any) => ({
  type: 'SET_SPLITS',
  splits,
});
export const fetchSplitsByRelease = (releaseId: string) => {
  return (dispatch: any) => {
    dispatch(setLoadingSplits(true));
    releasesServices.fetchSplits(releaseId).then((res) => {
      if (res.status === 200) {
        dispatch(setLoadingSplits(false));
        return dispatch(setSplits(res.data.releases));
      } else {
        dispatch(setLoadingSplits(false));
        return dispatch(setSplitsError(res.data.errors[0].description));
      }
    })
  }
}
const loadingEdit = (loading: boolean) => ({
  type: 'ARCHIVE_RELEASE',
  loading
});

export const archiveRelease = (releaseId: string, callback?: any) => {
  return (dispatch: any) => {
    dispatch(loadingEdit(true));
    releasesServices.storeRelease(releaseId).then((res) => {
      try {
        if (res.status === 200) {
          dispatch(loadingEdit(false));
          dispatch(fetchAllReleases());
          if (callback) callback("");
        } else {
          dispatch(loadingEdit(false));
          if (callback) callback(res.data.errors);
        }
      } catch (err) {
        dispatch(loadingEdit(false));
        if (callback) callback(res.data.errors);
      }
    })
  }
}

export const restoreRelease = (releaseId: string, callback?: any) => {
  return (dispatch: any) => {
    dispatch(loadingEdit(true));
    releasesServices.restoreRelease(releaseId).then((res) => {
      try {
        if (res.status === 200) {
          dispatch(loadingEdit(false));
          dispatch(fetchAllReleases());
          if (callback) callback("");
        } else {
          dispatch(loadingEdit(false));
          if (callback) callback(res.data.errors);
        }
      } catch (err) {
        dispatch(loadingEdit(false));
        if (callback) callback(res.data.errors);
      }
    })
  }
}
