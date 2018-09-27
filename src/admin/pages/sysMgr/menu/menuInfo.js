import React, { Component } from 'react';
import { Modal, Input, Form, message } from 'antd';
import createFormField from 'COMMON_UTILS/createFormField';
import { removeObjPrefix } from 'COMMON_UTILS/common';

const FormItem = Form.Item;
const fieldPrefix = 'menu-';

class InfoModal extends Component {
    saveData = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                return;
            }

            const { editSysMenu, closeModal, addSysMenu } = this.props;
            if (values[`${fieldPrefix}key`]) {
                editSysMenu(removeObjPrefix(values, fieldPrefix), (res) => {
                    if (!res) {
                        return message.error('路径值已存在，请重新填写！');
                    }
                    closeModal();
                });
            } else {
                addSysMenu(removeObjPrefix(values, fieldPrefix), (res) => {
                    if (!res) {
                        return message.error('路径值已存在，请重新填写！');
                    }
                    closeModal();
                });
            }
        });
    }

    render() {
        const { record, closeModal, modalTitle, form: { getFieldDecorator } } = this.props;

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
            <Modal
                onOk={this.saveData}
                onCancel={closeModal}
                visible={true}
                title={modalTitle}>
                <Form>
                    {
                        getFieldDecorator(`${fieldPrefix}key`)(
                            <Input className='d-none' />
                        )
                    }
                    {
                        getFieldDecorator(`${fieldPrefix}parentID`)(
                            <Input className='d-none' />
                        )
                    }
                    {
                        getFieldDecorator(`${fieldPrefix}type`)(
                            <Input className='d-none' />
                        )
                    }

                    <FormItem
                        {...formItemLayout}
                        label='上级导航' >
                        {
                            getFieldDecorator(`${fieldPrefix}parentTitle`)(
                                <Input disabled />
                            )
                        }
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label='标题'>
                        {
                            getFieldDecorator(`${fieldPrefix}title`, {
                                rules: [{ required: true, message: '请填写标题' }]
                            })(<Input />)
                        }
                    </FormItem>

                    {
                        (record && record.type == 'leaf') &&
                        <FormItem
                            {...formItemLayout}
                            label='路径'>
                            {
                                getFieldDecorator(`${fieldPrefix}path`, {
                                    rules: [{ required: true, message: '请填写路径' }]
                                })(<Input />)
                            }
                        </FormItem>
                    }

                    <FormItem
                        {...formItemLayout}
                        label='图标'>
                        {
                            getFieldDecorator(`${fieldPrefix}icon`, {
                                initialValue: 'tag'
                            })(<Input />)
                        }
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

InfoModal = Form.create({
    mapPropsToFields: (props) => {
        if (props.record) {
            return createFormField(props.record, fieldPrefix);
        } else {
            console.log('props.record竟然是空的！！！！！！');
        }
    }
})(InfoModal);

export default InfoModal;