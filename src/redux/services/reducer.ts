import servicesConstants from "./constants";

const {
  SET_LOADING_SERVICES,
  SET_SERVICES,
  SET_CREATING_SERVICE,
  SET_CREATED_SERVICE,
  SET_DELETING_SERVICES,
  REMOVE_SERVICE,
} = servicesConstants;

const initialState = {
  loading: false,
  data: [],
};

const servicesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_LOADING_SERVICES: {
      return {
        ...state,
        loading: action.isLoadingServices,
      };
    }
    case SET_SERVICES: {
      return {
        ...state,
        data: action.services,
      };
    }
    case SET_CREATING_SERVICE: {
      return {
        ...state,
        creating: action.isCreatingServices,
      };
    }
    case SET_CREATED_SERVICE: {
      let services: any[] = state.data;
      let newService = action.service;
      // New service is a child
      if (newService.parent) {
        // Save services in parent
        services = services.map((parentService) => {
          let parent = parentService;
          if (parent.id === newService.parent) {
            if (newService.children) {
              parent.children = [newService, ...parent.children]
            } else {
              parent.children = [newService]
            }
          }
          return parentService;
        })
      } else {
        // New service is a parent
        services = [newService, ...services]
      }
      return {
        ...state,
        data: services
      };
    }
    case SET_DELETING_SERVICES: {
      return {
        ...state,
        deleting: action.isDeletingServices,
      };
    }
    case REMOVE_SERVICE: {
      const filteredParents = state.data.filter((service: any) => service.id !== action.deletedServiceId);
      const filteredServices = filteredParents.map((parent: any ) => {
        if (parent.children) parent.children = parent.children.filter((child: any) => child.id !== action.deletedServiceId)
        return parent;
      })
      return {
        ...state,
        data: filteredServices,
      };
    }
    default: {
      return state;
    }
  }
};

export default servicesReducer;
