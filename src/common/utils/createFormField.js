import { Form } from 'antd';

export default (record) => (
    Object.keys(record).reduce((previousObj, currentKey) => {
        previousObj[currentKey] = Form.createFormField({
            ...record,
            value: record[currentKey]
        });
        return previousObj;
    }, {})
);