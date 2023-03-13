import api from '../../helpers/api';

const incomeServices = {
    fetchSongs: () => {
        return api.get('/admin/get_all_songs_2');
    },

    fetchLabels: () => {
        return api.get('/admin/get_all_labels_2');
    },

    fetchReleases: () => {
        return api.get('/admin/get_all_releases_2');
    },

    fetchArtists: () => {
        return api.get('/admin/get_all_users_2');
    },

    fetchPlatforms: () => {
        return api.get('/admin/get_all_platforms_2');
    },

    fetchCountries: () => {
        return api.get('/admin/get_all_countries_2');
    },

    fetchTotal: () => {
        return api.get('/uploads/get_history_months')
    },
    fetchComission: () => {
        return api.get('/uploads/get_request_months')
    }
}

export default incomeServices;