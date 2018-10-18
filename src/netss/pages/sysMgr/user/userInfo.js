import React, { Component } from 'react';
import { Modal, Form, Input, Select, Button, Switch, message } from 'antd';
import createFormField from 'COMMON_UTILS/createFormField';
import { errorHandle, removeObjPrefix } from 'COMMON_UTILS/common';
import { Rest_Sys_User_Pwd } from 'NETSS_SERVICE/Sys_Mgr';
import { formItemLayout } from 'NETSS_CONFIG/formLayout';

const FormItem = Form.Item;
const { Option } = Select;
const fieldPrefix = 'user-';

class UserInfo extends Component {
    componentDidMount() {
        const { sysRole, listSysRole } = this.props;
        (!sysRole || sysRole.length == 0) && listSysRole();
    }

    saveData = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }

            values = { ...values, [`${fieldPrefix}IsValid`]: values[`${fieldPrefix}IsValid`] ? 1 : 0 };

            const { addSysUser, editSysUser, closeModal } = this.props;
            if (values[`${fieldPrefix}UserID`]) {
                editSysUser(removeObjPrefix(values, fieldPrefix))
                    .then(closeModal)
                    .catch(errorHandle);
            } else {
                addSysUser(removeObjPrefix(values, fieldPrefix))
                    .then(closeModal)
                    .catch(errorHandle);
            }
        });
    }

    resetPwd = () => {
        Modal.confirm({
            title: '信息',
            content: '您确定要重置密码吗？',
            onOk: async () => {
                const { record: { UserID } } = this.props;
                try {
                    await Rest_Sys_User_Pwd({ UserID });
                    message.success('重置密码成功！');
                } catch (err) {
                    errorHandle(err);
                }
            }
        });
    }

    render() {
        const { record, closeModal, form: { getFieldDecorator }, sysRole } = this.props;


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
                            label='角色'>
                            {
                                getFieldDecorator(`${fieldPrefix}Role`, {
                                    rules: [{ required: true, message: '请选择用户角色' }]
                                })(
                                    <Select mode='multiple'>
                                        {
                                            sysRole.map(({ RoleID, RoleName }) => (
                                                <Option key={RoleID} value={RoleID}>{RoleName}</Option>
                                            ))
                                        }
                                    </Select>
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='登录名'>
                            {
                                getFieldDecorator(`${fieldPrefix}LoginName`, {
                                    rules: [{ required: true, message: '请填写登录名' }]
                                })(<Input maxLength={45} />)
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='密码'>
                            {
                                record
                                    ? <Button type='danger' onClick={this.resetPwd}>重置密码</Button>
                                    : getFieldDecorator(`${fieldPrefix}Password`, {
                                        rules: [{ required: true, message: '请输入密码' }]
                                    })(<Input maxLength={45} type='password' />)
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='昵称'>
                            {
                                getFieldDecorator(`${fieldPrefix}NickName`, {
                                    rules: [{ required: true, message: '请填写登录名' }]
                                })(<Input maxLength={45} />)
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='是否有效'>
                            {
                                getFieldDecorator(`${fieldPrefix}IsValid`, {
                                    valuePropName: 'checked'
                                })(
                                    <Switch />
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
        const { record } = props;
        if (record) {
            return createFormField({ ...record, IsValid: record.IsValid == 1 }, fieldPrefix);
        }
    }
})(UserInfo);

export default UserInfo;