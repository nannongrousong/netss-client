import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { tagsSource } from 'ADMIN_CONFIG_ENUM/roleTags';
import createFormField from 'COMMON_UTILS/createFormField';

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
            if (values.key) {
                editData(values);
            } else {
                addData(values);
            }
            closeModal();
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
                                getFieldDecorator('key')(
                                    <Input className='d-none' />
                                )
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='姓名'>
                            {
                                getFieldDecorator('name', {
                                    rules: [{ required: true, message: '请填写姓名' }]
                                })(<Input />)
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='年龄'>
                            {
                                getFieldDecorator('age', {

                                })(<Input />)
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='地址'>
                            {
                                getFieldDecorator('address', {

                                })(<Input />)
                            }
                        </FormItem>

                        <FormItem
                            {...formItemLayout}
                            label='标签'>

                            {
                                getFieldDecorator('tags', {

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