import React, { Component } from 'react';
import { Modal, Form, Input, Radio } from 'antd';
import PropTypes from 'prop-types';
import createFormField from 'COMMON_UTILS/createFormField';
import { errorHandle } from 'COMMON_UTILS/common';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class UserInfo extends Component {
    saveData = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }

            const { addSysUser, editSysUser, closeModal } = this.props;
            if (values.UserID) {
                editSysUser(values).then(closeModal).catch(errorHandle);
            } else {
                addSysUser(values).then(closeModal).catch(errorHandle);
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
                                getFieldDecorator('UserID')(
                                    <Input className='d-none' />
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='登录名'>
                            {
                                getFieldDecorator('LoginName', {
                                    rules: [{ required: true, message: '请填写登录名' }]
                                })(<Input maxLength={45} />)
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='昵称'>
                            {
                                getFieldDecorator('NickName', {
                                    rules: [{ required: true, message: '请填写登录名' }]
                                })(<Input maxLength={45} />)
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='是否有效'>
                            {
                                getFieldDecorator('IsValid', {

                                })(
                                    <RadioGroup>
                                        <Radio value={1}>有效</Radio>
                                        <Radio value={0}>无效</Radio>
                                    </RadioGroup>
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
            return createFormField(props.record);
        }
    }
})(UserInfo);

export default UserInfo;