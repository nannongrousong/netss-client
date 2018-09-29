import React, { Component, Fragment } from 'react';
import { Modal, Input, Form, message, Alert } from 'antd';
import createFormField from 'COMMON_UTILS/createFormField';
import { removeObjPrefix, errorHandle } from 'COMMON_UTILS/common';

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
                    .catch(errorHandle);
            } else {
                addSysMenu(removeObjPrefix(values, fieldPrefix))
                    .then(closeModal)
                    .catch(errorHandle);
            }
        });
    }

    render() {
        const {
            record: { menu_id, type, path },
            closeModal,
            modalTitle,
            form: { getFieldDecorator }
        } = this.props;

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
                        label={type == 'node' ? '导航名称' : '功能名称'}>
                        {
                            getFieldDecorator(`${fieldPrefix}title`, {
                                rules: [{ required: true, message: '请填写名称' }]
                            })(<Input />)
                        }
                    </FormItem>

                    {
                        (path || !menu_id) &&
                        <FormItem
                            {...formItemLayout}
                            label={type == 'node' ? '导航路径' : '功能ID'}>
                            {
                                getFieldDecorator(`${fieldPrefix}path`, {
                                    rules: [{ required: true, message: '请填写信息' }]
                                })(<Input />)
                            }
                        </FormItem>
                    }

                    {
                        <FormItem
                            {...formItemLayout}
                            label='图标'
                            className={type == 'resource' ? 'd-none' : ''}>
                            {
                                getFieldDecorator(`${fieldPrefix}icon`, {
                                    initialValue: 'tag'
                                })(<Input />)
                            }
                        </FormItem>
                    }

                    <FormItem
                        {...formItemLayout}
                        label='备注'>
                        {
                            getFieldDecorator(`${fieldPrefix}remark`)(<Input />)
                        }
                    </FormItem>

                    {
                        !menu_id && type == 'node' &&
                        <FormItem>
                            <Alert type='warning' message='添加子菜单后会使父级链接失效，请留意！' showIcon />
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