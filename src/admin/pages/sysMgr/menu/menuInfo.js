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

            if (values[`${fieldPrefix}MenuID`]) {
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
            record: { MenuID, Type, Path },
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
                        getFieldDecorator(`${fieldPrefix}MenuID`)(
                            <Input className='d-none' />
                        )
                    }
                    {
                        getFieldDecorator(`${fieldPrefix}ParentID`)(
                            <Input className='d-none' />
                        )
                    }
                    {
                        getFieldDecorator(`${fieldPrefix}Type`)(
                            <Input className='d-none' />
                        )
                    }
                    {
                        getFieldDecorator(`${fieldPrefix}Priority`)(
                            <Input className='d-none' />
                        )
                    }

                    <FormItem
                        {...formItemLayout}
                        label='上级导航' >
                        {
                            getFieldDecorator(`${fieldPrefix}ParentTitle`)(
                                <Input disabled maxLength={45} />
                            )
                        }
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label={Type == 'node' ? '导航名称' : '功能名称'}>
                        {
                            getFieldDecorator(`${fieldPrefix}Title`, {
                                rules: [{ required: true, message: '请填写名称' }]
                            })(<Input maxLength={45} />)
                        }
                    </FormItem>

                    {
                        (Path || !MenuID) &&
                        <FormItem
                            {...formItemLayout}
                            label={Type == 'node' ? '导航路径' : '功能ID'}>
                            {
                                getFieldDecorator(`${fieldPrefix}Path`, {
                                    rules: [{ required: true, message: '请填写信息' }]
                                })(<Input maxLength={45} />)
                            }
                        </FormItem>
                    }

                    {
                        <FormItem
                            {...formItemLayout}
                            label='图标'
                            className={Type == 'resource' ? 'd-none' : ''}>
                            {
                                getFieldDecorator(`${fieldPrefix}Icon`, {
                                    initialValue: 'tag'
                                })(<Input maxLength={45} />)
                            }
                        </FormItem>
                    }

                    <FormItem
                        {...formItemLayout}
                        label='备注'>
                        {
                            getFieldDecorator(`${fieldPrefix}Remark`, {
                                initialValue: ''
                            })(<Input maxLength={45} />)
                        }
                    </FormItem>

                    {
                        !MenuID && Type == 'node' &&
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