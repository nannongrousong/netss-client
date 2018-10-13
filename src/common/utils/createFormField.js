import { Form } from 'antd';

/**
 * 将redux中存储的值转化成antd Form中可识别对象
 * @param {当前记录} record 
 * @param {field存在的前缀} fieldPrefix 
 */
const createFormField = (record, fieldPrefix) => (
    Object.keys(record).reduce((previousObj, currentKey) => {
        previousObj[(fieldPrefix || '') + currentKey] = Form.createFormField({
            ...record,
            value: record[currentKey]
        });
        return previousObj;
    }, {})
);

export default createFormField;