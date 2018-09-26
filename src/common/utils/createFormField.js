import { Form } from 'antd';

export default (record, fieldPrefix) => (
    Object.keys(record).reduce((previousObj, currentKey) => {
        previousObj[(fieldPrefix || '') + currentKey] = Form.createFormField({
            ...record,
            value: record[currentKey]
        });
        return previousObj;
    }, {})
);