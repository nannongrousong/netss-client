import React, { Component, Fragment } from 'react';
import { Modal, Input, Form, Alert, Dropdown, Menu } from 'antd';
import createFormField from 'COMMON_UTILS/createFormField';
import { removeObjPrefix, errorHandle } from 'COMMON_UTILS/common';
import FileUpload from 'NETSS_COMPONENT/Upload';
import IconList from './iconList';
import styles from 'NETSS_STYLES/sysMrg-menu.less';
import { formItemLayout }  from 'NETSS_CONFIG/formLayout';

const FormItem = Form.Item;
const MenuItem = Menu.Item;
const fieldPrefix = 'menu-';

class InfoModal extends Component {
    state = {
        showIconModal: false
    }

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

    handleFileChange = ({ file, fileList, event }) => {
        const { status, response: newPath } = file;
        const { form } = this.props;
        if (status == 'done') {
            form.setFieldsValue({
                [`${fieldPrefix}Icon`]: newPath
            });
        }
    }

    chooseIcon = () => {
        this.setState({
            showIconModal: true
        });
    }

    endChooseIcon = (icon) => {
        const { form } = this.props;
        form.setFieldsValue({
            [`${fieldPrefix}Icon`]: icon
        });
        this.closeIconListModal();
    }

    closeIconListModal = () => {
        this.setState({
            showIconModal: false
        });
    }

    render() {
        const {
            record: { MenuID, Type, Path },
            closeModal,
            modalTitle,
            form: { getFieldDecorator }
        } = this.props;

        const { showIconModal } = this.state;

        return (
            <Fragment>

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

                        <FormItem
                            {...formItemLayout}
                            label='图标'
                            className={Type == 'resource' ? 'd-none' : ''}>
                            {
                                getFieldDecorator(`${fieldPrefix}Icon`, {
                                    initialValue: 'tag'
                                })(<Input maxLength={45} className='w-50' disabled />)
                            }
                            <div className={'text-right ' + styles['choose-icon-btn']}>
                                <Dropdown.Button
                                    placement='bottomRight'
                                    overlay={
                                        <Menu>
                                            <MenuItem>
                                                <FileUpload
                                                    accept='image/*'
                                                    showUploadList={false}
                                                    onChange={this.handleFileChange} >
                                                    <a href='#' className='w-100'>选择图片</a>
                                                </FileUpload>
                                            </MenuItem>
                                        </Menu>} >
                                    <a href='#' onClick={this.chooseIcon}>选择图标</a>
                                </Dropdown.Button>
                            </div>
                        </FormItem>

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

                {
                    showIconModal &&
                    <IconList
                        endChooseIcon={this.endChooseIcon}
                        closeModal={this.closeIconListModal} />
                }

            </Fragment>
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