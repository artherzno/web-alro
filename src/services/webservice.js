import * as http from "./http";
import cookie from "js-cookie";
import { dialog } from "../components";
import axios from 'axios'



const api = {

    
    getProvinceList(){

        return get({
            path:"api/ReportServices/GetProvinces"
        })

    },
    getMonthList() {

        return get({
            path: "api/ReportServices/GetMonth"
        })

    },
    getZoneList() {

        return get({
            path: "api/ReportServices/GetZone"
        })

    },
    getPayLoan(data) {

        return get({
            path: "api/ReportServices/GetFarmerPayLoan",
            data
        })

    },
    getSummaryFarmerPayLoan(data) {

        return get({
            path: "api/ReportServices/GetSummaryFarmerPayLoan",
            data
        })

    },
    exportPayloanExcel(data){

        return get({
            path: "api/ReportServices/ExportFarmerPayLoan",
            data,
            config:{
                responseType: 'arraybuffer',
            }
        })

    },
    exportSummayPayloanExcel(data) {

        return get({
            path: "api/ReportServices/ExportSummaryFarmerPayLoan",
            data,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getNewFarmerPayLoan(data) {

        return get({
            path: "api/ReportServices/GetNewFarmerPayLoan",
            data
        })

    },
    exportNewFarmerPayLoan(data) {

        return get({
            path: "api/ReportServices/ExportNewFarmerPayLoan",
            data,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getNewSummaryFarmerPayLoan(data) {

        return get({
            path: "api/ReportServices/GetNewSummaryFarmerPayLoan",
            data
        })

    },
    exportNewSummaryFarmerPayLoan(data) {

        return get({
            path: "api/ReportServices/ExportNewSummaryFarmerPayLoan",
            data,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getPayLoanList(data) {

        return get({
            path: "api/ReportServices/GetPayLoan",
            data
        })

    },
    exportPayLoan(data) {

        return get({
            path: "api/ReportServices/ExportPayLoan",
            data,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
   
};

function getToken() {
    
    const token = cookie.get("token");

    return token;
}

function post({
    path,
    params,
    isShowError = true,
    isMultipart = false,
    config = {},
    context,
    token,
    isExternal
}) {
    return new Promise((resolve, reject) => {
        return http
            .post(path, params, isExternal ? token : getToken(context), isMultipart, config)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {


                if (isShowError) {
                    handleError(error, reject);
                    reject(error);
                } else {
                    resolve({ error });
                }


            });
    });
}

function put({
    path,
    params,
    isShowError = true,
    isMultipart = false,
    config = {},
    context,
}) {
    return new Promise((resolve, reject) => {
        return http
            .put(path, params, getToken(context), isMultipart, config)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                if (isShowError) {
                    handleError(error, reject);
                } else {
                    reject(error);
                }
            });
    });
}

function deletes({
    path,
    params,
    isShowError = true,
    isMultipart = false,
    config = {},
    context,
}) {
    return new Promise((resolve, reject) => {
        return http
            .deletes(path, params, getToken(context), isMultipart, config)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                if (isShowError) {
                    handleError(error, reject);
                } else {
                    reject(error);
                }
            });
    });
}

function get({ path, params,data, isShowError = true, config = {}, context, token, isExternal }) {
    return new Promise((resolve, reject) => {
        return http
            .get(path, params, isExternal ? token : getToken(context), config, data)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                if (isShowError) {
                    handleError(error, reject);
                } else {
                    reject(error);
                }
            });
    });
}

function handleError(error, reject) {

    
    showErrorDialog(error)
    reject(error);

   
}

export function showErrorDialog(error) {

    const message =
        error.response && typeof error.response.data.message === "string"
            ? error.response.data.message
            : error.message;

    dialog.showDialogWarning({ message });
    
}


export default api;
