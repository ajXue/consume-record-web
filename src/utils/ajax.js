import axios from "axios";
import { notification } from 'antd';

// import defaultSetting from '../config/defaultSetting'
// const { baseUrl } = defaultSetting;

// TODO 性能优化后 修改至 30000
// debugger;
const timeout = 6000000;

// 请求超时
axios.defaults.timeout = timeout;
// axios.defaults.baseURL = baseUrl;

// 添加请求拦截器
axios.interceptors.request.use(config => {

    // if(localStorage.getItem('token')) {
    //     config.headers.common['Authorization'] = "xue " + localStorage.getItem('token');
    // }
    // TODO 测试数据
    config.headers.common['Authorization'] = "xue eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Iui1teWuh-aZqCIsImlhdCI6MTU0NTgzNDYyOCwiZXhwIjoxNTQ2NDM5NDI4fQ.MHwA1r55tyBi0Qfs4LFz4eSryVSphI51hs9OaaLq8FE";
    return config;
}, err => {
    // 对请求错误做些什么
    return Promise.reject(err);
});

// 添加响应拦截器
axios.interceptors.response.use(res => {
    if (res.data.code) {
        if (res.data.code === "1") {
            return res.data;
        } else {
            return res;
        }
    } else {
        return res.data;
    }
},  error => {
        if (String(error).indexOf("timeout") > -1) {
            notification.warning({
                message: '请求超时',
                description: ''
            });
        } 
        // if (error.response.status) {
        //     switch (error.response.status) {
        //         case 401:
        //             break;
        //         case 403:
        //             break;
        //         case 404:
        //             break;
        //         default:
        //             break;
        //     }
        // }
        return Promise.reject(error);
    }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 *
 */
export const get = (url, params) => {
    return new Promise((resolve, reject) => {
        axios.get(url, {
                params: params
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};


/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 */
export const post = (url, data) => {
    //以x-www-form-urlencoded 格式post数据的时候，需要使用qs.stringify()
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};

/**
 * postFile方法，对应postFile请求
 * @param {String} url [请求的url地址]
 * @param {Object} data [请求时携带的参数]
 */
export const postFile = (url, data) => {
    return new Promise((resolve, reject) => {
        axios.post(url, data, {
                headers: {
                    "Content-Type": "multipart/form-data;charset=utf-8"
                }
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};

/**
 * postForm
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export const postForm = (url, data) => {
    //以x-www-form-urlencoded 格式post数据的时候，需要使用qs.stringify()
    return new Promise((resolve, reject) => {
        axios({
                url: url,
                method: "post",
                data,
                transformRequest: [
                    function (data) {
                        // Do whatever you want to transform the data
                        let ret = "";
                        for (let it in data) {
                            ret +=
                                encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
                        }
                        return ret;
                    }
                ],
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => {
                reject(err);
            });
    });
};