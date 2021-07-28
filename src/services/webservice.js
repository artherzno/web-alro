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
    getPayLoan(params) {

        return post({
            path: "api/ReportServices/GetFarmerPayLoan",
            params
        })

    },
    getSummaryFarmerPayLoan(params) {

        return post({
            path: "api/ReportServices/GetSummaryFarmerPayLoan",
            params
        })

    },
    exportPayloanExcel(params){

        return post({
            path: "api/ReportServices/ExportFarmerPayLoan",
            params,
            config:{
                responseType: 'arraybuffer',
            }
        })

    },
    exportSummayPayloanExcel(params) {

        return post({
            path: "api/ReportServices/ExportSummaryFarmerPayLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getNewFarmerPayLoan(params) {

        return post({
            path: "api/ReportServices/GetNewFarmerPayLoan",
            params
        })

    },
    exportNewFarmerPayLoan(params) {

        return post({
            path: "api/ReportServices/ExportNewFarmerPayLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getNewSummaryFarmerPayLoan(params) {

        return post({
            path: "api/ReportServices/GetNewSummaryFarmerPayLoan",
            params
        })

    },
    exportNewSummaryFarmerPayLoan(params) {

        return post({
            path: "api/ReportServices/ExportNewSummaryFarmerPayLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getPayLoanList(params) {

        return post({
            path: "api/ReportServices/GetPayLoan",
            params
        })

    },
    exportPayLoan(params) {

        return post({
            path: "api/ReportServices/ExportPayLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getSummaryPayLoan(params) {

        return post({
            path: "api/ReportServices/GetSummaryPayLoan",
            params
        })

    },
    exportSummaryPayLoan(params) {

        return post({
            path: "api/ReportServices/ExportSummaryPayLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getSummaryProjPayLoan(params) {

        return post({
            path: "api/ReportServices/GetSummaryProjPayLoan",
            params
        })

    },
    exportSummaryProjPayLoan(params) {

        return post({
            path: "api/ReportServices/ExportSummaryProjPayLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getRequestLoan(params) {

        return post({
            path: "api/ReportServices/GetRequestLoan",
            params
        })

    },
    exportRequestLoan(params) {

        return post({
            path: "api/ReportServices/ExportRequestLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getSummaryRequestLoan(params) {

        return post({
            path: "api/ReportServices/GetSummaryRequestLoan",
            params
        })

    },
    exportSummaryRequestLoan(params) {

        return post({
            path: "api/ReportServices/ExportSummaryRequestLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getSignLoan(params) {

        return post({
            path: "api/ReportServices/GetSignLoan",
            params
        })

    },
    exportSignLoan(params) {

        return post({
            path: "api/ReportServices/ExportSignLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getSignProjLoan(params) {

        return post({
            path: "api/ReportServices/GetSignProjLoan",
            params
        })

    },
    exportSignProjLoan(params) {

        return post({
            path: "api/ReportServices/ExportSignProjLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getSummarySignLoan(params) {

        return post({
            path: "api/ReportServices/GetSummarySignLoan",
            params
        })

    },
    exportSummarySignLoan(params) {

        return post({
            path: "api/ReportServices/ExportSummarySignLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getConvertLoan(params) {

        return post({
            path: "api/ReportServices/GetConvertLoan",
            params
        })

    },
    exportConvertLoan(params) {

        return post({
            path: "api/ReportServices/ExportConvertLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getSummaryConvertLoan(params) {

        return post({
            path: "api/ReportServices/GetSummaryConvertLoan",
            params
        })

    },
    exportSummaryConvertLoan(params) {

        return post({
            path: "api/ReportServices/ExportSummaryConvertLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getLawSuit(params) {

        return post({
            path: "api/ReportServices/GetLawSuit",
            params
        })

    },
    exportLawSuit(params) {

        return post({
            path: "api/ReportServices/ExportLawSuit",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getSummaryLawSuit(params) {

        return post({
            path: "api/ReportServices/GetSummaryLawSuit",
            params
        })

    },
    exportSummaryLawSuit(params) {

        return post({
            path: "api/ReportServices/ExportSummaryLawSuit",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getModify(params) {

        return post({
            path: "api/ReportServices/GetModify",
            params
        })

    },
    exportModify(params) {

        return post({
            path: "api/ReportServices/ExportModify",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getSummaryModify(params) {

        return post({
            path: "api/ReportServices/GetSummaryModify",
            params
        })

    },
    exportSummaryModify(params) {

        return post({
            path: "api/ReportServices/ExportSummaryModify",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getBilled(params) {

        return post({
            path: "api/ReportServices/GetBilled",
            params
        })

    },
    exportBilled(params) {

        return post({
            path: "api/ReportServices/ExportBilled",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getContractPayment(params) {

        return post({
            path: "api/CheckServices/GetContractPayment",
            params
        })

    },
    exportContractPayment(params) {

        return post({
            path: "api/CheckServices/ExportContractPayment",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },

    getAppraisalCourt(params) {

        return post({
            path: "api/CheckServices/GetAppraisalCourt",
            params
        })

    },
    exportAppraisalCourt(params) {

        return post({
            path: "api/CheckServices/ExportAppraisalCourt",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getTermsAndInterest(params) {

        return post({
            path: "api/CheckServices/GetTermsAndInterest",
            params
        })

    },
    exportTermsAndInterest(params) {

        return post({
            path: "api/CheckServices/ExportTermsAndInterest",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getAccountsReceivable(params) {

        return post({
            path: "api/CheckServices/GetAccountsReceivable",
            params
        })

    },
    exportAccountsReceivable(params) {

        return post({
            path: "api/CheckServices/ExportAccountsReceivable",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getInvoice(params) {

        return post({
            path: "api/CheckServices/GetInvoice",
            params
        })

    },
    exportInvoice(params) {

        return post({
            path: "api/CheckServices/ExportInvoice",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getPayAndAccount(params) {

        return post({
            path: "api/CheckServices/GetPayAndAccount",
            params
        })

    },
    exportPayAndAccount(params) {

        return post({
            path: "api/CheckServices/ExportPayAndAccount",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getActualPayment(params) {

        return post({
            path: "api/CheckServices/GetActualPayment",
            params
        })

    },
    exportActualPayment(params) {

        return post({
            path: "api/CheckServices/ExportActualPayment",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getReceipt(params) {

        return post({
            path: "api/CheckServices/GetReceipt",
            params
        })

    },
    exportReceipt(params) {

        return post({
            path: "api/CheckServices/ExportReceipt",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getPaymentBalance(params) {

        return post({
            path: "api/CheckServices/GetPaymentBalance",
            params: params
        })

    },
    getCalPayment(params) {

        return post({
            path: "api/CheckServices/GetCalPayment",
            params: params
        })

    },
    exportPaymentBalance(params) {

        return post({
            path: "api/CheckServices/ExportPaymentBalance",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getContract(params) {

        return post({
            path: "api/CheckServices/GetContract",
            params
        })

    },
    exportContract(params) {

        return post({
            path: "api/CheckServices/ExportContract",
            params,
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
