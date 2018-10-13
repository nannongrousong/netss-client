import { message } from 'antd';

/**
 * 为对象的每个key手动添加前缀，不支持嵌套
 * @param {对象} obj 
 * @param {对象key前缀} prefix 
 */
export const addObjPrefix = (obj, prefix) => (
    Object.keys(obj).reduce((prev, curr) => {
        prev[(prefix || '') + curr] = obj[curr];
        return prev;
    }, {})
);

/**
 * 为对象的每个key手动删除前缀，不支持嵌套
 * @param {对象} obj 
 * @param {对象key前缀} prefix 
 */
export const removeObjPrefix = (obj, prefix) => (
    Object.keys(obj).reduce((prev, curr) => {
        prev[curr.replace(prefix || '', '')] = obj[curr];
        return prev;
    }, {})
);

/**
 * 统一错误处理
 * @param {Error对象or字符串} err 
 */
export const errorHandle = err => {
    if (err.__proto__ == Error.prototype) {
        message.error(err.message);
    } else {
        message.error(err);
    }
    console.log(err);
};
