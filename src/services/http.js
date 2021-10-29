// import axios from 'axios'
import { axios } from './custom-axios'
// const BASE_URL = 'http://147.50.143.84:3800/' //process.env.REACT_APP_API_HOST
const BASE_URL = process.env.REACT_APP_API_HOST
const setHeader = (isMultipart, token) => {

    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    axios.defaults.baseURL = BASE_URL

    axios.defaults.maxContentLength = 100000000
    axios.defaults.maxBodyLength = 100000000

    let aut = {}
    if (token) {
        aut = { token: token }
    }

    axios.defaults.headers = {
        "Content-Type": isMultipart ? 'multipart/form-data' : "application/json",
        // "Access-Control-Allow-Origin": "*",
        // "Authorization": token == null ? "" : "bearer " + token,
        ...aut
    };

    axios.defaults.timeout = 60 * 4 * 1000;

}


const post = (path, parameter, token, isMultipart, config = {}) => {

    const provinceid = localStorage.getItem('provinceid')
    const cUsername = localStorage.getItem('cUsername')
    const roleID = localStorage.getItem('nROLEID')
    let parameters = parameter

    if (parameter instanceof FormData) {
        parameters.append("Username", provinceid) //provinceid)
        parameters.append("RoleID", roleID) //provinceid)
    } else if (parameter) {

        if (parameter.Username){
            parameters = {
                ...parameter,
                RoleID: roleID
            }
        }else{
            parameters = {
                ...parameter,
                Username: cUsername,
                RoleID: roleID
            }
        }
       
        
    }


    return new Promise((resolve, reject) => {

        setHeader(isMultipart, token)

        return axios
            .post(path, parameters, config)
            .then(response => {
                resolve(response);
            })
            .catch(error => {

                reject(error);
            });
    });
}

const get = (path, parameter, token, config = {}, data) => {
    return new Promise((resolve, reject) => {

        setHeader(true, token)

        var configRequest = config

        if (data) {

            configRequest = {
                ...config,
                data: data
            }
        }


        return axios
            .get(path, { params: parameter, ...configRequest })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}


const put = (path, parameter, token, isMultipart, config = {}) => {

    return new Promise((resolve, reject) => {

        setHeader(isMultipart, token)

        return axios
            .put(path, parameter, config)
            .then(response => {
                resolve(response);
            })
            .catch(error => {

                reject(error);
            });
    })
}

const deletes = (path, parameter, token, isMultipart, config = {}) => {

    return new Promise((resolve, reject) => {

        setHeader(isMultipart, token)

        return axios
            .delete(path, { data: parameter, ...config })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function fetchPost(url = '', data = {}) {
    // Default options are marked with *
    const response = new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            // mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            // headers: {
            //     // 'Content-Type': 'application/json'
            //     // 'Content-Type': 'application/x-www-form-urlencoded',
            //     'Content-Type': 'multipart/form-data'
            // },
            // redirect: 'follow', // manual, *follow, error
            // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: data // body data type must match "Content-Type" header
        }).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
    return response
}



export { post, get, put, deletes, BASE_URL, fetchPost }