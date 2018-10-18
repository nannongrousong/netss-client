import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { formItemLayout } from 'NETSS_CONFIG/formLayout';
import { Edit_Sys_User_Pwd } from 'NETSS_SERVICE/Sys_Mgr';
import { errorHandle } from 'COMMON_UTILS/common';

const FormItem = Form.Item;

class ResetPwd extends Component {
    saveData = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (err) {
                return;
            }

            const { closeModal, history } = this.props;

            try {
                await Edit_Sys_User_Pwd(values);
                closeModal();
                sessionStorage.removeItem('AUTH_INFO');
                history.push('/login');
            } catch (err) {
                errorHandle(err);
            }
        });
    }

    render() {
        const { closeModal, form: { getFieldDecorator, getFieldValue } } = this.props;

        return (
            <Modal
                visible
                title='重置密码'
                onCancel={closeModal}
                onOk={this.saveData}>
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label='旧密码'>
                        {
                            getFieldDecorator('OldPwd', {
                                rules: [{ required: true, message: '旧密码' }]
                            })(<Input maxLength={45} type='password' />)
                        }
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label='新密码'>
                        {
                            getFieldDecorator('NewPwd1', {
                                rules: [
                                    { required: true, message: '请输入密码' },
                                    { min: 6, message: '至少输入六位' }
                                ]
                            })(<Input maxLength={45} type='password' />)
                        }
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label='新密码确认'>
                        {
                            getFieldDecorator('NewPwd2', {
                                rules: [
                                    { required: true, message: '请再次输入密码' },
                                    {
                                        validator: (rule, value, callBack) => {
                                            if (getFieldValue('NewPwd1') != value) {
                                                callBack('两次密码输入不一致！');
                                            }

                                            callBack();
                                        }
                                    }
                                ]
                            })(<Input maxLength={45} type='password' />)
                        }
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

ResetPwd = Form.create()(ResetPwd);

ResetPwd.propTypes = {
    closeModal: PropTypes.func
};

export default ResetPwd;