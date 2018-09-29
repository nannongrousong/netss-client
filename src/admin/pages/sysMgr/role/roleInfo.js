import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import createFormField from 'COMMON_UTILS/createFormField';
import { errorHandle } from 'COMMON_UTILS/common';

const FormItem = Form.Item;

class UserInfo extends Component {
    saveData = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }

            const { addSysRole, editSysRole, closeModal } = this.props;
            if (values.RoleID) {
                editSysRole(values).then(closeModal).catch(errorHandle);
            } else {
                addSysRole(values).then(closeModal).catch(errorHandle);
            }
        });
    }

    render() {
        const { record, closeModal, form: { getFieldDecorator } } = this.props;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 15 },
            }
        };

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
                                getFieldDecorator('RoleID')(
                                    <Input className='d-none' />
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='角色名称'>
                            {
                                getFieldDecorator('RoleName', {
                                    rules: [{ required: true, message: '请填写角色名称' }]
                                })(<Input maxLength={45} />)
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='备注'>
                            {
                                getFieldDecorator('Remark')(<Input maxLength={45} />)
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
            return createFormField(record);
        }
    }
})(UserInfo);

export default UserInfo;