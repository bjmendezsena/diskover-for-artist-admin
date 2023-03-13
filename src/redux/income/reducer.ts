import incomeConstants from "./constants";

const { SET_TOTAL, SET_COMISSION, SET_PAYED } = incomeConstants


const initialState = {
    request: [],
    loading: false,
    response: {},
    total: [],
    comission: [],
    payed: [],
    artists: [],
    labels: [],
    releases: [],
    songs: [],
    platforms: [],
    countries: [],
    loadingArtists: false,
    loadingLabels: false,
    loadingReleases: false,
    loadingSongs: false,
    loadingPlatforms: false,
    loadingCountries: false,


};

const incomeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_ARTISTS': {
            return {
                ...state,
                artists: action.artists
            }
        }
        case 'SET_LABELS': {
            return {
                ...state,
                labels: action.labels
            }
        }
        case 'SET_RELEASES': {
            return {
                ...state,
                releases: action.releases
            }
        }
        case 'SET_SONGS': {
            return {
                ...state,
                songs: action.songs
            }
        }
        case 'SET_PLATFORMS': {
            return {
                ...state,
                platforms: action.platforms
            }
        }
        case 'SET_COUNTRIES': {
            return {
                ...state,
                countries: action.countries
            }
        }
        case 'SET_LOADING_ARTISTS': {
            return {
                ...state,
                loadingArtists: action.loadingArtists
            }
        }

        case 'SET_LOADING_LABELS': {
            return {
                ...state,
                loadingLabels: action.loadingLabels
            }
        }

        case 'SET_LOADING_RELEASES': {
            return {
                ...state,
                loadingReleases: action.loadingReleases
            }
        }

        case 'SET_LOADING_SONGS': {
            return {
                ...state,
                loadingSongs: action.loadingSongs
            }
        }

        case 'SET_LOADING_PLATFORMS': {
            return {
                ...state,
                loadingPlatforms: action.loadingPlatforms
            }
        }

        case 'SET_LOADING_COUNTRIES': {
            return {
                ...state,
                loadingCountries: action.loadingCountries
            }
        }

        case SET_TOTAL: {
            return {
                ...state,
                total: action.total
            }
        }
        case SET_COMISSION: {
            return {
                ...state,
                comission: action.comission
            }
        }
        case SET_PAYED: {
            return {
                ...state,
                payed: action.payed
            }
        }
        case 'SET_LOADING_REQUESTS': {
            return {
                ...state,
                loading: action.isLoading,
            };
        }
        default: {
            return state
        }
    }
}



export default incomeReducer;