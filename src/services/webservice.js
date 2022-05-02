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
    getCashFlow(params) {

        return post({
            path: "api/api/ReportServices/GetCashFlow",
            params
        })

    },
    getComparePlanResultByContract(params) {

        return post({
            path: "api/api/ReportServices/GetComparePlanResultByContract",
            params
        })

    },
    getComparePlanResultByCode(params) {

        return post({
            path: "api/api/ReportServices/GetComparePlanResultByCode",
            params
        })

    }, getComparePlanResultByProvince(params) {

        return post({
            path: "api/api/ReportServices/GetComparePlanResultByProvince",
            params
        })

    },
    getComparePlanResultByProject(params) {

        return post({
            path: "api/api/ReportServices/GetComparePlanResultByProject",
            params
        })

    },
    getPlanEstimationByContract(params) {

        return post({
            path: "api/api/ReportServices/GetPlanEstimationByContract",
            params
        })

    }, 
    getPlanEstimationByCode(params) {

        return post({
            path: "api/api/ReportServices/GetPlanEstimationByCode",
            params
        })

    },
    getPlanEstimationByProject(params) {

        return post({
            path: "api/api/ReportServices/GetPlanEstimationByProject",
            params
        })

    },
    getPlanEstimationByProvince(params) {

        return post({
            path: "api/api/ReportServices/GetPlanEstimationByProvince",
            params
        })

    },
    getPrincipalInterestByContract(params) {

        return post({
            path: "api/api/ReportServices/GetPrincipalInterestByContract",
            params
        })

    },
    getPrincipalInterestByCode(params) {

        return post({
            path: "api/api/ReportServices/GetPrincipalInterestByCode",
            params
        })

    },
    getPrincipalInterestByProject(params) {

        return post({
            path: "api/api/ReportServices/GetPrincipalInterestByProject",
            params
        })

    }, getPrincipalInterestByProvince(params) {

        return post({
            path: "api/api/ReportServices/GetPrincipalInterestByProvince",
            params
        })

    },
    getGetResultDebtsRemainingByContract(params) {

        return post({
            path: "api/api/ReportServices/GetResultDebtsRemainingByContract",
            params
        })

    },
    getGetResultDebtsRemainingByCode(params) {

        return post({
            path: "api/api/ReportServices/GetResultDebtsRemainingByCode",
            params
        })

    },
    getGetResultDebtsRemainingByProject(params) {

        return post({
            path: "api/api/ReportServices/GetResultDebtsRemainingByProject",
            params
        })

    },
    getGetResultDebtsRemainingByProvince(params) {

        return post({
            path: "api/api/ReportServices/GetResultDebtsRemainingByProvince",
            params
        })

    },
    getCalendarDebt(params) {

        return post({
            path: "api/api/ReportServices/GetCalendarDebt",
            params
        })

    },
    getCalendarDebt1(params) {

        return post({
            path: "api/api/ReportServices/GetCalendarDebt1",
            params
        })

    },
    getCalendarDebt2(params) {

        return post({
            path: "api/api/ReportServices/GetCalendarDebt2",
            params
        })

    },
    getDebtAreaPerContract(params) {

        return post({
            path: "api/api/ReportServices/GetDebtAreaPerContract",
            params
        })

    },
    getDebtAreaPerCode(params) {

        return post({
            path: "api/api/ReportServices/GetDebtAreaPerCode",
            params
        })

    },
    getDebtAreaPerProject(params) {

        return post({
            path: "api/api/ReportServices/GetDebtAreaPerProject",
            params
        })

    },
    getDebtAreaPerProvince(params) {

        return post({
            path: "api/api/ReportServices/GetDebtAreaPerProvince",
            params
        })

    },
    getAgeByContract(params) {

        return post({
            path: "api/api/ReportServices/GetAgeByContract",
            params
        })

    },
    getAgeByDay(params) {

        return post({
            path: "api/api/ReportServices/GetAgeByDay",
            params
        })

    },
    getAgeByYear(params) {

        return post({
            path: "api/api/ReportServices/GetAgeByYear",
            params
        })

    },
    getDebtAgeByContract(params) {

        return post({
            path: "api/api/ReportServices/GetDebtAgeByContract",
            params
        })

    },
    getDebtAgeByCode(params) {

        return post({
            path: "api/api/ReportServices/GetDebtAgeByCode",
            params
        })

    },
    getDebtAgeByProject(params) {

        return post({
            path: "api/api/ReportServices/GetDebtAgeByProject",
            params
        })

    },
    getDebtAgeByProvince(params) {

        return post({
            path: "api/api/ReportServices/GetDebtAgeByProvince",
            params
        })

    },
    getSttByContract(params) {

        return post({
            path: "api/api/ReportServices/GetSttByContract",
            params
        })

    },
    getSttByCode(params) {

        return post({
            path: "api/api/ReportServices/GetSttByCode",
            params
        })

    },
    getSttByProject(params) {

        return post({
            path: "api/api/ReportServices/GetSttByProject",
            params
        })

    },
    getSttByProvince(params) {

        return post({
            path: "api/api/ReportServices/GetSttByProvince",
            params
        })

    },
    getComparePerContract(params) {

        return post({
            path: "api/api/ReportServices/GetComparePerContract",
            params
        })

    },
    getComparePerCode(params) {

        return post({
            path: "api/api/ReportServices/GetComparePerCode",
            params
        })

    },
    getComparePerProject(params) {

        return post({
            path: "api/api/ReportServices/GetComparePerProject",
            params
        })

    },
    getComparePerProvince(params) {

        return post({
            path: "api/api/ReportServices/GetComparePerProvince",
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
    getAdvanceInvoicePdf(params) {
        return post({
            path: "api/report/pdf/GetAdvanceInvoicePdf",
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
    getCardMonthPdf(params) {
        return post({
            path: "api/report/pdf/GetCardMonthPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getCardYearPdf(params) {
        return post({
            path: "api/report/pdf/GetCardYearPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getContractPdf(params) {
        return post({
            path: "api/report/pdf/GetContractPdf",
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
    getDebtStatusPerContractPdf(params) {
        return post({
            path: "api/report/pdf/GetDebtStatusPerContractPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getDebtStatusPerProjectPdf(params) {
        return post({
            path: "api/report/pdf/GetDebtStatusPerProjectPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    }, 
    getDebtStatusPerLoanTypePdf(params) {
        return post({
            path: "api/report/pdf/GetDebtStatusPerLoanTypePdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getTargetByProjectPdf(params) {
        return post({
            path: "api/report/pdf/GetTargetByProjectPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getTargetByContractPdf(params) {
        return post({
            path: "api/report/pdf/GetTargetByContractPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getTargetByProjectYearPdf(params) {
        return post({
            path: "api/report/pdf/GetTargetByProjectYearPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getTargetByDebtPdf(params) {
        return post({
            path: "api/report/pdf/GetTargetByDebtPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getComparePerContractPdf(params) {
        return post({
            path: "api/report/pdf/GetComparePerContractPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getComparePerCodePdf(params) {
        return post({
            path: "api/report/pdf/GetComparePerCodePdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getComparePerProjectPdf(params) {
        return post({
            path: "api/report/pdf/GetComparePerProjectPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getComparePerProvincePdf(params) {
        return post({
            path: "api/report/pdf/GetComparePerProvincePdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getSttByContractPdf(params) {
        return post({
            path: "api/report/pdf/GetSttByContractPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getSttByCodePdf(params) {
        return post({
            path: "api/report/pdf/GetSttByCodePdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getSttByProjectPdf(params) {
        return post({
            path: "api/report/pdf/GetSttByProjectPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getSttByProvincePdf(params) {
        return post({
            path: "api/report/pdf/GetSttByProvincePdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getDebtAgeByContractPdf(params) {
        return post({
            path: "api/report/pdf/GetDebtAgeByContractPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getDebtAgeByCodePdf(params) {
        return post({
            path: "api/report/pdf/GetDebtAgeByCodePdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getDebtAgeByProjectPdf(params) {
        return post({
            path: "api/report/pdf/GetDebtAgeByProjectPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getDebtAgeByProvincePdf(params) {
        return post({
            path: "api/report/pdf/GetDebtAgeByProvincePdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getCalendarDebtPdf(params) {
        return post({
            path: "api/report/pdf/GetCalendarDebtPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getCalendarDebt1Pdf(params) {
        return post({
            path: "api/report/pdf/GetCalendarDebt1Pdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getCalendarDebt2Pdf(params) {
        return post({
            path: "api/report/pdf/GetCalendarDebt2Pdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getDebtAreaPerContractPdf(params) {
        return post({
            path: "api/report/pdf/GetDebtAreaPerContractPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getDebtAreaPerProjectPdf(params) {
        return post({
            path: "api/report/pdf/GetDebtAreaPerProjectPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getDebtAreaPerCodePdf(params) {
        return post({
            path: "api/report/pdf/GetDebtAreaPerCodePdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getDebtAreaPerProvincePdf(params) {
        return post({
            path: "api/report/pdf/GetDebtAreaPerProvincePdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getResultDebtsRemainingByContractPdf(params) {
        return post({
            path: "api/report/pdf/GetResultDebtsRemainingByContractPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getResultDebtsRemainingByCodePdf(params) {
        return post({
            path: "api/report/pdf/GetResultDebtsRemainingByCodePdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getResultDebtsRemainingByProjectPdf(params) {
        return post({
            path: "api/report/pdf/GetResultDebtsRemainingByProjectPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getResultDebtsRemainingByProvincePdf(params) {
        return post({
            path: "api/report/pdf/GetResultDebtsRemainingByProvincePdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getPrincipalInterestByContractPdf(params) {
        return post({
            path: "api/report/pdf/GetPrincipalInterestByContractPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getPrincipalInterestByCodePdf(params) {
        return post({
            path: "api/report/pdf/GetPrincipalInterestByCodePdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getPrincipalInterestByProjectPdf(params) {
        return post({
            path: "api/report/pdf/GetPrincipalInterestByProjectPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getPrincipalInterestByProvincePdf(params) {
        return post({
            path: "api/report/pdf/GetPrincipalInterestByProvincePdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getPlanEstimationByContractPdf(params) {
        return post({
            path: "api/report/pdf/GetPlanEstimationByContractPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getPlanEstimationByCodePdf(params) {
        return post({
            path: "api/report/pdf/GetPlanEstimationByCodePdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getPlanEstimationByProjectPdf(params) {
        return post({
            path: "api/report/pdf/GetPlanEstimationByProjectPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getPlanEstimationByProvincePdf(params) {
        return post({
            path: "api/report/pdf/GetPlanEstimationByProvincePdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getComparePlanResultByContractPdf(params) {
        return post({
            path: "api/report/pdf/GetComparePlanResultByContractPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getComparePlanResultByCodePdf(params) {
        return post({
            path: "api/report/pdf/GetComparePlanResultByCodePdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getComparePlanResultByProjectPdf(params) {
        return post({
            path: "api/report/pdf/GetComparePlanResultByProjectPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getComparePlanResultByProvincePdf(params) {
        return post({
            path: "api/report/pdf/GetComparePlanResultByProvincePdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getCashFlowPdf(params) {
        return post({
            path: "api/report/pdf/GetCashFlowPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getAgeByContractPdf(params) {
        return post({
            path: "api/report/pdf/GetAgeByContractPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getAgeByDayPdf(params) {
        return post({
            path: "api/report/pdf/GetAgeByDayPdf",
            params,
            config: {
                responseType: 'arraybuffer',
            }
        })
    },
    getAgeByYearPdf(params) {
        return post({
            path: "api/report/pdf/GetAgeByYearPdf",
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
    getDebtStatusPerContract(params) {

        return post({
            path: "api/api/ReportServices/GetDebtStatusPerContract",
            params
        })

    },
    exportDebtStatusPerContract(params) {

        return post({
            path: "api/api/ReportServices/ExportDebtStatusPerContract",
            params
        })

    },
    getDebtStatusPerLoanType(params) {

        return post({
            path: "api/api/ReportServices/GetDebtStatusPerLoanType",
            params
        })

    },
    exportDebtStatusPerLoanType(params) {

        return post({
            path: "api/api/ReportServices/ExportDebtStatusPerLoanType",
            params
        })

    },
    getDebtStatusPerProject(params) {

        return post({
            path: "api/api/ReportServices/GetDebtStatusPerProject",
            params
        })

    },
    exportDebtStatusPerProject(params) {

        return post({
            path: "api/api/ReportServices/ExportDebtStatusPerProject",
            params
        })

    }, getTargetByContract(params) {

        return post({
            path: "api/api/ReportServices/GetTargetByContract",
            params
        })

    }, exportTargetByContract(params) {

        return post({
            path: "api/api/ReportServices/ExportTargetByContract",
            params
        })

    },
    getTargetByProject(params) {

        return post({
            path: "api/api/ReportServices/GetTargetByProject",
            params
        })

    },
    exportTargetByProject(params) {

        return post({
            path: "api/api/ReportServices/ExportTargetByProject",
            params
        })

    },
    getTargetByProjectY(params) {

        return post({
            path: "api/api/ReportServices/GetTargetByProjectY",
            params
        })

    },
    exportTargetByProjectY(params) {

        return post({
            path: "api/api/ReportServices/ExportTargetByProjectY",
            params
        })

    },
    getTargetByGroup(params) {

        return post({
            path: "api/api/ReportServices/GetTargetByGroup",
            params
        })

    },
    exportTargetByGroup(params) {

        return post({
            path: "api/api/ReportServices/ExportTargetByGroup",
            params
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
    getReceiptlectData(params) {

        return post({
            path: "Receipt/GetData",
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
    getDataByLoanRelent(params) {

        return post({
            path: "Relent/GetDataByLoan",
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
    selectDataByLoanChangeStructure(params) {

        return post({
            path: "Chagestructure/SelectDataByLoan",
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
    chagestructureDelete(params) {

        return post({
            path: "Chagestructure/Delete",
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
