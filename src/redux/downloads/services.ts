import api from '../../helpers/api';


const downloadServices = {
    soliciteRoyalties: (data: any) => {
        return api.post(`/downloads/royalties_to_download`, data)
    },
    downloadRoyalties: () => {
        return api.get('/downloads/download_royalties')
    }
}

export default downloadServices

