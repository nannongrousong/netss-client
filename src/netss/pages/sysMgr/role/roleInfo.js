import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import createFormField from 'COMMON_UTILS/createFormField';
import { errorHandle, removeObjPrefix } from 'COMMON_UTILS/common';
import { formItemLayout }  from 'NETSS_CONFIG/formLayout';

const FormItem = Form.Item;
const fieldPrefix = 'role-';

class UserInfo extends Component {
    saveData = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }

            let { addSysRole, editSysRole, closeModal } = this.props;
            closeModal = closeModal.bind(this, 'info');
            if (values[`${fieldPrefix}RoleID`]) {
                editSysRole(removeObjPrefix(values, fieldPrefix))
                    .then(closeModal)
                    .catch(errorHandle);
            } else {
                addSysRole(removeObjPrefix(values, fieldPrefix))
                    .then(closeModal)
                    .catch(errorHandle);
            }
        });
    }

    render() {
        let { record, closeModal, form: { getFieldDecorator } } = this.props;
        closeModal = closeModal.bind(this, 'info');

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
                                getFieldDecorator(`${fieldPrefix}RoleID`)(
                                    <Input className='d-none' />
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='角色名称'>
                            {
                                getFieldDecorator(`${fieldPrefix}RoleName`, {
                                    rules: [{ required: true, message: '请填写角色名称' }]
                                })(<Input maxLength={45} />)
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='备注'>
                            {
                                getFieldDecorator(`${fieldPrefix}Remark`)(<Input maxLength={45} />)
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
        const { record } = props;
        if (record) {
            return createFormField(record, fieldPrefix);
        }
    }
})(UserInfo);

export default UserInfo;