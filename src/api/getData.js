// import { get, post, postFile, postForm } from '../utils/ajax'
import { get } from '../utils/ajax'


/**
 * 登录 
 */
export const LoginApi = data => get("/login", data);

/**
 * dashboard 
 */

export const getConsumeByDateApi = data => get("/getMonConsume", data);