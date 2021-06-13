import axiosImport from 'axios'

const axios = axiosImport.create()
axios.interceptors.response.use(
    response => { return response; },
    error => {

        if (
            error.request?.responseType === 'blob' &&
            error.response.data instanceof Blob &&
            error.response.data.type &&
            error.response.data.type.toLowerCase().indexOf('json') != -1
        ) {

            return new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.onload = () => {
                    error.response.data = JSON.parse(reader.result);
                    resolve(Promise.reject(error));
                };

                reader.onerror = () => {
                    reject(error);
                };

                reader.readAsText(error.response.data);
            });
        } else if (error.request?.responseType === 'arraybuffer'
            && error.response.data.toString() === '[object ArrayBuffer]'
        ) {
            const res = JSON.parse(Buffer.from(error.response.data).toString('utf8'));

            error.response.data = res
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);


export { axios }