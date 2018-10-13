import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { tagsSource } from 'ADMIN_CONFIG_ENUM/roleTags';
import createFormField from 'COMMON_UTILS/createFormField';
import { errorHandle, removeObjPrefix } from 'COMMON_UTILS/common';
import { formItemLayout }  from 'ADMIN_CONFIG/formLayout';

const FormItem = Form.Item;
const { Option } = Select;
const fieldPrefix = 'user-';


class UserInfo extends Component {
    static propTypes = {
        record: PropTypes.object,
        closeModal: PropTypes.func
    }

    saveData = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }

            const { addData, editData, closeModal } = this.props;
            if (values[`${fieldPrefix}UserID`]) {
                editData(removeObjPrefix(values, fieldPrefix))
                    .then(closeModal)
                    .catch(errorHandle);
            } else {
                addData(removeObjPrefix(values, fieldPrefix))
                    .then(closeModal)
                    .catch(errorHandle);
            }
        });
    }

    render() {
        const { record, closeModal, form: { getFieldDecorator } } = this.props;      

        return (
            <div>
                <Modal
                    onOk={this.saveData}
                    onCancel={closeModal}
                    visible={true}
                    title={record ? '修改' : '新增'}>
                    <Form>
                        <FormItem>
                            {
                                getFieldDecorator(`${fieldPrefix}UserID`)(
                                    <Input className='d-none' />
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='姓名'>
                            {
                                getFieldDecorator(`${fieldPrefix}Name`, {
                                    rules: [{ required: true, message: '请填写姓名' }]
                                })(<Input maxLength={45} />)
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='年龄'>
                            {
                                getFieldDecorator(`${fieldPrefix}Age`, {
                                    rules: [{ pattern: /^\d+$/, message: '请输入正确的年龄' }]
                                })(<Input maxLength={45} />)
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='地址'>
                            {
                                getFieldDecorator(`${fieldPrefix}Address`, {

                                })(<Input maxLength={45} />)
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='标签'>

                            {
                                getFieldDecorator(`${fieldPrefix}Tag`, {

                                })(
                                    <Select
                                        mode='multiple'>
                                        {
                                            Object.keys(tagsSource).map(key => (
                                                <Option key={key} value={key}>{tagsSource[key]}</Option>
                                            ))
                                        }
                                    </Select>
                                )
                            }
                        </FormItem>
                    </Form>
                </Modal>
            </div>
        );
    }
}

UserInfo = Form.create({
    mapPropsToFields: (props) => {
        if (props.record) {
            return createFormField(props.record, fieldPrefix);
        }
    }
})(UserInfo);

export default UserInfo;