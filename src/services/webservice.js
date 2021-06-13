import * as http from "./http";
import cookie from "js-cookie";
import { dialog } from "../components";
import axios from 'axios'



const api = {

    
    getProvinceList(){

        // return post({
        //     path:"api/ReportServices/GetProvinces"
        // })

        return axios.post("http://147.50.143.83:8080/api/ReportServices/GetProvinces")
    }
   
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

function get({ path, params, isShowError = true, config = {}, context, token, isExternal }) {
    return new Promise((resolve, reject) => {
        return http
            .get(path, params, isExternal ? token : getToken(context), config)
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
