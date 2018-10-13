import React, { Component } from 'react';
import { Form, Row, Col, Input, DatePicker, Button } from 'antd';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { saveFormChanges } from 'ADMIN_ACTION_DEMO/form';
import createFormField from 'COMMON_UTILS/createFormField';
import { TabWrapper } from 'ADMIN_PAGES_INDEX';
import { formItemLayout }  from 'ADMIN_CONFIG/formLayout';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

@TabWrapper('formDemo')
class Index extends Component {
    handleFormSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }

        });
    }

    handleFormReset = (e) => {
        e.preventDefault();
        const { form: { resetFields, setFieldsValue } } = this.props;
        resetFields();
        // 手动清空，触发form的onValuesChange事件
        setFieldsValue({ demoName: '' });
    }

    render() {
        const { form: { getFieldDecorator } } = this.props;        

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <div>
                <Form onSubmit={this.handleFormSubmit} onReset={this.handleFormReset}>
                    <Row>
                        <Col span={6}>
                            <FormItem {...formItemLayout} label='姓名'>
                                {getFieldDecorator('demoName', {
                                    rules: [{ required: true, message: '请填写姓名！' }]
                                })(<Input maxLength={50} />)}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout} label='地址'>
                                {getFieldDecorator('demoAddress')(<Input maxLength={50} />)}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout} label='性别'>
                                {getFieldDecorator('demoSex')(
                                    <Select>
                                        <Option value='man'>男</Option>
                                        <Option value='woman'>女</Option>
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout} label='生日'>
                                {getFieldDecorator('demoBirth')(
                                    <RangePicker></RangePicker>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout} label='邮箱'>
                                {getFieldDecorator('demoMail')(
                                    <Input maxLength={50} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem {...formItemLayout} label='身份证号码'>
                                {getFieldDecorator('demoIDCard', {
                                    rules: [{
                                        pattern: /(^\d{17}(\d|X|x)$)/,
                                        message: '请输入正确的18位身份证号码'
                                    }]
                                })(
                                    <Input maxLength={50} />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6} offset={6} className='text-right'>
                            <FormItem {...tailFormItemLayout}>
                                <Button type='primary' htmlType='submit'>提交</Button>
                                <Button htmlType='reset' className='ml-16'>重置</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

Index.propTypes = {
    form: PropTypes.object,
    saveFormChanges: PropTypes.func
};

Index = Form.create({
    onValuesChange: (props, changedValues, allValues) => {
        props.saveFormChanges(allValues);
    },
    mapPropsToFields: (props) => {
        return createFormField(props.formDemo);
    }
})(Index);

Index = connect(
    (state) => ({
        formDemo: state.formDemo
    }),
    {
        saveFormChanges
    }
)(Index);

export default Index;