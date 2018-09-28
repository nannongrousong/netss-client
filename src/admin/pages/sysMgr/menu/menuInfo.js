import React, { Component, Fragment } from 'react';
import { Modal, Input, Form, message, Alert } from 'antd';
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

            if (values[`${fieldPrefix}menu_id`]) {
                editSysMenu(removeObjPrefix(values, fieldPrefix))
                    .then(closeModal)
                    .catch(err => {
                        console.log(err);
                        message.error(err.message);
                    });
            } else {
                addSysMenu(removeObjPrefix(values, fieldPrefix))
                    .then(closeModal)
                    .catch(err => {
                        console.log(err);
                        message.error(err.message);
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
                title={
                    <Fragment>
                        <span>{modalTitle}</span>
                    </Fragment>
                }>
                <Form>
                    {
                        getFieldDecorator(`${fieldPrefix}menu_id`)(
                            <Input className='d-none' />
                        )
                    }
                    {
                        getFieldDecorator(`${fieldPrefix}parent_id`)(
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
                            getFieldDecorator(`${fieldPrefix}parent_title`)(
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

                    {
                        !record.menu_id &&
                        <FormItem>
                            <Alert type='warning' message='添加子菜单后会自动清空父级链接，请谨慎操作！' showIcon />
                        </FormItem>
                    }

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