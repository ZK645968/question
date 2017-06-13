import axios from 'axios';

let base = '';
// 登录
export const Login = params => { return axios.post(`${base}/api/login`, params).then(res => res); };
// 保存问卷，保存和发布使用
export const Save = params => { return axios.post(`${base}/api/save`, params).then(res => res); };
// 更新问卷，编辑功能使用
export const Update = params => { return axios.post(`${base}/api/update`, params).then(res => res); };
// 注册
export const Register = params => { return axios.post(`${base}/api/register`, params).then(res => res); };
// 删除问卷
export const Delete = params => { return axios.post(`${base}/api/delete`, params).then(res => res); };
// 获取所有用户已发布的问卷
export const All = params => { return axios.get(`${base}/api/all`,{ params: params }); };


// 由于涉及路由或Event Bus参数，以下api故不使用
// 根据问卷ID 获取问卷
export const Getquestionaire = params => { return axios.get(`${base}/api/questionaire/${this.$route.params.id}`, { params: params }); };
// 根据用户id，获取该用户的所有问卷
export const GetAllByUser = params => { return axios.get(`${base}/api/getAllByUser?id=${id}`, { params: params }); };
