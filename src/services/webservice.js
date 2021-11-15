import * as http from "./http";
import cookie from "js-cookie";
import { dialog } from "../components";
import axios from 'axios'

const REACT_APP_API_HOST_1 = process.env.REACT_APP_API_HOST_1
const REACT_APP_API_HOST_2 = process.env.REACT_APP_API_HOST_2


const api = {


    getProvinceList() {

        return post({
            path: "api/api/ReportServices/GetProvinces"
        })

    },
    getMonthList() {

        return post({
            path: "api/api/ReportServices/GetMonth"
        })

    },
    getZoneList() {

        return post({
            path: "api/api/ReportServices/GetZone"
        })

    },
    getPayLoan(params) {

        return post({
            path: "api/api/ReportServices/GetFarmerPayLoan",
            params
        })

    },
    getSummaryFarmerPayLoan(params) {

        return post({
            path: "api/api/ReportServices/GetSummaryFarmerPayLoan",
            params
        })

    },
    exportPayloanExcel(params) {

        return post({
            path: "api/api/ReportServices/ExportFarmerPayLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },

    getInvoicePayPdf(params){
        return get({
            path: "api/report/pdf/GetInvoicePayPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getInvoiceByContactPdf(params) {
        return get({
            path: "api/report/pdf/GetInvoiceByContactPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getInvoiceByProjectPdf(params) {
        return get({
            path: "api/report/pdf/GetInvoiceByProjectPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    exportPrintInvoiceAll(params) {
        return post({
            path: "api/api/ExportServices/ExportPrintInvoiceAll",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    exportNoticeInvoice(params) {
        return post({
            path: "api/api/ExportServices/ExportNoticeInvoice",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    exportDebtSettlement(params) {
        return post({
            path: "api/api/ExportServices/ExportDebtSettlement",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getDebtReminder_O1pdf(params) {
        return post({
            path: "api/report/pdf/GetDebtReminder_O1pdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getDebtReminder_O2pdf(params) {
        return post({
            path: "api/report/pdf/GetDebtReminder_O2pdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getDebtReminder_ByContractpdf(params) {
        return post({
            path: "api/report/pdf/GetDebtReminderฺฺByContractpdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getDebtReminder_ByProjectpdf(params) {
        return post({
            path: "api/report/pdf/GetDebtReminderฺฺByProjectpdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getDebtConditionByContractPdf(params) {
        return post({
            path: "api/report/pdf/GetDebtConditionByContractPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getFaultConditionByUserNamePdf(params) {
        return get({
            path: "api/report/pdf/GetFaultConditionByUserNamePdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getAdvanceInvoiceLabelPdf(params) {
        return post({
            path: "api/report/pdf/GetAdvanceInvoiceLabelPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getFaultConditionByContractPdf(params) {
        return get({
            path: "api/report/pdf/GetFaultConditionByContractPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getDebtConditionByUserNamePdf(params) {
        return get({
            path: "api/report/pdf/GetDebtConditionByUserNamePdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getCardPdf(params) {
        return post({
            path: "api/report/pdf/GetCardPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getCardLawPdf(params) {
        return post({
            path: "api/report/pdf/GetCardLawPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getRequestLoanPdf(params) {
        return post({
            path: "api/report/pdf/GetRequestLoanPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getSummaryRequestLoanPdf(params) {
        return post({
            path: "api/report/pdf/GetSummaryRequestLoanPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getSignPdf(params) {
        return post({
            path: "api/report/pdf/GetSignPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getFarmerPayLoanPdf(params) {
        return post({
            path: "api/report/pdf/GetFarmerPayLoanPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getSummaryFarmerPayLoanPdf(params) {
        return post({
            path: "api/report/pdf/GetSummaryFarmerPayLoanPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },

    getNewSummaryFarmerPayLoanPdf(params) {
        return post({
            path: "api/report/pdf/GetNewSummaryFarmerPayLoanPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getPayLoanPdf(params) {
        return post({
            path: "api/report/pdf/GetPayLoanPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getSummaryPayLoanPdf(params) {
        return post({
            path: "api/report/pdf/GetSummaryPayLoanPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    
    getSummaryProjPayLoanPdf(params) {
        return post({
            path: "api/report/pdf/GetSummaryProjPayLoanPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getSummarySignPdf(params) {
        return post({
            path: "api/report/pdf/GetSummarySignPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getSignByProjPdf(params) {
        return post({
            path: "api/report/pdf/GetSignByProjPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getBilledPdf(params) {
        return post({
            path: "api/report/pdf/GetBilledPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getConvertLoanPdf(params) {
        return post({
            path: "api/report/pdf/GetConvertLoanPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getSummaryConvertLoanPdf(params) {
        return post({
            path: "api/report/pdf/GetSummaryConvertLoanPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getLawSuitPdf(params) {
        return post({
            path: "api/report/pdf/GetLawSuitPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getSummaryLawSuitPdf(params) {
        return post({
            path: "api/report/pdf/GetSummaryLawSuitPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getSummaryModifyPdf(params) {
        return post({
            path: "api/report/pdf/GetSummaryModifyPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getModifyPdf(params) {
        return post({
            path: "api/report/pdf/GetModifyPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getNewFarmerPayLoanPdf(params) {
        return post({
            path: "api/report/pdf/GetNewFarmerPayLoanPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    exportSummayPayloanExcel(params) {

        return post({
            path: "api/api/ReportServices/ExportSummaryFarmerPayLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getNewFarmerPayLoan(params) {

        return post({
            path: "api/api/ReportServices/GetNewFarmerPayLoan",
            params
        })

    },
    exportNewFarmerPayLoan(params) {

        return post({
            path: "api/api/ReportServices/ExportNewFarmerPayLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getNewSummaryFarmerPayLoan(params) {

        return post({
            path: "api/api/ReportServices/GetNewSummaryFarmerPayLoan",
            params
        })

    },
    exportNewSummaryFarmerPayLoan(params) {

        return post({
            path: "api/api/ReportServices/ExportNewSummaryFarmerPayLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getPayLoanList(params) {

        return post({
            path: "api/api/ReportServices/GetPayLoan",
            params
        })

    },
    exportPayLoan(params) {

        return post({
            path: "api/api/ReportServices/ExportPayLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getSummaryPayLoan(params) {

        return post({
            path: "api/api/ReportServices/GetSummaryPayLoan",
            params
        })

    },
    exportSummaryPayLoan(params) {

        return post({
            path: "api/api/ReportServices/ExportSummaryPayLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getSummaryProjPayLoan(params) {

        return post({
            path: "api/api/ReportServices/GetSummaryProjPayLoan",
            params
        })

    },
    exportSummaryProjPayLoan(params) {

        return post({
            path: "api/api/ReportServices/ExportSummaryProjPayLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getRequestLoan(params) {

        return post({
            path: "api/api/ReportServices/GetRequestLoan",
            params
        })

    },
    exportRequestLoan(params) {

        return post({
            path: "api/api/ReportServices/ExportRequestLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getSummaryRequestLoan(params) {

        return post({
            path: "api/api/ReportServices/GetSummaryRequestLoan",
            params
        })

    },
    exportSummaryRequestLoan(params) {

        return post({
            path: "api/api/ReportServices/ExportSummaryRequestLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getSignLoan(params) {

        return post({
           path: "api/api/ReportServices/GetSignLoan",
            params
        })

    },
    exportSignLoan(params) {

        return post({
            path: "api/api/ReportServices/ExportSignLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getSignProjLoan(params) {

        return post({
           path: "api/api/ReportServices/GetSignProjLoan",
           params
        })

    },
    exportSignProjLoan(params) {

        return post({
            path: "api/api/ReportServices/ExportSignProjLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getSummarySignLoan(params) {

        return post({
            path: "api/api/ReportServices/GetSummarySignLoan",
            params
        })

    },
    exportSummarySignLoan(params) {

        return post({
            path: "api/api/ReportServices/ExportSummarySignLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getConvertLoan(params) {

        return post({
            path: "api/api/ReportServices/GetConvertLoan",
            params
        })

    },
    exportConvertLoan(params) {

        return post({
            path: "api/api/ReportServices/ExportConvertLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getSummaryConvertLoan(params) {

        return post({
            path: "api/api/ReportServices/GetSummaryConvertLoan",
            params
        })

    },
    exportSummaryConvertLoan(params) {

        return post({
            path: "api/api/ReportServices/ExportSummaryConvertLoan",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getLawSuit(params) {

        return post({
            path: "api/api/ReportServices/GetLawSuit",
            params
        })

    },
    exportLawSuit(params) {

        return post({
            path: "api/api/ReportServices/ExportLawSuit",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getSummaryLawSuit(params) {

        return post({
            path: "api/api/ReportServices/GetSummaryLawSuit",
            params
        })

    },
    exportSummaryLawSuit(params) {

        return post({
            path: "api/api/ReportServices/ExportSummaryLawSuit",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getModify(params) {

        return post({
            path: "api/api/ReportServices/GetModify",
            params
        })

    },
    exportModify(params) {

        return post({
            path: "api/api/ReportServices/ExportModify",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getSummaryModify(params) {

        return post({
            path: "api/api/ReportServices/GetSummaryModify",
            params
        })

    },
    exportSummaryModify(params) {

        return post({
            path: "api/api/ReportServices/ExportSummaryModify",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getBilled(params) {

        return post({
            path: "api/api/ReportServices/GetBilled",
            params
        })

    },
    exportBilled(params) {

        return post({
            path: "api/api/ReportServices/ExportBilled",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getContractPayment(params) {

        return post({
            path: "api/api/CheckServices/GetContractPayment",
            params
        })

    },
    getInvoiceById(params) {

        return post({
            path: "api/api/CheckServices/GetInvoiceById",
            params
        })

    },
    exportContractPayment(params) {

        return post({
            path: "api/api/CheckServices/ExportContractPayment",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },

    getAppraisalCourt(params) {

        return post({
            path: "api/api/CheckServices/GetAppraisalCourt",
            params
        })

    },
    exportAppraisalCourt(params) {

        return post({
            path: "api/api/CheckServices/ExportAppraisalCourt",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getTermsAndInterest(params) {

        return post({
            path: "api/api/CheckServices/GetTermsAndInterest",
            params
        })

    },
    exportTermsAndInterest(params) {

        return post({
            path: "api/api/CheckServices/ExportTermsAndInterest",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getAccountsReceivable(params) {

        return post({
            path: "api/api/CheckServices/GetAccountsReceivable",
            params
        })

    },
    exportAccountsReceivable(params) {

        return post({
            path: "api/api/CheckServices/ExportAccountsReceivable",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getInvoice(params) {

        return post({
            path: "api/api/CheckServices/GetInvoice",
            params
        })

    },
    exportInvoice(params) {

        return post({
            path: "api/api/CheckServices/ExportInvoice",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getPayAndAccount(params) {

        return post({
            path: "api/api/CheckServices/GetPayAndAccount",
            params
        })

    },
    exportPayAndAccount(params) {

        return post({
            path: "api/api/CheckServices/ExportPayAndAccount",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getActualPayment(params) {

        return post({
            path: "api/api/CheckServices/GetActualPayment",
            params
        })

    },
    exportActualPayment(params) {

        return post({
            path: "api/api/CheckServices/ExportActualPayment",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getReceipt(params) {

        return post({
            path: "api/api/CheckServices/GetReceipt",
            params
        })

    },
    exportReceipt(params) {

        return post({
            path: "api/api/CheckServices/ExportReceipt",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getPaymentBalance(params) {

        return post({
            path: "api/api/CheckServices/GetPaymentBalance",
            params: params
        })

    },
    getCalPayment(params) {

        return post({
            path: "api/api/CheckServices/GetCalPayment",
            params: params
        })

    },
    exportPaymentBalance(params) {

        return post({
            path: "api/api/CheckServices/ExportPaymentBalance",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getContract(params) {

        return post({
            path: "api/api/CheckServices/GetContract",
            params
        })

    },
    exportContract(params) {

        return post({
            path: "api/api/CheckServices/ExportContract",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })

    },
    getCompensate(params) {

        return post({
            path: "api/api/ReportServices/GetCompensate",
            params
        })

    },
    getCompensateDetail(params) {

        return post({
            path: "api/api/ReportServices/GetCompensateDetail",
            params
        })

    },
    getDebtPending(params) {

        return post({
            path: "api/api/ReportServices/GetDebtPending",
            params
        })

    },
    getReceiptSelectData(params) {

        return post({
            path: "Receipt/GetSelectData",
            params,
            config: { baseURL: REACT_APP_API_HOST_1 },
        })

    },
    getProcessBeforePay(params) {

        return post({
            path: "Receipt/GetProcessBeforePay",
            params,
            config: { baseURL: REACT_APP_API_HOST_1 },
        })

    },
    saveReceipt(params) {

        return post({
            path: "Receipt/Insert",
            params,
            config: { baseURL: REACT_APP_API_HOST_1 },
        })

    },
    getInvoiceList(params) {

        return post({
            path: "Invoice/GetAll",
            params,
            config: { baseURL: REACT_APP_API_HOST_1 },
        })

    },
    getInvoiceAlert(params) {

        return post({
            path: "Invoice/Alert",
            params,
            config: { baseURL: REACT_APP_API_HOST_1 },
        })

    },
    getPrintInvoice(params) {

        return post({
            path: "Invoice/Print",
            params,
            config: { baseURL: REACT_APP_API_HOST_1 },
        })

    },
    getDataByLoan(params) {

        return post({
            path: "GetDebt/GetDataByLoan",
            params,
            config: { baseURL: REACT_APP_API_HOST_1 },
        })

    },

    getDataByRelentNumber(params) {

        return post({
            path: "Relent/GetDataByRelentNumber",
            params,
            config: { baseURL: REACT_APP_API_HOST_1 },
        })

    },
    selectDataByLoan(params) {

        return post({
            path: "Relent/SelectDataByLoan",
            params,
            config: { baseURL: REACT_APP_API_HOST_1 },
        })

    },
    saveRelent(params) {

        return post({
            path: "Relent/Save",
            params,
            config: { baseURL: REACT_APP_API_HOST_1 },
        })

    },
    getDebtDataByLoan(params) {

        return post({
            path: "GetDebt/GetDataByLoan",
            params,
            config: { baseURL: REACT_APP_API_HOST_1 },
        })

    },
    getDebtDataByID(params) {

        return post({
            path: "GetDebt/GetDataByID",
            params,
            config: { baseURL: REACT_APP_API_HOST_1 },
        })

    },
    getChagestructureDataByLoan(params) {

        return post({
            path: "Chagestructure/GetDataByLoan",
            params,
            config: { baseURL: REACT_APP_API_HOST_1 },
        })

    },
    getAdvanceInvoiceAll(params) {

        return post({
            path: "AdvanceInvoice/GetAll",
            params,
            config: { baseURL: REACT_APP_API_HOST_1 },
        })

    },
    getAdvanceInvoiceGetTotal(params) {

        return post({
            path: "AdvanceInvoice/GetTotal",
            params,
            config: { baseURL: REACT_APP_API_HOST_1 },
        })

    },
    getMasterSPKCondition(params) {

        return post({
            path: "Chagestructure/GetMasterSPKCondition",
            params,
            config: { baseURL: REACT_APP_API_HOST_1 },
        })

    },
    changeDeptStructuresSave(params) {

        return post({
            path: "ChangeDeptStructures/Save",
            params,
            config: { baseURL: REACT_APP_API_HOST_1 },
        })
    },
    extendTimeGetDataLoan(params) {

        return post({
            path: "ExtendTime/GetDataLoan",
            params,
            config: { baseURL: REACT_APP_API_HOST_1 },
        })
    },
    getSpkMainProject(params) {

        const token = localStorage.getItem('token')
        return post({
            path: "nodeapi/admin/api/get_spkmainproject",
            params,
            config: { baseURL: REACT_APP_API_HOST_2 },
            token: token,
            isExternal:true
        })
    },
    selectDataExtendNumber(params) {

        return post({
            path: "ExtendTime/SelectDataExtendNumber",
            params,
            config: { baseURL: REACT_APP_API_HOST_1 },
        })
    },
    extendTimeInsert(params) {

        return post({
            path: "ExtendTime/Insert",
            params,
            config: { baseURL: REACT_APP_API_HOST_1 },
        })
    },

};

function getToken() {

    const token = localStorage.getItem('token')

    // return token;
    return ""
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

function get({ path, params, data, isShowError = true, config = {}, context, token, isExternal }) {
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
