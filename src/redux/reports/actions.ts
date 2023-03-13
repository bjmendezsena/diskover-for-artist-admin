import reportsService from './services';
import reportsConstants from './constants';

const { SET_LOADING_REPORTS, SET_REPORTS } = reportsConstants;

export const setLoadingReports = (isLoadingReports: boolean) => ({ type: SET_LOADING_REPORTS, isLoadingReports });
export const setReports = (reports: any) => ({ type: SET_REPORTS, reports });

export const fetchReports = (query?: any) => {
  return reportsService.fetch().catch(() => []);
};

export const blockReportedUser = (id: String) => {
  return reportsService.blockReportedUser(id).catch((err: any) => err);
}
