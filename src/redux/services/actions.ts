import servicesConstants from "./constants";
import servicesServices from './services'

const {
  SET_LOADING_SERVICES,
  SET_SERVICES,
  SET_CREATING_SERVICE,
  SET_CREATED_SERVICE,
  SET_DELETING_SERVICES,
  REMOVE_SERVICE,
} = servicesConstants;


const setLoadingServices = (isLoadingServices: boolean) => ({ type: SET_LOADING_SERVICES, isLoadingServices });
const setServices = (services: any) => ({ type: SET_SERVICES, services });

export const fetchServices = (query?: any) => {
    return (dispatch: any) => {
        dispatch(setLoadingServices(true));
				servicesServices.fetch(query).then((res) => {
					dispatch(setLoadingServices(false));
					return dispatch(setServices(res.data.services))
				});
    }
};

const setCreatingService = (isCreatingService: boolean) => ({ type: SET_CREATING_SERVICE, isCreatingService });
const addService = (service: any) => ({ type: SET_CREATED_SERVICE, service });

export const createService = (data: any, callback: any) => {
  return (dispatch: any) => {
    dispatch(setCreatingService(true));
    servicesServices.create(data).then((res) => {
      dispatch(setCreatingService(false));
      if (callback) callback();
      return dispatch(addService(res.data.service));
    });
  }
}

const setDeletingServices = (isDeletingServices: boolean) => ({ type: SET_DELETING_SERVICES, isDeletingServices });
const removeService = (deletedServiceId: string) => ({ type: REMOVE_SERVICE, deletedServiceId });

export const deleteService = (id: string, callback: any) => {
    return (dispatch: any) => {
        dispatch(setDeletingServices(true));
				servicesServices.delete(id).then((res) => {
          dispatch(setDeletingServices(false));
          if (callback) callback();
					return dispatch(removeService(id))
				});
    }
};

const {
  SET_EDITING_SERVICES,
  SET_EDITED_SERVICES
} = servicesConstants;
const setEditingServices = (isEditingService: boolean) => ({
  type: SET_EDITING_SERVICES,
  isEditingService,
});
const setEditedService = (editedService: string) => ({
  type: SET_EDITED_SERVICES,
  editedService,
});
export const editService = (id: string, data: any, callback: any) => {
  return (dispatch: any) => {
    dispatch(setEditingServices(true));
    servicesServices.edit(id, data).then((res: any) => {
      dispatch(setEditingServices(false));
      if (callback) callback();
      return dispatch(setEditedService(id));
    });
  };
};

