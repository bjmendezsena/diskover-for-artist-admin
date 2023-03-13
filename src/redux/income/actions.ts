import incomeServices from './services';
import incomeConstants from "./constants";

const { SET_TOTAL, SET_COMISSION, SET_PAYED } = incomeConstants


export const setLoadingRequests = (
    isLoading: boolean) => ({
        type: 'SET_LOADING_REQUESTS',
        isLoading
    })

const setLoadingArtists = (
    loadingArtists: boolean) => ({
        type: 'SET_LOADING_ARTISTS',
        loadingArtists
    })


const setLoadingLabels = (
    loadingLabels: boolean) => ({
        type: 'SET_LOADING_LABELS',
        loadingLabels
    })


const setLoadingReleases = (
    loadingReleases: boolean) => ({
        type: 'SET_LOADING_RELEASES',
        loadingReleases
    })

const setLoadingSongs = (
    loadingSongs: boolean) => ({
        type: 'SET_LOADING_SONGS',
        loadingSongs
    })

const setLoadingPlatforms = (
    loadingPlatforms: boolean) => ({
        type: 'SET_LOADING_PLATFORMS',
        loadingPlatforms
    })

const setLoadingCountries = (
    loadingCountries: boolean) => ({
        type: 'SET_LOADING_COUNTRIES',
        loadingCountries
    })

const setSongs = (songs: any) => ({
    type: 'SET_SONGS',
    songs
})

const setLabels = (labels: any) => ({
    type: 'SET_LABELS',
    labels
})

const setArtists = (artists: any) => ({
    type: 'SET_ARTISTS',
    artists
})

const setReleases = (releases: any) => ({
    type: 'SET_RELEASES',
    releases
})

const setPlatforms = (platforms: any) => ({
    type: 'SET_PLATFORMS',
    platforms
})

const setCountries = (countries: any) => ({
    type: 'SET_COUNTRIES',
    countries
})

const setTotal = (total: any) => ({
    type: SET_TOTAL,
    total
})

const setComission = (comission: any) => ({
    type: SET_COMISSION,
    comission
})

const setPayedToUsers = (payed: any) => ({
    type: SET_PAYED,
    payed
})

// export const fetchSongs = () => {
//     return (dispatch: any) => {
//         dispatch(setLoadingSongs(true))
//         incomeServices.fetchSongs().then((res) => {
//             // console.log(res.data);
//             dispatch(setLoadingSongs(false))
//             return dispatch(setSongs(res.data))
//         })
//     }
// }

// export const fetchLabels = () => {
//     return (dispatch: any) => {
//         dispatch(setLoadingLabels(true))
//         incomeServices.fetchLabels().then((res) => {
//             console.log("LABELS");

//             console.log(res);
//             dispatch(setLoadingLabels(false))
//             return dispatch(setLabels(res.data))
//         })
//     }
// }

export const fetchArtists2 = () => {
    return (dispatch: any) => {
        dispatch(setLoadingArtists(true))
        incomeServices.fetchArtists().then((res) => {
            console.log("ARTISTS");
            console.log(res);
            dispatch(setLoadingArtists(false))
            return dispatch(setArtists(res.data.users))
        })
    }
}

export const fetchLabels2 = () => {
    return (dispatch: any) => {
        dispatch(setLoadingLabels(true))
        incomeServices.fetchLabels().then((res) => {
            console.log("LABELS");

            console.log(res);
            dispatch(setLoadingLabels(false))
            return dispatch(setLabels(res.data.tracksByLabel))
        })
    }
}

export const fetchSongs2 = () => {
    return (dispatch: any) => {
        dispatch(setLoadingSongs(true))
        incomeServices.fetchSongs().then((res) => {
            // console.log(res.data);
            dispatch(setLoadingSongs(false))
            return dispatch(setSongs(res.data.tracks))
        })
    }
}

export const fetchReleases2 = () => {
    return (dispatch: any) => {
        dispatch(setLoadingReleases(true))
        incomeServices.fetchReleases().then((res) => {
            // console.log(res.data);
            dispatch(setLoadingReleases(false))
            return dispatch(setReleases(res.data.tracksByRelease))
        })
    }
}

export const fetchPlatforms2 = () => {
    return (dispatch: any) => {
        dispatch(setLoadingPlatforms(true))
        incomeServices.fetchPlatforms().then((res) => {
            console.log("FETCHPLATFORMS:");
            console.log(res.data.royaltiesByPlatform);
            dispatch(setLoadingPlatforms(false))
            return dispatch(setPlatforms(res.data.royaltiesByPlatform))
        })
    }
}

export const fetchCountries2 = () => {
    return (dispatch: any) => {
        dispatch(setLoadingCountries(true))
        incomeServices.fetchCountries().then((res) => {
            console.log("Countries:");
            console.log(res.data.royaltiesByCountry);
            dispatch(setLoadingCountries(false))
            return dispatch(setCountries(res.data.royaltiesByCountry))
        })
    }
}


export const fetchTotal = () => {
    return (dispatch: any, cb: any) => {
        dispatch(setLoadingRequests(true))
        incomeServices.fetchTotal().then((res) => {
            console.log(res);
            dispatch(setTotal(res.data.history))
            dispatch(setLoadingRequests(false))
        })
    }
}

export const fetchComission = () => {
    return (dispatch: any, cb: any) => {
        dispatch(setLoadingRequests(true))
        incomeServices.fetchComission().then((res) => {
            console.log("COMISSION:");

            console.log(res);
            dispatch(setComission(res.data.requests))
            // dispatch(setPayedToUsers(res.data.payedRequest))
            dispatch(setLoadingRequests(false))
        })
    }
}

