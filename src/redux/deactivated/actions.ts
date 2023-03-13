import deactivatedUsersService from './services';
import deactivatedUsersConstants from './constants';

const { SET_LOADING_DEACTIVATED_USERS } = deactivatedUsersConstants;

export const setLoadingDeactivatedUsers = (isLoadingDeactivatedUsers: boolean) => ({
  type: SET_LOADING_DEACTIVATED_USERS,
  isLoadingDeactivatedUsers,
});

export const fetchDeactivatedUsers = (query?: any) => {
  return deactivatedUsersService.fetch().catch(() => []);
};
