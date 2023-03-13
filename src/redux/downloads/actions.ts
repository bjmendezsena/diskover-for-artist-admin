import downloadServices from './services';
import axios from "axios";

export const downloadReleaseCsv = (data: any, callback?: any) => {
    return (dispatch: any) => {
        downloadServices.soliciteRoyalties(data).then((res) => {
            if (res.status === 200) {
                // downloadServices.downloadRoyalties().then((res) => {
                axios({
                    baseURL: process.env.REACT_APP_API_URL + "/downloads/download_royalties",
                    responseType: "blob",
                    withCredentials: true,
                }).then((response) => {
                    console.log(response);

                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    if (data.releasesId) {
                        link.setAttribute('download', `${data.releaseId}_${data.fromMonth}${data.toMonth}.csv`);
                    }
                    if (data.labelId) {
                        link.setAttribute('download', `${data.labelId}_${data.fromMonth}${data.toMonth}.csv`);
                    }

                    if (data.email) {
                        link.setAttribute('download', `${data.email}_${data.fromMonth}${data.toMonth}.csv`);
                    }
                    document.body.appendChild(link);
                    link.click();
                    callback("")
                });

                console.log(res);

            }
        })
    }
}