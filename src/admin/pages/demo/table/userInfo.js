import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { tagsSource } from 'ADMIN_CONFIG_ENUM/roleTags';
import createFormField from 'COMMON_UTILS/createFormField';
import { errorHandle } from 'COMMON_UTILS/common';


const FormItem = Form.Item;
const { Option } = Select;

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
            if (values.UserID) {
                editData(values).then(closeModal).catch(errorHandle);
            } else {
                addData(values).then(closeModal).catch(errorHandle);
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
                            label='姓名'>
                            {
                                getFieldDecorator('Name', {
                                    rules: [{ required: true, message: '请填写姓名' }]
                                })(<Input maxLength={45} />)
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='年龄'>
                            {
                                getFieldDecorator('Age', {
                                    rules: [{ pattern: /^\d+$/, message: '请输入正确的年龄' }]
                                })(<Input maxLength={45} />)
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='地址'>
                            {
                                getFieldDecorator('Address', {

                                })(<Input maxLength={45} />)
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='标签'>

                            {
                                getFieldDecorator('Tag', {

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
            return createFormField(props.record);
        }
    }
})(UserInfo);

export default UserInfo;